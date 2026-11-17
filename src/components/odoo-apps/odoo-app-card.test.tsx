// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ODOO_APPS } from '#/content'
import { OdooAppCard } from './odoo-app-card'

// The store CTA is a plain off-site anchor (not a router <Link>), so the card
// renders without a RouterProvider, no mock needed.

describe('OdooAppCard', () => {
	afterEach(cleanup)

	const app = ODOO_APPS[0]

	it('renders the app name and price', () => {
		const { getAllByText, getByText } = render(<OdooAppCard app={app} />)
		expect(getByText(app.name)).toBeDefined()
		// Price appears both in the header and the spec strip.
		expect(getAllByText(app.price).length).toBeGreaterThan(0)
	})

	it('links to the Odoo store, opening off-site in a new tab safely', () => {
		const { getByRole } = render(<OdooAppCard app={app} />)
		const cta = getByRole('link', { name: /view on odoo apps/i })
		expect(cta.getAttribute('href')).toBe(app.storeUrl)
		expect(cta.getAttribute('target')).toBe('_blank')
		expect(cta.getAttribute('rel')).toBe('noopener noreferrer')
	})

	it('renders every feature bullet', () => {
		const { container } = render(<OdooAppCard app={app} />)
		const features = container.querySelectorAll(
			'[data-slot="odoo-app-feature"]',
		)
		expect(features.length).toBe(app.features.length)
		expect(features.length).toBeGreaterThan(0)
	})

	it('surfaces the Enterprise requirement gate when present', () => {
		const { getByText } = render(<OdooAppCard app={app} />)
		if (app.requirement) {
			expect(getByText(app.requirement)).toBeDefined()
		}
	})

	it('anchors each card by slug so Service cross-links can deep-link to it', () => {
		for (const each of ODOO_APPS) {
			const { container, unmount } = render(<OdooAppCard app={each} />)
			expect(container.querySelector('[data-slot="odoo-app-card"]')?.id).toBe(
				each.slug,
			)
			unmount()
		}
	})
})
