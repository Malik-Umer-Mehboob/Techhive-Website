import {
	Activity,
	BookOpen,
	Building2,
	DollarSign,
	Factory,
	Globe,
	Pill,
	ShoppingCart,
} from 'lucide-react'

import type { Industry, ProcessStep } from './types'

/**
 * Typed content for the About page. Edit copy here without touching layout.
 *
 * Positioning note (see CONTEXT.md): Odoo appears here as a *credential*, the
 * certified Odoo Partner badge and module expertise, not as the primary
 * offering. AI Integration / the Claude Partner Network is the flagship anchor,
 * reused from the Home page via the shared `<PartnerCallout />`.
 */
export const about = {
	hero: {
		label: 'Our story',
		title: 'Built by engineers. Trusted by enterprises.',
		body: 'Two decades of shipping software that matters, from Lahore to the US and everywhere in between.',
	},
	story: {
		label: 'Who we are',
		title: 'Technology partner, not just vendor',
		body: [
			"TechHive Solutions started as an offshoring company with a single mission: deliver the quality of software that large enterprises expect, but with the speed and flexibility that growing businesses need. Two decades later, we're still doing exactly that, with the added depth of being a certified Odoo partner and a registered Claude Partner Network member.",
			'Our portfolio spans government digital health platforms, AI-powered tutoring marketplaces, full ERP rollouts, and mobile apps used by tens of thousands of people every day.',
		],
		values: [
			'We own the outcome, not just the deliverable, our relationship continues after launch',
			'We recommend the right solution, not the most expensive one',
			'We build products ourselves, TutorBees and Talent, so we know what it takes to ship',
			'Senior engineers on every project, not juniors supervised from afar',
		],
		stats: [
			{
				value: '20+',
				label: 'Years delivering enterprise software',
				accent: true,
			},
			{ value: '50+', label: 'Projects shipped across Pakistan and the US' },
			{ value: '2', label: 'In-house products with real users' },
			{
				value: '∞',
				label: 'Cups of chai consumed in the process',
				accent: true,
			},
		] satisfies Array<{ value: string; label: string; accent?: boolean }>,
	},
	/**
	 * The Odoo credential, a certified Odoo Partner proof point, not a
	 * primary offering. Carries the `partners` anchor the footer deep-links to.
	 */
	odoo: {
		label: 'Certifications',
		title: 'Certified Odoo Partner',
		body: [
			"TechHive is a certified Odoo Partner. Every implementation we deliver is backed by Odoo's official partner programme, verified expertise, access to technical resources, and a direct line to Odoo's support infrastructure.",
			"We don't just install Odoo. We understand the business problem first, design the right module structure, develop custom extensions, and stay with you through adoption and beyond.",
		],
		badge: 'Odoo Partner',
		modules: [
			{ name: 'CRM', description: 'Sales pipeline & contacts' },
			{ name: 'Accounting', description: 'Full financial management' },
			{ name: 'Inventory', description: 'Warehouse & stock control' },
			{ name: 'Point of Sale', description: 'Retail & restaurant POS' },
			{ name: 'Manufacturing', description: 'Production & MRP' },
			{ name: 'HR & Payroll', description: 'People & compensation' },
		] satisfies Array<{ name: string; description: string }>,
	},
	industries: {
		label: 'Industries',
		title: 'Sectors we know inside out',
		items: [
			{ name: 'Healthcare & NGOs', icon: Activity },
			{ name: 'Education & EdTech', icon: BookOpen },
			{ name: 'Manufacturing', icon: Factory },
			{ name: 'Real Estate', icon: Building2 },
			{ name: 'Retail & eCommerce', icon: ShoppingCart },
			{ name: 'Financial Services', icon: DollarSign },
			{ name: 'Pharma', icon: Pill },
			{ name: 'Technology', icon: Globe },
		] satisfies Array<Industry>,
	},
	/**
	 * The "how we work" steps. Order is significant, Discovery → Proposal →
	 * Build → Launch & Support, and the step number is rendered from the array
	 * index so numbering can never drift from sequence.
	 */
	process: {
		label: 'How we work',
		title: 'From first call to live system',
		steps: [
			{
				name: 'Discovery',
				description:
					'We understand your business, processes and goals before recommending anything technical.',
			},
			{
				name: 'Proposal',
				description:
					'A clear, fixed-scope proposal with timeline, cost and technical approach, no surprises later.',
			},
			{
				name: 'Build',
				description:
					'Agile sprints with regular demos. You see progress every two weeks, not at the end.',
			},
			{
				name: 'Launch & Support',
				description:
					'We deploy, train your team, and remain your technical partner for the long run.',
			},
		] satisfies Array<ProcessStep>,
	},
}
