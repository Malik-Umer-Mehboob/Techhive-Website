// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PartnerCallout } from '#/components/home/partner-callout'
import { about } from '#/content'
import { AboutStory } from './about-story'
import { IndustriesSection } from './industries-section'
import { OdooSection } from './odoo-section'
import { ProcessSection } from './process-section'

// Render `<Link>` as a plain anchor so sections that deep-link (the Odoo
// section's `/odoo-apps` cross-link) unit-test without a RouterProvider.
vi.mock('@tanstack/react-router', async (importActual) => {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const actual = await importActual<typeof import('@tanstack/react-router')>()
	return {
		...actual,
		Link: ({
			to,
			children,
			...props
		}: {
			to?: string
			children?: React.ReactNode
		}) => (
			<a href={typeof to === 'string' ? to : ''} {...props}>
				{children}
			</a>
		),
	}
})

describe('About page sections', () => {
	afterEach(cleanup)

	it('renders the process steps in canonical order', () => {
		const { container } = render(<ProcessSection />)
		const names = Array.from(
			container.querySelectorAll('[data-slot="step-name"]'),
		).map((el) => el.textContent)
		expect(names).toEqual([
			'Discovery',
			'Proposal',
			'Build',
			'Launch & Support',
		])
	})

	it('numbers the process steps from one in sequence', () => {
		const { container } = render(<ProcessSection />)
		const numbers = Array.from(
			container.querySelectorAll('[data-slot="step-circle"]'),
		).map((el) => el.textContent)
		expect(numbers).toEqual(['1', '2', '3', '4'])
	})

	it('renders every industry served', () => {
		const { container } = render(<IndustriesSection />)
		const names = Array.from(
			container.querySelectorAll('[data-slot="industry-name"]'),
		).map((el) => el.textContent)
		expect(names).toEqual(about.industries.items.map((i) => i.name))
		expect(names.length).toBeGreaterThan(0)
	})

	it('shows the Odoo Partner credential under the partners anchor', () => {
		const { container } = render(<OdooSection />)
		expect(screen.getByText('Certified Odoo Partner')).toBeDefined()
		expect(screen.getByText('Odoo Partner')).toBeDefined()
		expect(container.querySelector('#partners')).not.toBeNull()
	})

	it('exposes the industries anchor target', () => {
		const { container } = render(<IndustriesSection />)
		expect(container.querySelector('#industries')).not.toBeNull()
	})

	it('presents the Claude Partner Network callout', () => {
		render(<PartnerCallout />)
		expect(
			screen.getAllByText(/Claude Partner Network/i).length,
		).toBeGreaterThan(0)
	})

	it('renders the story values and stats', () => {
		const { container } = render(<AboutStory />)
		const values = container.querySelectorAll('[data-slot="value-text"]')
		expect(values.length).toBe(about.story.values.length)
		const stats = container.querySelectorAll('[data-slot="about-stat"]')
		expect(stats.length).toBe(about.story.stats.length)
	})
})
