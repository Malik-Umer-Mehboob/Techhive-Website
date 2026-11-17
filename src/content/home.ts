import { Boxes, GraduationCap, Sparkles } from 'lucide-react'

import type { CallToAction, HeroCard, Stat } from './types'

/** Typed content for the Home page. Edit copy here without touching layout. */
export const home = {
	hero: {
		headlineLead: 'We build software that',
		headlineAccent: 'drives growth.',
		body: 'Claude Implementation, enterprise-grade digital solutions',
		primaryCta: {
			label: 'Start a project',
			href: '/contact',
		} satisfies CallToAction,
		secondaryCta: {
			label: 'See our work',
			href: '/portfolio',
		} satisfies CallToAction,
		trustStats: [
			{ value: '20', suffix: '+', label: 'Years in tech' },
			{ value: '50', suffix: '+', label: 'Projects delivered' },
			{ value: '2', label: 'Own products launched' },
		] satisfies Array<Stat>,
		cards: [
			{
				name: 'AI Integration',
				description:
					'Claude-powered automation, natural-language interfaces and intelligent workflows embedded in your apps.',
				icon: Sparkles,
			},
			{
				name: 'Odoo ERP',
				description:
					'Enterprise and community version Odoo implementations, Odoo custom modules',
				icon: Boxes,
			},
			{
				name: 'eLearning & LMS',
				description:
					"TutorBees (Pakistan's premier tutoring platform) is our own product. We're a full service EdTech company",
				icon: GraduationCap,
				wide: true,
			},
		] satisfies Array<HeroCard>,
	},
	services: {
		label: 'What we do',
		title: 'Software and AI, delivered end-to-end',
		body: 'Whether you need Claude-powered automation, a full ERP rollout, a custom web platform or an embedded offshore team, TechHive has done it before, and will do it again.',
	},
	partner: {
		title: 'Registered on the Claude Partner Network',
		body: 'TechHive Solutions is an official Anthropic Claude Partner Network member. We integrate Claude-powered AI into your applications, intelligent workflows, document automation, natural-language interfaces, giving your business a genuine AI advantage.',
		pill: '✓ Verified Partner',
	},
	stats: {
		label: 'Why TechHive',
		title: 'Numbers that reflect 20 years of delivery',
		items: [
			{
				value: '20',
				suffix: '+',
				label: 'Years of experience',
				detail:
					'Two decades building enterprise software in Pakistan and the US',
			},
			{
				value: '50',
				suffix: '+',
				label: 'Projects delivered',
				detail: 'Across AI, ERP, web and mobile platforms',
			},
			{
				value: '2',
				label: 'In-house products',
				detail:
					'TutorBees and Talent, real products built and maintained by our team',
			},
			{
				value: '100',
				suffix: '%',
				label: 'Odoo certified',
				detail: 'Odoo Partner with full-stack implementation capability',
			},
		] satisfies Array<Stat>,
	},
	caseStudies: {
		label: 'Case studies',
		title: "Work we're proud of",
	},
	cta: {
		title: 'Ready to build something great?',
		body: "Tell us what you need. We'll tell you exactly how we'd approach it.",
		primaryCta: {
			label: 'Start the conversation',
			href: '/contact',
		} satisfies CallToAction,
		secondaryCta: {
			label: 'Explore services',
			href: '/services',
		} satisfies CallToAction,
	},
}
