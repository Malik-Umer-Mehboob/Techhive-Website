import { describe, expect, it } from 'vitest'

import { createLeadNotifier, formatLeadEmail } from './notifier'

import type { Lead } from './repository'

const lead: Lead = {
	id: 42,
	firstName: 'Ali',
	lastName: 'Hassan',
	email: 'ali@company.com',
	company: 'Acme Inc',
	serviceInterest: 'ai-integration',
	message: 'We want to embed Claude into our support workflow.',
	createdAt: new Date('2026-06-19T00:00:00.000Z'),
}

describe('formatLeadEmail', () => {
	it('includes the submitter details and the human-readable service interest', () => {
		const { subject, text } = formatLeadEmail(lead)

		// The service slug is resolved to its label so the team can route it.
		expect(subject).toContain('AI Integration')
		expect(text).toContain('Ali Hassan')
		expect(text).toContain('ali@company.com')
		expect(text).toContain('Acme Inc')
		expect(text).toContain('AI Integration')
		expect(text).toContain('We want to embed Claude into our support workflow.')
	})

	it('falls back to the raw value for an unknown service interest', () => {
		const { text } = formatLeadEmail({
			...lead,
			serviceInterest: 'something-else',
		})

		expect(text).toContain('Something else')
	})
})

describe('createLeadNotifier', () => {
	it('returns a failure Result when no API key is configured', async () => {
		const notifier = createLeadNotifier({ apiKey: undefined })

		const result = await notifier.notify(lead)

		expect(result.ok).toBe(false)
	})

	it('POSTs the Lead notification to Resend with the key and team inbox', async () => {
		const calls: Array<{ url: string; init: RequestInit }> = []
		const fetchImpl = (async (url: string, init: RequestInit) => {
			calls.push({ url, init })
			return new Response('{}', { status: 200 })
		}) as unknown as typeof fetch

		const notifier = createLeadNotifier({ apiKey: 're_test_key', fetchImpl })
		const result = await notifier.notify(lead)

		expect(result.ok).toBe(true)
		expect(calls).toHaveLength(1)
		expect(calls[0].url).toBe('https://api.resend.com/emails')
		const headers = calls[0].init.headers as Record<string, string>
		expect(headers.Authorization).toBe('Bearer re_test_key')
		const body = JSON.parse(calls[0].init.body as string)
		expect(body.to).toContain('info@techhivesolutions.com')
		expect(body.reply_to).toBe('ali@company.com')
		expect(body.subject).toContain('AI Integration')
	})

	it('returns a failure Result when Resend responds with an error status', async () => {
		const fetchImpl = (async () =>
			new Response('nope', { status: 422 })) as unknown as typeof fetch

		const notifier = createLeadNotifier({ apiKey: 're_test_key', fetchImpl })
		const result = await notifier.notify(lead)

		expect(result.ok).toBe(false)
		if (!result.ok) {
			expect(result.error).toContain('422')
		}
	})

	it('returns a failure Result when the network call throws', async () => {
		const fetchImpl = (async () => {
			throw new Error('network down')
		}) as unknown as typeof fetch

		const notifier = createLeadNotifier({ apiKey: 're_test_key', fetchImpl })
		const result = await notifier.notify(lead)

		expect(result.ok).toBe(false)
		if (!result.ok) {
			expect(result.error).toContain('network down')
		}
	})
})
