import { serviceOptions } from '#/content'

import type { Lead } from './repository'

/**
 * The outcome of attempting to send a Lead notification. The notifier never
 * throws, a transport or API error is returned as `{ ok: false }` so
 * `submitLead` can keep the persisted Lead and report a *notification* failure
 * distinct from a persistence failure.
 */
export type NotifyResult = { ok: true } | { ok: false; error: string }

/**
 * The notification seam for Leads. A single `notify` operation keeps the
 * interface narrow; `submitLead` depends on this interface, not on Resend, so it
 * can be tested with a fake that sends no real email.
 */
export interface LeadNotifier {
	notify: (lead: Lead) => Promise<NotifyResult>
}

/** Where new-Lead notifications are routed, the team's shared inbox. */
const TEAM_INBOX = 'info@techhivesolutions.com'

/**
 * The sender address. It must be on the Resend-verified domain (SPF/DKIM) or
 * delivery fails, that DNS setup is the human-only part of this work.
 */
const FROM_ADDRESS = 'TechHive Website <leads@techhivesolutions.com>'

/** Resolve a service-interest slug to its display label, falling back to the raw value. */
function serviceLabel(value: string): string {
	return (
		serviceOptions().find((option) => option.value === value)?.label ?? value
	)
}

/**
 * Render a persisted Lead as the team-notification email, subject plus a plain
 * text body carrying every submitted detail and the human-readable service
 * interest so the team can route it without opening the database.
 */
export function formatLeadEmail(lead: Lead): { subject: string; text: string } {
	const service = serviceLabel(lead.serviceInterest)
	const subject = `New lead: ${lead.firstName} ${lead.lastName}, ${service}`
	const text = [
		'New contact-form submission',
		'',
		`Name: ${lead.firstName} ${lead.lastName}`,
		`Email: ${lead.email}`,
		`Company: ${lead.company ?? '-'}`,
		`Service interest: ${service}`,
		'',
		'Message:',
		lead.message,
	].join('\n')
	return { subject, text }
}

export interface LeadNotifierOptions {
	/** The Resend API key. Defaults to `RESEND_API_KEY` from the environment. */
	apiKey?: string
	/** The `fetch` implementation, injectable so tests assert on the request without a network call. */
	fetchImpl?: typeof fetch
}

/**
 * The production-wired notifier, backed by Resend's REST API over `fetch` (no
 * SDK dependency). The API key and `fetch` are injectable so tests exercise the
 * request shaping without sending a real email; with no key it returns a
 * failure Result rather than throwing.
 */
export function createLeadNotifier(
	options: LeadNotifierOptions = {},
): LeadNotifier {
	const apiKey =
		'apiKey' in options ? options.apiKey : process.env.RESEND_API_KEY
	const fetchImpl = options.fetchImpl ?? fetch

	return {
		async notify(lead) {
			if (!apiKey) {
				return { ok: false, error: 'RESEND_API_KEY is not configured' }
			}

			const { subject, text } = formatLeadEmail(lead)

			try {
				const response = await fetchImpl('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						from: FROM_ADDRESS,
						to: [TEAM_INBOX],
						// So a reply from the team goes straight to the prospect.
						reply_to: lead.email,
						subject,
						text,
					}),
				})

				if (!response.ok) {
					return {
						ok: false,
						error: `Resend responded with status ${response.status}`,
					}
				}

				return { ok: true }
			} catch (cause) {
				return {
					ok: false,
					error:
						cause instanceof Error ? cause.message : 'Notification send failed',
				}
			}
		},
	}
}
