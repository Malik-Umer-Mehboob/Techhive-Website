import { z } from 'zod'

import { isHoneypotTripped } from './honeypot'
import { createLeadNotifier } from './notifier'
import { createRateLimiter } from './rate-limiter'
import { createLeadRepository } from './repository'
import { leadSchema } from './schema'

import type { LeadNotifier } from './notifier'
import type { RateLimiter } from './rate-limiter'
import type { Lead, LeadRepository } from './repository'

/**
 * The outcome of a contact-form submission. `submitLead` never throws for an
 * ordinary validation failure, it returns this discriminated Result so the
 * form can show field errors or a success confirmation.
 *
 * Spam guards (#8) short-circuit ahead of validation: a tripped honeypot is
 * rejected *silently* (an apparent success, nothing persisted), and an
 * over-threshold IP gets the `rate-limited` failure. Email notification (#7)
 * runs *after* persistence: if the send fails, the Lead stays persisted and the
 * `notification` failure carries it back, so the caller can surface a soft
 * warning without losing the Lead.
 */
export type SubmitLeadResult =
	| { ok: true; lead: Lead }
	| {
			ok: false
			kind: 'validation'
			formErrors: Array<string>
			fieldErrors: Record<string, Array<string> | undefined>
	  }
	| { ok: false; kind: 'rate-limited' }
	| { ok: false; kind: 'notification'; lead: Lead }

/** The collaborators `submitLead` orchestrates, injectable so it can be tested in isolation. */
export interface SubmitLeadDeps {
	repository: LeadRepository
	/** Per-IP rate limiter; the server function injects the shared per-instance one. */
	rateLimiter: RateLimiter
	/** The submitter's IP, used as the rate-limit key. `'unknown'` when unavailable. */
	clientIp: string
	/** Sends the team notification after persistence; tests inject a fake so no real email is sent. */
	notifier: LeadNotifier
}

function defaultDeps(): SubmitLeadDeps {
	return {
		repository: createLeadRepository(),
		// A permissive fallback so a bare `submitLead(input)` never blocks; the
		// server function injects the shared limiter that actually enforces the
		// threshold across requests.
		rateLimiter: createRateLimiter({ limit: Infinity, windowMs: 60_000 }),
		clientIp: 'unknown',
		notifier: createLeadNotifier(),
	}
}

/**
 * Honeypot-tripped submissions get an apparent success with a throwaway,
 * never-persisted Lead. The bot sees the same success Result a human would, so
 * it gets no signal it was caught, while nothing reaches the store or the inbox.
 */
function silentBotSuccess(): SubmitLeadResult {
	return {
		ok: true,
		lead: {
			id: 0,
			firstName: '',
			lastName: '',
			email: '',
			company: null,
			serviceInterest: '',
			message: '',
			createdAt: new Date(),
		},
	}
}

/**
 * The single public entry point to the Lead module, guard, validate, persist.
 *
 * This is the deep-module boundary the contact form's server function calls. It
 * runs the spam guards (honeypot, then per-IP rate limit) ahead of validation
 * and persistence, then validates with the shared `leadSchema` and persists via
 * the injected repository.
 */
export async function submitLead(
	input: unknown,
	deps: Partial<SubmitLeadDeps> = {},
): Promise<SubmitLeadResult> {
	const { repository, rateLimiter, clientIp, notifier } = {
		...defaultDeps(),
		...deps,
	}

	// Honeypot guard, a filled hidden field means a bot. Drop it silently before
	// it can consume a rate-limit slot or reach validation/persistence.
	if (isHoneypotTripped(input)) {
		return silentBotSuccess()
	}

	// Per-IP rate-limit guard, reject submissions over the threshold before any
	// validation or persistence work.
	if (!rateLimiter.allow(clientIp)) {
		return { ok: false, kind: 'rate-limited' }
	}

	const parsed = leadSchema.safeParse(input)
	if (!parsed.success) {
		const { formErrors, fieldErrors } = z.flattenError(parsed.error)
		return { ok: false, kind: 'validation', formErrors, fieldErrors }
	}

	const lead = await repository.save(parsed.data)

	// Persist-then-notify: the Lead is already saved, so a failed send must not
	// discard it. Report a `notification` failure that carries the persisted Lead
	// back so the caller can warn softly instead of losing the submission.
	const notified = await notifier.notify(lead)
	if (!notified.ok) {
		return { ok: false, kind: 'notification', lead }
	}

	return { ok: true, lead }
}
