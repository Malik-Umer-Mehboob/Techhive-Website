import { describe, expect, it } from 'vitest'

import { leadSchema } from './schema'
import { serviceOptions } from '#/content'

const validLead = {
	firstName: 'Ali',
	lastName: 'Hassan',
	email: 'ali@company.com',
	company: 'Acme Inc',
	serviceInterest: 'ai-integration',
	message: 'We want to embed Claude into our support workflow.',
}

describe('leadSchema', () => {
	it('accepts a fully valid Lead', () => {
		expect(leadSchema.safeParse(validLead).success).toBe(true)
	})

	it('accepts a blank company (company is optional for the visitor)', () => {
		expect(leadSchema.safeParse({ ...validLead, company: '' }).success).toBe(
			true,
		)
	})

	it.each(['firstName', 'lastName', 'message'] as const)(
		'rejects a missing %s',
		(field) => {
			const result = leadSchema.safeParse({ ...validLead, [field]: '' })
			expect(result.success).toBe(false)
		},
	)

	it('rejects a malformed email', () => {
		const result = leadSchema.safeParse({ ...validLead, email: 'not-an-email' })
		expect(result.success).toBe(false)
	})

	it('accepts every canonical service option as a service interest', () => {
		for (const option of serviceOptions()) {
			const result = leadSchema.safeParse({
				...validLead,
				serviceInterest: option.value,
			})
			expect(result.success).toBe(true)
		}
	})

	it('includes "something-else" as a valid service interest', () => {
		const result = leadSchema.safeParse({
			...validLead,
			serviceInterest: 'something-else',
		})
		expect(result.success).toBe(true)
	})

	it('rejects an unknown service interest', () => {
		const result = leadSchema.safeParse({
			...validLead,
			serviceInterest: 'crypto-mining',
		})
		expect(result.success).toBe(false)
	})

	it('rejects an over-long message', () => {
		const result = leadSchema.safeParse({
			...validLead,
			message: 'x'.repeat(2001),
		})
		expect(result.success).toBe(false)
	})

	it('rejects a too-short message', () => {
		const result = leadSchema.safeParse({ ...validLead, message: 'hi' })
		expect(result.success).toBe(false)
	})
})
