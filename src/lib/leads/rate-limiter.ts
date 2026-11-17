/**
 * A narrow per-key rate limiter. `submitLead` depends on this interface, not on
 * any particular timing source, so the rate-limit-trip path can be exercised
 * deterministically by injecting a fake clock instead of waiting on wall-clock.
 */
export interface RateLimiter {
	/**
	 * Records a hit for `key` and returns whether it is allowed. Returns `false`
	 * once the key has exceeded the configured threshold within the window.
	 */
	allow: (key: string) => boolean
}

export interface RateLimiterOptions {
	/** Maximum number of allowed hits per key within {@link windowMs}. */
	limit: number
	/** Sliding window length, in milliseconds. */
	windowMs: number
	/** Injectable clock (ms since epoch); defaults to wall-clock `Date.now`. */
	now?: () => number
}

/**
 * A light in-memory sliding-window rate limiter. State lives in a `Map` keyed by
 * client IP, so it is per-process, it does not coordinate across serverless
 * instances. That is acceptable for the current slice (see #8); revisit with a
 * shared store if real abuse appears.
 */
export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
	const { limit, windowMs } = options
	const now = options.now ?? (() => Date.now())
	const hitsByKey = new Map<string, Array<number>>()

	return {
		allow(key) {
			const timestamp = now()
			const windowStart = timestamp - windowMs
			const recent = (hitsByKey.get(key) ?? []).filter((t) => t > windowStart)

			if (recent.length >= limit) {
				hitsByKey.set(key, recent)
				return false
			}

			recent.push(timestamp)
			hitsByKey.set(key, recent)
			return true
		},
	}
}
