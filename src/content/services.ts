import { linkOptions } from '@tanstack/react-router'
import {
	Boxes,
	Globe,
	GraduationCap,
	Smartphone,
	Sparkles,
	Users,
} from 'lucide-react'

import type { Service } from './types'

/**
 * The canonical list of Services, the SINGLE source of truth.
 *
 * The Home service grid, the Services page, the footer and the contact-form
 * dropdown all derive from this array, so it must never be duplicated. Ordering
 * is significant: it is the priority order in which Services are presented.
 * AI Integration leads (flagship); Odoo ERP is retained but demoted. See
 * CONTEXT.md for the positioning decision.
 */
export const SERVICES: Array<Service> = [
	{
		slug: 'ai-integration',
		name: 'AI Integration',
		summary:
			'Embed Anthropic Claude into your applications, document automation, natural-language interfaces and intelligent workflows. We are a registered Claude Partner Network member.',
		icon: Sparkles,
		detail: {
			headline: 'AI woven into the software you already run',
			body: 'As a registered Claude Partner Network member, we embed Anthropic Claude across the platforms we build and the systems you already operate, intelligent document processing, natural-language interfaces, and workflows that make a real decision instead of a hand-off.',
			highlights: {
				label: 'Where we embed AI',
				items: [
					'Document automation, extraction, classification and summarisation at scale',
					'Natural-language interfaces over your data, ERP and internal tools',
					'AI tutors and assistants inside your product experience',
					'Retrieval and grounding so answers come from your sources, not guesses',
				],
			},
			odooApp: 'mcp-server-for-ai-agents',
		},
	},
	{
		slug: 'odoo-erp',
		name: 'Odoo ERP',
		summary:
			'Certified Odoo Partner. We implement, customise and support Odoo across CRM, accounting, POS, inventory, HR, sales and manufacturing.',
		icon: Boxes,
		detail: {
			headline: 'ERP that fits the way your business actually works',
			body: 'As a certified Odoo Partner, we implement, extend and maintain Odoo so it matches your processes, not the other way around. From discovery and data migration through to go-live, training and post-launch support.',
			highlights: {
				label: 'Modules we implement',
				items: [
					'CRM',
					'Accounting',
					'Inventory',
					'Point of Sale',
					'Sales',
					'Manufacturing',
					'HR & Payroll',
					'Purchase',
					'Project',
					'Website',
				],
			},
		},
	},
	{
		slug: 'web-portals',
		name: 'Web Portals & Apps',
		summary:
			'Custom web applications built to your exact business logic, from client portals to large-scale SaaS platforms used by thousands daily.',
		icon: Globe,
		detail: {
			headline: 'Web platforms built for serious use',
			body: 'We build portals and applications that handle real load, real complexity and real users, not brochure sites. Think SaaS platforms, government systems and marketplaces, hosted and maintained long after handover.',
			highlights: {
				label: 'How we deliver',
				items: [
					'Requirements analysis, UX design and architecture before a line of code',
					'Scalable backend with secure APIs and role-based access control',
					'Integration with payment systems, SMS gateways and third-party data',
					"Hosted, deployed and maintained, we don't disappear after handover",
				],
			},
		},
	},
	{
		slug: 'mobile-apps',
		name: 'Mobile Applications',
		summary:
			'Native and cross-platform mobile apps for iOS and Android, from concept through store deployment and ongoing maintenance.',
		icon: Smartphone,
		detail: {
			headline: 'Mobile apps your users will actually keep',
			body: 'We design and develop iOS and Android applications that are fast, intuitive and built to the standards users expect, cross-platform when it makes sense, native when performance demands it.',
			highlights: {
				label: 'What we handle',
				items: [
					'Cross-platform (React Native / Flutter) or native iOS and Android',
					'UI/UX that follows platform conventions without feeling generic',
					'Backend APIs, authentication and push notification infrastructure',
					'App store submission, release management and post-launch iteration',
				],
			},
		},
	},
	{
		slug: 'elearning-lms',
		name: 'eLearning & LMS',
		summary:
			'End-to-end learning platforms, from LMS integration and virtual classrooms to fee management. Powered by TutorBees, our own live product.',
		icon: GraduationCap,
		detail: {
			headline: 'Learning platforms that engage, not just inform',
			body: "We built TutorBees, Pakistan's premier online tutoring platform with 20,000+ students. That experience informs every eLearning project we take on.",
			highlights: {
				label: 'What we build',
				items: [
					'LMS Integration',
					'Virtual Classes',
					'Fee Management',
					'Parent Portal',
					'Digital Library',
					'AI Learning Paths',
				],
			},
		},
	},
	{
		slug: 'offshoring',
		name: 'Offshoring',
		summary:
			'Dedicated offshore development teams for US and international clients, senior engineers embedded in your process, working your timezone.',
		icon: Users,
		detail: {
			headline: 'Your offshore team, without the offshore overhead',
			body: 'Senior engineers in Lahore working as part of your product team, your stack, your processes, your Slack. 20+ years of US-client delivery means we know what it takes.',
			highlights: {
				label: 'What you get',
				items: [
					'Vetted senior developers, PMs, QA engineers and UX designers',
					'Flexible team sizing, single augmented hire to a full dedicated squad',
					'US East Coast hours as standard; West Coast available',
					'NDA, IP ownership and compliance handled upfront, no ambiguity',
				],
			},
		},
	},
]

/**
 * Router link options for a Service's detailed section on the Services page,
 * the `/services#<slug>` deep link, as type-checked `<Link>` props. Spread into
 * a router `<Link>`: `<Link {...serviceLink(service)} />`. See docs/adr/0002.
 */
export function serviceLink(service: Service) {
	return linkOptions({ to: '/services', hash: service.slug })
}

/**
 * The contact-form "service interest" options: the seven Services plus a
 * trailing "Something else". Single-sourced from {@link SERVICES} so the
 * dropdown can never drift from the offering list.
 */
export function serviceOptions(): Array<{ value: string; label: string }> {
	return [
		...SERVICES.map((service) => ({
			value: service.slug,
			label: service.name,
		})),
		{ value: 'something-else', label: 'Something else' },
	]
}
