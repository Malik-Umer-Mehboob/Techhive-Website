import { linkOptions } from '@tanstack/react-router'

import type { CaseStudy } from './types.ts'

/**
 * Canonical Case Studies - delivered client projects shown as proof of work.
 * Single-sourced here so the Home preview and the Portfolio page stay in sync;
 * the Portfolio page (separate issue) extends and details these. Each Case
 * Study references the Service slug(s) it demonstrates.
 */
export const CASE_STUDIES: Array<CaseStudy> = [
	{
		slug: 'mhpss',
		title: 'MHPSS Pakistan - Mental Health Support Platform',
		summary:
			"A digital helpline and case management system for the Ministry of Planning's Mental Health & Psychosocial Support initiative, delivered in partnership with UNICEF.",
		tags: ['Digital Health', 'Government', 'UNICEF'],
		services: ['web-portals'],
		liveUrl: 'https://mhpss.pk',
		image: '/mhpss.webp',
		detail: {
			body: 'The Ministry of Planning, Development & Special Initiatives needed a digital platform to deliver Mental Health & Psychosocial Support services across Pakistan, in partnership with UNICEF. TechHive designed and built the entire system: a multi-role case management portal connecting counsellors, supervisors and administrators.',
			outcomes: [
				'Secure case management across multiple government agencies',
				'Real-time reporting dashboards for UNICEF programme oversight',
				'Deployed and maintained in a live government environment',
			],
		},
	},
	{
		slug: 'tutorbees',
		title: "TutorBees - Pakistan's Online Tutoring Platform",
		summary:
			'Built from the ground up by TechHive, an AI-powered virtual classroom and tutoring marketplace serving thousands of students across Pakistan.',
		tags: ['eLearning', 'SaaS Product', 'Our own'],
		services: ['elearning-lms'],
		liveUrl: 'https://tutorbees.net',
		image: '/tutor-bees.svg',
		detail: {
			body: "TutorBees isn't a client project, it's ours. We identified the gap in Pakistan's online education market and built TutorBees from scratch: a full-stack eLearning platform with built-in virtual classrooms, AI-driven personalized learning paths, and a two-sided tutor marketplace.",
			outcomes: [
				'23,000+ active students, 73,000+ classes conducted',
				'AI-driven learning paths that adapt to individual student progress',
				'Integrated payment processing, scheduling and session recording',
			],
		},
	},
	{
		slug: 'yuksel-seeds',
		title: 'Yuksel Seeds Asia - Multi-Company ERP',
		summary:
			'An Oracle-to-Odoo move for a nationwide hybrid seed business, with seed-to-sale traceability, automated courier updates, dealer discount batches and controlled approvals.',
		tags: ['Odoo ERP', 'Agriculture', 'Multi-Company'],
		services: ['odoo-erp'],
		image: '/yuksel-seeds.webp',
		detail: {
			excerpt:
				'We moved Yuksel Seeds Asia from Oracle to Odoo, adding seed-to-sale traceability, automated courier updates, dealer discount batches and controlled approvals.',
			body: 'Yuksel Seeds Asia (YS) produces and sells hybrid seeds through a nationwide dealer network. The business was running on Oracle, but its day-to-day processes had outgrown what the existing setup supported, so many tasks relied on workarounds and manual follow-ups. We moved YS to Odoo and shaped the system around how their teams actually work, with the right controls built in.',
			sections: [
				{
					heading: 'Seed-to-sale traceability',
					body: 'We built a custom seed production module that follows every variety through each season. Plantings are recorded by farm location, greenhouse, and tunnel, with sowing and harvest dates. Raw bag weights, cleaning wastage, and germination test results are logged against each batch. At packing, every packet series gets a serial range, and each sale, trial, or free dispatch is linked back to those serials. YS can now trace any packet in the market back to the field it came from.',
				},
				{
					heading: 'Automated delivery tracking and customer updates',
					body: 'We integrated TCS courier tracking directly into Odoo. Customers are notified automatically at key stages, from invoicing through delivery to payment. The team no longer chases shipment updates by phone, and customers always know where their order stands.',
				},
				{
					heading: 'Dealer discount batches',
					body: "Seed sales run on dealer discount schemes, and calculating additional discounts across customers and products used to be a slow, manual process. We created Discount Batches, which gather each customer's sales by product, MRP, and existing discount in one view. The team applies additional discounts where needed, and on confirmation a linked journal entry is created automatically in accounting.",
				},
				{
					heading: 'Approval workflows with clear accountability',
					body: "We designed a custom approval process that separates clerks from admins. Clerks can create and edit records only until they submit them for approval. Once submitted, a record is locked until the approver reopens it. No clerk can edit another clerk's records at any stage. Every record now has a clear owner and a controlled path to approval.",
				},
				{
					heading: 'Biometric attendance connected to payroll',
					body: "We integrated biometric attendance machines at YS's farm sites directly with Odoo. Attendance flows automatically into payroll, so a large seasonal workforce is processed accurately without manual timesheets.",
				},
				{
					heading: 'Reporting on demand',
					body: 'We built custom Sales, Purchase, Inventory, and Accounting reports with a date range selector. Management can pull the exact period they need, whenever they need it, without compiling data by hand.',
				},
				{
					heading: 'Secure document management',
					body: "We extended Odoo's Documents module with custom access rights, controlling who can view files and folders and who can add to them. Sensitive files stay with the right people.",
				},
			],
			outcomes: [
				'13 standard Odoo modules deployed across multiple companies',
				'Custom Pakistan tax calculation engine for local compliance',
				'On-premises server sync for offline availability',
			],
			result:
				'YS moved from Oracle to a system built around its own processes. Every seed packet can be traced from field to customer. Dispatches update customers on their own, approvals follow a clear chain, discounts post straight to the books, attendance feeds payroll directly, and management can report on any period in a few clicks.',
		},
	},
	{
		slug: 'hsi',
		title: 'Healthy Salt International - Manufacturing ERP',
		summary:
			'An Odoo implementation for a salt manufacturer and exporter, replacing manual spreadsheets with one system that shows the true cost behind every sale order.',
		tags: ['Odoo ERP', 'Manufacturing', 'Costing'],
		services: ['odoo-erp'],
		image: '/hsi.webp',
		detail: {
			excerpt:
				'Healthy Salt International replaced manual spreadsheets with Odoo, linking production, sales and labor costs to show the true cost behind every sale order.',
			body: 'HSI manufactures and exports salt products. Like many growing manufacturers, it was running key operations on manual Excel sheets. Production, sales, and labor costs were tracked separately, so it was hard to see what each order actually cost. We implemented Odoo to bring these processes into one structured system that fits the way HSI works.',
			sections: [
				{
					heading: 'Reporting built around the business',
					body: "We designed custom Sales, Inventory, and Manufacturing reports so HSI's team could get the information they needed directly from the system, without compiling spreadsheets by hand.",
				},
				{
					heading: 'True cost visibility for every Sale Order',
					body: "HSI starts manufacturing ahead of demand, so production often begins before a sale is confirmed. Standard workflows couldn't handle this. We built a solution that links existing manufacturing orders to one or more sale orders and distributes production costs based on the quantity sold in each one. For the first time, HSI can see the total cost behind every Sale Order.",
				},
				{
					heading: 'Labor costs tied directly to production',
					body: 'We connected labor wages to manufacturing orders, giving the accounts department a simple, accurate way to track labor expenses without separate records or manual reconciliation.',
				},
			],
			result:
				'HSI moved from disconnected spreadsheets to a single system where production, sales, and costs work together. Its team now spends less time on data entry and makes decisions with clearer insight into profitability.',
		},
	},
	{
		slug: 'next-bridge',
		title: 'Next Bridge Real Estate - Brokerage ERP & CRM',
		summary:
			'An Odoo system for a real estate brokerage that brings leads from every portal and ad channel into one pipeline, syncs listings everywhere and calculates commissions automatically.',
		tags: ['Odoo ERP', 'Real Estate', 'Integrations'],
		services: ['odoo-erp'],
		image: '/next-bridge.webp',
		detail: {
			excerpt:
				'Next Bridge Real Estate runs its brokerage on Odoo, with leads from every portal in one pipeline, listings synced everywhere and automatic commission splits.',
			body: 'NB is a real estate brokerage managing property listings, agents, and a steady flow of leads from multiple online portals. Leads arrived through separate platforms, listings had to be updated portal by portal, and commissions and financial reporting took manual effort to work out. We implemented Odoo as one central system covering the full brokerage cycle, from the first enquiry to the final commission payout.',
			sections: [
				{
					heading: 'Centralized lead capture from every channel',
					body: "We integrated Bayut, Dubizzle, Property Finder, and Meta Ads directly with Odoo. Leads from social media posts on Facebook, Instagram, YouTube, and LinkedIn, as well as enquiries from NB's own website built on Odoo, flow into the same pipeline. Every enquiry now lands in one place, whatever platform it came from, ready to be assigned and followed up. No lead gets lost between inboxes and portal dashboards, and management can see which channels bring in the most business.",
				},
				{
					heading: 'Fair, automatic lead assignment',
					body: 'Incoming leads are assigned to the sales team on a round-robin basis, with rules set by lead source. Each source can be routed to the right group of agents, and leads are shared evenly within that group. Agents get a fair share of opportunities, response times improve, and managers no longer have to distribute leads by hand.',
				},
				{
					heading: 'Listings managed once, published everywhere',
					body: 'Property listings are created and maintained in Odoo and sync automatically to the connected portals. Price changes, updates, and new listings only need to be entered once. Listings stay consistent across every platform, and agents spend less time on repetitive data entry.',
				},
				{
					heading: 'Structured deal closure forms',
					body: 'We built custom deal closure forms for agents to record each completed transaction in a standard format. Every deal captures the information the business needs from the start. This gives finance and management a reliable record to work from and cuts down on back-and-forth.',
				},
				{
					heading: "Commission distribution built around NB's rules",
					body: "Real estate commissions rarely follow a simple formula. We built a commission distribution process that follows NB's own business rules, splitting each deal's commission accurately among the agents involved. Payouts are calculated by the system instead of by hand, which reduces disputes and saves the finance team time.",
				},
				{
					heading: 'Custom financial reporting',
					body: 'We developed financial reports tailored to how NB measures its business. Management gets a clear view of performance without assembling figures from multiple sources.',
				},
			],
			result:
				'NB now runs its brokerage from a single system. Leads from portals, ads, social media, and the website flow into one pipeline and reach the right agent automatically. Listings stay in sync across every portal from one place. Deals, commissions, and financials are recorded and calculated consistently, giving management full visibility from first enquiry to final payout.',
		},
	},
]

/**
 * Router link options for a Case Study's section on the Portfolio page, the
 * `/portfolio#<slug>` deep link, as type-checked `<Link>` props. Spread into a
 * router `<Link>`: `<Link {...caseStudyLink(study)} />`. See docs/adr/0002.
 */
export function caseStudyLink(caseStudy: CaseStudy) {
	return linkOptions({ to: '/portfolio', hash: caseStudy.slug })
}

/**
 * A Case Study with titled `detail.sections` is long-form: /portfolio shows
 * only its excerpt with a "Read the case study" button, and the full story
 * lives on its own page at `/portfolio/<slug>`. Others render in full on
 * /portfolio. See CONTEXT.md ("Case study detail page").
 */
export function hasDetailPage(caseStudy: CaseStudy): boolean {
	return (caseStudy.detail.sections?.length ?? 0) > 0
}

/**
 * Router link options for a Case Study's own page, `/portfolio/<slug>`, as
 * type-checked `<Link>` props: `<Link {...caseStudyDetailLink(study)} />`.
 * Only for Case Studies where `hasDetailPage` is true (docs/adr/0002).
 */
export function caseStudyDetailLink(caseStudy: CaseStudy) {
	return linkOptions({
		to: '/portfolio/$slug',
		params: { slug: caseStudy.slug },
	})
}

/** The Case Studies that get their own `/portfolio/<slug>` page. */
export const DETAIL_PAGE_CASE_STUDIES = CASE_STUDIES.filter(hasDetailPage)

/** Look a Case Study up by slug, e.g. for the `/portfolio/$slug` route. */
export function findCaseStudy(slug: string): CaseStudy | undefined {
	return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug)
}
