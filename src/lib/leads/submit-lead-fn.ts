import { createServerFn } from '@tanstack/react-start'
import { getRequestIP } from '@tanstack/react-start/server'

import { createRateLimiter } from './rate-limiter'
import { submitLead } from './submit-lead'

import type { SubmitLeadResult } from './submit-lead'

/**
 * The shared, per-instance rate limiter that enforces the contact-form
 * threshold. It lives at module scope so its state survives across requests to
 * the same serverless instance. It does not coordinate across instances, see
 * the note in `rate-limiter.ts`; revisit with a shared store if abuse appears.
 */
const rateLimiter = createRateLimiter({ limit: 5, windowMs: 60_000 })

/**
 * The contact form's server entry point. Runs only on the server, so the libSQL
 * client and the `submitLead` orchestration never reach the client bundle.
 *
 * It reads the client IP from the request (trusting `X-Forwarded-For` set by the
 * hosting proxy) and hands it, with the shared rate limiter, to `submitLead`,
 * which runs the spam guards ahead of validation and persistence.
 */
export const submitLeadFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => data)
	.handler(async ({ data }): Promise<SubmitLeadResult> => {
		const clientIp = getRequestIP({ xForwardedFor: true }) ?? 'unknown'

		// `submitLead` returns a Result for ordinary outcomes, but persistence can
		// still throw (e.g. an unreachable store or missing env in a misconfigured
		// deploy). Catch it here so the client gets a `validation` failure to
		// surface rather than a rejected promise that leaves the form hung on
		// "Sending…" with no feedback.
		let result: SubmitLeadResult
		try {
			result = await submitLead(data, { rateLimiter, clientIp })
		} catch (cause) {
			console.error('Lead submission failed unexpectedly', cause)
			return {
				ok: false,
				kind: 'validation',
				formErrors: ['Something went wrong. Please try again.'],
				fieldErrors: {},
			}
		}

		// The Lead is persisted but the team email did not send. Log it server-side
		// so the miss is visible in ops; the visitor still gets a success.
		if (!result.ok && result.kind === 'notification') {
			console.error(
				`Lead ${result.lead.id} persisted but team notification failed`,
			)
		}

		return result
	})
