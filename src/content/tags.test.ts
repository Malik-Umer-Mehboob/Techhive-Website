import { describe, expect, it } from 'vitest'

import type { TagKind } from './tags'
import { TAG_KINDS } from './tags'

describe('tag kinds', () => {
	it('styles Odoo ERP as the odoo kind', () => {
		expect(TAG_KINDS['Odoo ERP']).toBe('odoo')
	})

	it('uses every tag kind for at least one tag', () => {
		const used = new Set<TagKind>(Object.values(TAG_KINDS))
		const kinds: Array<TagKind> = [
			'odoo',
			'technology',
			'industry',
			'partner',
			'own',
		]
		expect(kinds.filter((kind) => !used.has(kind))).toEqual([])
	})
})
