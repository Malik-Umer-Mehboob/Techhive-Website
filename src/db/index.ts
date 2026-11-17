import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema.ts'

import type { LibSQLDatabase } from 'drizzle-orm/libsql'

export type Db = LibSQLDatabase<typeof schema>

let instance: Db | undefined

/**
 * The Lead store, created on first use. Uses the libSQL driver so the same
 * client points at a local `file:` database in dev/test and a hosted Turso
 * database in production, both the connection target and its auth token come
 * from env, never code.
 *
 * `DATABASE_URL` selects the target: unset → a local `file:local.db` for
 * dev/test; a `libsql://…` URL → Turso in production. `DATABASE_AUTH_TOKEN` is
 * the Turso *database* auth token (a per-database JWT from
 * `turso db tokens create`, distinct from the Turso platform API token) and is
 * required when the URL is remote; it is harmlessly undefined for a local file.
 *
 * Construction is lazy and memoised so importing this module (e.g. when the
 * prerenderer loads the contact route) has no side effects, the client is only
 * built when a Lead is actually persisted at request time.
 */
export function getDb(): Db {
	if (!instance) {
		instance = drizzle({
			connection: {
				url: process.env.DATABASE_URL ?? 'file:local.db',
				authToken: process.env.DATABASE_AUTH_TOKEN,
			},
			schema,
		})
	}
	return instance
}
