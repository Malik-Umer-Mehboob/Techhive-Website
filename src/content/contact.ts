import type { Faq } from './types'

/**
 * Typed content for the Contact page, agency contact details and FAQs. Edit
 * copy here without touching layout. The contact form's service-interest
 * options are NOT defined here: they derive from the canonical `Service[]` via
 * `serviceOptions()` so the dropdown can never drift from the offering list.
 */
export const contact = {
	hero: {
		label: 'Get in touch',
		title: "Let's talk about what you need",
		body: "No sales pitch. Just an honest conversation about your challenge and whether we're the right team to solve it.",
	},
	intro: {
		label: 'Reach us directly',
		title: "We're based in Lahore. We work globally.",
		body: "Whether you're a startup in Karachi, an enterprise in New York, or an NGO in Geneva, we've worked with clients across time zones and we make it seamless.",
	},
	details: {
		phone: {
			label: 'Phone',
			value: '+92 349 418 6663',
			href: 'tel:+923494186663',
		},
		email: {
			label: 'Email',
			value: 'info@techhivesolutions.com',
			href: 'mailto:info@techhivesolutions.com',
		},
		linkedin: {
			label: 'LinkedIn',
			value: 'TechHive Solutions',
			href: 'https://www.linkedin.com/company/techhivesolutions/',
		},
		office: {
			label: 'Office',
			lines: [
				'Office 3, Building 3, Mezzanine Floor',
				'The Enterprise, Multan Road',
				'Lahore, Pakistan',
			],
		},
	},
	partnerNote: {
		title: 'Claude Partner Network Member',
		body: "Ask us how we can add AI capabilities to your project using Anthropic's Claude, intelligent document processing, automation, natural language interfaces and more.",
	},
	form: {
		label: 'Send us a message',
		successTitle: 'Thanks, we got your message.',
		successBody:
			"We'll be in touch within one business day. For anything urgent, email info@techhivesolutions.com.",
		errorBody:
			'Something went wrong sending your message. Please try again, or email info@techhivesolutions.com directly.',
	},
	faqs: {
		label: 'Before you write',
		title: 'Common questions',
		items: [
			{
				question: 'Do you work with international clients?',
				answer:
					"Yes. We've been delivering for US clients for over 20 years. We accommodate US East Coast hours as standard, and West Coast is available. Billing in USD is fine.",
			},
			{
				question: 'How long does a typical project take?',
				answer:
					"Depends entirely on scope. A focused Odoo module or single-feature web app can be live in 6–8 weeks. A full ERP rollout or complex platform typically takes 4–6 months. We'll give you a realistic timeline in the proposal, not an optimistic one.",
			},
			{
				question: 'Do you offer support after the project is live?',
				answer:
					"Yes. We offer ongoing retainer support, feature development, and maintenance. Most clients stay with us for years after the initial project, that's how we prefer to work.",
			},
			{
				question:
					'What does the Claude Partner Network membership mean for my project?',
				answer:
					"It means we can integrate Anthropic's Claude AI models into your application, intelligent document processing, AI-assisted support, natural language reporting, or automation that understands context. Ask us and we'll tell you whether it makes sense for what you're building.",
			},
			{
				question: 'Do you sign NDAs?',
				answer:
					"Yes, before any discovery call if you need it. IP ownership goes to you. We'll sign whatever is required to give you confidence from day one.",
			},
		] satisfies Array<Faq>,
	},
}
