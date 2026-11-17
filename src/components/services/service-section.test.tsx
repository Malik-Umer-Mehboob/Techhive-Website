// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ODOO_APPS, SERVICES, serviceLink } from '#/content'
import { ServiceSection } from './service-section'

// Render `<Link>` as a plain anchor so the section can be unit-tested without a
// RouterProvider; `linkOptions` (used by serviceLink) stays the real impl.
vi.mock('@tanstack/react-router', async (importActual) => {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const actual = await importActual<typeof import('@tanstack/react-router')>()
	return {
		...actual,
		Link: ({
			to,
			hash,
			children,
			...props
		}: {
			to?: string
			hash?: string
			children?: React.ReactNode
		}) => (
			<a
				href={`${typeof to === 'string' ? to : ''}${hash ? `#${hash}` : ''}`}
				{...props}
			>
				{children}
			</a>
		),
	}
})

describe('Services page sections', () => {
	afterEach(cleanup)

	it('renders one section per canonical Service, no list duplicated', () => {
		const { container } = render(
			<>
				{SERVICES.map((service, index) => (
					<ServiceSection key={service.slug} service={service} index={index} />
				))}
			</>,
		)
		const sections = container.querySelectorAll('[data-slot="service-section"]')
		expect(sections.length).toBe(SERVICES.length)
		const ids = Array.from(sections).map((el) => el.id)
		expect(new Set(ids).size).toBe(SERVICES.length)
	})

	it('gives each section a stable anchor id matching its Service slug', () => {
		const { container } = render(
			<>
				{SERVICES.map((service, index) => (
					<ServiceSection key={service.slug} service={service} index={index} />
				))}
			</>,
		)
		const ids = Array.from(
			container.querySelectorAll('[data-slot="service-section"]'),
		).map((el) => el.id)
		expect(ids).toEqual(SERVICES.map((s) => s.slug))
	})

	it('targets each anchor with the Home grid deep-link (serviceLink)', () => {
		// The Home "Learn more" link and the section anchor must never drift.
		for (const service of SERVICES) {
			expect(serviceLink(service).hash).toBe(service.slug)
		}
	})

	it('orders AI Integration first and retains Odoo ERP', () => {
		const slugs = SERVICES.map((s) => s.slug)
		expect(slugs[0]).toBe('ai-integration')
		expect(slugs).toContain('odoo-erp')
	})

	it('carries the anchor-offset class so the fixed header never overlaps', () => {
		const { container } = render(
			<ServiceSection service={SERVICES[0]} index={0} />,
		)
		expect(
			container
				.querySelector('[data-slot="service-section"]')
				?.className.includes('scroll-mt'),
		).toBe(true)
	})

	it("renders each Service's headline, body and highlight items", () => {
		const service = SERVICES[0]
		const { container, getByText } = render(
			<ServiceSection service={service} index={0} />,
		)
		expect(getByText(service.detail.headline)).toBeDefined()
		expect(getByText(service.detail.body)).toBeDefined()
		const items = container.querySelectorAll('[data-slot="service-highlight"]')
		expect(items.length).toBe(service.detail.highlights?.items.length ?? 0)
		expect(items.length).toBeGreaterThan(0)
	})

	it('resolves every odooApp cross-link to a real Odoo App', () => {
		// A stale slug would render no link, so fail loudly instead.
		const slugs = ODOO_APPS.map((app) => app.slug)
		for (const service of SERVICES) {
			if (service.detail.odooApp) {
				expect(slugs).toContain(service.detail.odooApp)
			}
		}
	})

	it("links AI Integration to the MCP Server's card on /odoo-apps", () => {
		const service = SERVICES.find((s) => s.slug === 'ai-integration')!
		const app = ODOO_APPS.find((a) => a.slug === service.detail.odooApp)!
		const { container } = render(<ServiceSection service={service} index={0} />)
		const link = container.querySelector('[data-slot="service-odoo-app"]')
		expect(link?.getAttribute('href')).toBe(`/odoo-apps#${app.slug}`)
		expect(link?.textContent).toContain(app.name)
	})
})
