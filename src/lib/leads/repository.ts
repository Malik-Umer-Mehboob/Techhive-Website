import { getDb } from '#/db'
import { leads } from '#/db/schema'

import type { Db } from '#/db'
import type { LeadRow } from '#/db/schema'
import type { LeadInput } from './schema'

/** A persisted Lead, the validated submission plus its store-assigned id and timestamp. */
export type Lead = LeadRow

/**
 * The persistence seam for Leads. A single `save` operation keeps the interface
 * narrow; `submitLead` depends on this interface, not on Drizzle, so it can be
 * tested against a test libSQL database (or a fake) without a browser.
 */
export interface LeadRepository {
	save: (input: LeadInput) => Promise<Lead>
}

/**
 * The production-wired repository, backed by the libSQL `leads` table. The
 * database is injectable so tests can pass a client pointed at a local/in-memory
 * libSQL database.
 */
export function createLeadRepository(database: Db = getDb()): LeadRepository {
	return {
		async save(input) {
			const [row] = await database.insert(leads).values(input).returning()
			return row
		},
	}
}
