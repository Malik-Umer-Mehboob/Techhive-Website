import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Drizzle schema.
 *
 * The database exists solely to persist Leads (contact-form submissions), page
 * content lives in typed TS modules, not the DB (see CONTEXT.md). The demo
 * `todos` table has been removed; the `leads` table is the only table, and the
 * driver is libSQL so Lead data survives on any host (local file in dev/test,
 * hosted Turso in production, see #9).
 */
export const leads = sqliteTable('leads', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	/** Optional, the contact form does not require a company. */
	company: text('company'),
	/** A Service slug or "something-else", see `leadSchema`. */
	serviceInterest: text('service_interest').notNull(),
	message: text('message').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
})

export type LeadRow = typeof leads.$inferSelect
export type NewLeadRow = typeof leads.$inferInsert
