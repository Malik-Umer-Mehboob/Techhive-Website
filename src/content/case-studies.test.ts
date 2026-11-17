import { describe, expect, it } from 'vitest'

import {
	CASE_STUDIES,
	DETAIL_PAGE_CASE_STUDIES,
	findCaseStudy,
	hasDetailPage,
} from './case-studies'

describe('case study detail pages', () => {
	it('gives the long-form Odoo case studies their own page', () => {
		expect(DETAIL_PAGE_CASE_STUDIES.map((study) => study.slug)).toEqual([
			'yuksel-seeds',
			'hsi',
			'next-bridge',
		])
	})

	it('keeps MHPSS and TutorBees inline on /portfolio', () => {
		for (const slug of ['mhpss', 'tutorbees']) {
			const study = findCaseStudy(slug)
			expect(study && hasDetailPage(study)).toBe(false)
		}
	})

	it('finds nothing for an unknown slug', () => {
		expect(findCaseStudy('abc')).toBeUndefined()
	})

	it('gives each detail page a hand-written excerpt naming the client and Odoo', () => {
		for (const study of DETAIL_PAGE_CASE_STUDIES) {
			const excerpt = study.detail.excerpt ?? ''
			const client = study.title.split(' - ')[0]
			expect(excerpt).toContain(client)
			expect(excerpt).toContain('Odoo')
			expect(excerpt.length).toBeLessThanOrEqual(160)
		}
	})

	it('has no em dashes in any case study copy', () => {
		expect(JSON.stringify(CASE_STUDIES)).not.toContain('\u2014')
	})
})
