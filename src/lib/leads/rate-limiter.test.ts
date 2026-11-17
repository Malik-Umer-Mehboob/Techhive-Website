import { describe, expect, it } from 'vitest'

import { createRateLimiter } from './rate-limiter'

describe('createRateLimiter', () => {
	it('allows hits up to the limit, then rejects further hits in the window', () => {
		const limiter = createRateLimiter({
			limit: 2,
			windowMs: 60_000,
			now: () => 0,
		})

		expect(limiter.allow('1.2.3.4')).toBe(true)
		expect(limiter.allow('1.2.3.4')).toBe(true)
		expect(limiter.allow('1.2.3.4')).toBe(false)
	})

	it('tracks each key independently', () => {
		const limiter = createRateLimiter({
			limit: 1,
			windowMs: 60_000,
			now: () => 0,
		})

		expect(limiter.allow('1.1.1.1')).toBe(true)
		expect(limiter.allow('1.1.1.1')).toBe(false)
		// A different IP is unaffected by another's hits.
		expect(limiter.allow('2.2.2.2')).toBe(true)
	})

	it('forgets hits once they fall outside the window', () => {
		let clock = 0
		const limiter = createRateLimiter({
			limit: 1,
			windowMs: 1_000,
			now: () => clock,
		})

		expect(limiter.allow('1.2.3.4')).toBe(true)
		expect(limiter.allow('1.2.3.4')).toBe(false)

		// Advance past the window, the earlier hit no longer counts.
		clock = 1_001
		expect(limiter.allow('1.2.3.4')).toBe(true)
	})
})
