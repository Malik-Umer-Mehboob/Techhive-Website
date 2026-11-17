import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { beforeEach, describe, expect, it } from 'vitest'

import { leads } from '#/db/schema'
import { createRateLimiter } from './rate-limiter'
import { createLeadRepository } from './repository'
import { submitLead } from './submit-lead'

import type { Db } from '#/db'
import type { LeadNotifier } from './notifier'
import type { Lead } from './repository'

/** A notifier that records the Leads it was asked to notify and reports the given outcome. */
function fakeNotifier(ok = true): LeadNotifier & { sent: Array<Lead> } {
	const sent: Array<Lead> = []
	return {
		sent,
		async notify(lead) {
			sent.push(lead)
			return ok ? { ok: true } : { ok: false, error: 'send failed' }
		},
	}
}

/**
 * A fresh in-memory libSQL database with the `leads` table created, the same
 * driver production uses, so the orchestration is exercised end to end without
 * touching a real file or a browser.
 */
async function createTestDb(): Promise<Db> {
	const db = drizzle({ connection: { url: ':memory:' }, schema: { leads } })
	await db.run(sql`
		CREATE TABLE leads (
			id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
			first_name text NOT NULL,
			last_name text NOT NULL,
			email text NOT NULL,
			company text,
			service_interest text NOT NULL,
			message text NOT NULL,
			created_at integer NOT NULL
		)
	`)
	return db
}

const validInput = {
	firstName: 'Ali',
	lastName: 'Hassan',
	email: 'ali@company.com',
	company: 'Acme Inc',
	serviceInterest: 'ai-integration',
	message: 'We want to embed Claude into our support workflow.',
}

describe('submitLead', () => {
	let db: Db

	beforeEach(async () => {
		db = await createTestDb()
	})

	async function countLeads() {
		const rows = await db.select().from(leads)
		return rows.length
	}

	it('persists a Lead and returns a success Result for valid input', async () => {
		const repository = createLeadRepository(db)

		const result = await submitLead(validInput, {
			repository,
			notifier: fakeNotifier(),
		})

		expect(result.ok).toBe(true)
		if (result.ok) {
			expect(result.lead.id).toBeGreaterThan(0)
			expect(result.lead.email).toBe('ali@company.com')
			expect(result.lead.serviceInterest).toBe('ai-integration')
		}
		expect(await countLeads()).toBe(1)
	})

	it('notifies the team with the persisted Lead after a successful save', async () => {
		const repository = createLeadRepository(db)
		const notifier = fakeNotifier()

		const result = await submitLead(validInput, { repository, notifier })

		expect(result.ok).toBe(true)
		expect(notifier.sent).toHaveLength(1)
		// The persisted Lead (with its store-assigned id) is what gets notified.
		expect(notifier.sent[0].id).toBeGreaterThan(0)
		expect(notifier.sent[0].serviceInterest).toBe('ai-integration')
	})

	it('keeps the Lead persisted but returns a notification failure when the email fails to send', async () => {
		const repository = createLeadRepository(db)

		const result = await submitLead(validInput, {
			repository,
			notifier: fakeNotifier(false),
		})

		expect(result.ok).toBe(false)
		if (!result.ok && result.kind === 'notification') {
			// The caller still gets the persisted Lead back, it is not lost.
			expect(result.lead.id).toBeGreaterThan(0)
		} else {
			expect.fail('expected a notification failure')
		}
		// The Lead remains in the store despite the failed notification.
		expect(await countLeads()).toBe(1)
	})

	it('does not notify when validation fails', async () => {
		const repository = createLeadRepository(db)
		const notifier = fakeNotifier()

		await submitLead(
			{ ...validInput, email: 'not-an-email' },
			{ repository, notifier },
		)

		expect(notifier.sent).toHaveLength(0)
	})

	it('rejects invalid input with a validation Result and persists nothing', async () => {
		const repository = createLeadRepository(db)

		const result = await submitLead(
			{ ...validInput, email: 'not-an-email', firstName: '' },
			{ repository },
		)

		expect(result.ok).toBe(false)
		if (!result.ok && result.kind === 'validation') {
			expect(result.fieldErrors.email).toBeDefined()
			expect(result.fieldErrors.firstName).toBeDefined()
		} else {
			expect.fail('expected a validation failure')
		}
		expect(await countLeads()).toBe(0)
	})

	it('does not call the repository when validation fails', async () => {
		let saveCalls = 0
		const repository = {
			save: async (input: typeof validInput) => {
				saveCalls += 1
				return { ...input, id: 1, company: null, createdAt: new Date() }
			},
		}

		await submitLead({ ...validInput, message: 'too short' }, { repository })

		expect(saveCalls).toBe(0)
	})

	it('silently drops a honeypot-tripped submission without persisting', async () => {
		const repository = createLeadRepository(db)

		const result = await submitLead(
			{ ...validInput, website: 'http://spam.example' },
			{ repository },
		)

		// The bot gets an apparent success, no signal it was caught...
		expect(result.ok).toBe(true)
		// ...but nothing is persisted.
		expect(await countLeads()).toBe(0)
	})

	it('checks the honeypot before validation (a bot with junk fields is still dropped silently)', async () => {
		let saveCalls = 0
		const repository = {
			save: async (input: typeof validInput) => {
				saveCalls += 1
				return { ...input, id: 1, company: null, createdAt: new Date() }
			},
		}

		const result = await submitLead(
			{ website: 'filled', firstName: '', email: 'not-an-email' },
			{ repository },
		)

		expect(result.ok).toBe(true)
		expect(saveCalls).toBe(0)
	})

	it('rejects submissions from an IP over the rate limit and persists nothing extra', async () => {
		const repository = createLeadRepository(db)
		const rateLimiter = createRateLimiter({
			limit: 1,
			windowMs: 60_000,
			now: () => 0,
		})
		const clientIp = '203.0.113.7'

		const notifier = fakeNotifier()
		const first = await submitLead(validInput, {
			repository,
			rateLimiter,
			clientIp,
			notifier,
		})
		const second = await submitLead(validInput, {
			repository,
			rateLimiter,
			clientIp,
			notifier,
		})

		expect(first.ok).toBe(true)
		expect(second.ok).toBe(false)
		if (!second.ok) {
			expect(second.kind).toBe('rate-limited')
		}
		// Only the first submission reached the store.
		expect(await countLeads()).toBe(1)
	})
})
