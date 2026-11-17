import type { LucideIcon } from 'lucide-react'
import type { Tag } from './tags'

/**
 * Domain vocabulary, see CONTEXT.md for the authoritative definitions.
 *
 * These types model the editorial content of the marketing site. Content lives
 * in typed TS modules (no CMS); edits ship via deploy.
 */

/**
 * The Services-page section content for a Service. Co-located on {@link Service}
 * (rather than a separate slug-keyed module) so the canonical list can never
 * desync from its page sections, see docs/adr/0001.
 */
export interface ServiceDetail {
	/** Marketing headline for the section, distinct from `name`. */
	headline: string
	/** The section body, one paragraph. */
	body: string
	/** Optional labelled bullet list, e.g. { label: 'Modules we implement', items: [...] }. */
	highlights?: { label: string; items: Array<string> }
	/** Optional {@link OdooApp} slug shown as shipped proof of this Service, e.g.
	 * AI Integration -> `mcp-server-for-ai-agents`. A slug reference (not a
	 * freeform link) so the name and anchor derive from `ODOO_APPS`, see
	 * docs/adr/0001. */
	odooApp?: OdooApp['slug']
}

/**
 * A Service is one of the agency's offerings. The canonical `Service[]` in
 * `services.ts` is the single source of truth, the Home grid, the Services
 * page, the footer and the contact dropdown all derive from it.
 */
export interface Service {
	/** Stable slug used for the Services-page anchor, e.g. `/services#ai-integration`. */
	slug: string
	name: string
	/** One-line description shown on a Service card. */
	summary: string
	icon: LucideIcon
	/** Long-form content for this Service's section on the Services page. Required:
	 * the type enforces that every Service can render its own section. */
	detail: ServiceDetail
}

/**
 * A Product is in-house software TechHive owns and operates (not client work),
 * e.g. TutorBees and Talent. A Product may also appear as a Case Study.
 */
export interface Product {
	slug: string
	name: string
	summary: string
	url?: string
}

/**
 * An Odoo App is owned software TechHive publishes and *sells on the Odoo App
 * Store* (apps.odoo.com), distinct from a {@link Product} (owned software we
 * *operate*, e.g. TutorBees) and from the Odoo ERP {@link Service} (client
 * implementation work). Shown on the `/odoo-apps` page; the card's CTA hands
 * off to the store listing (`storeUrl`), which is the canonical product and
 * checkout page. See CONTEXT.md.
 */
export interface OdooApp {
	/** Stable slug, e.g. `documents-folder-upload`. */
	slug: string
	/** Store display name, e.g. `Documents Folder Upload`. */
	name: string
	/** Odoo technical module name, e.g. `documents_upload_folder`. */
	technicalName: string
	/** One-line card summary. */
	tagline: string
	/** Body paragraph describing what the module does. */
	description: string
	/** Feature bullets shown on the card. */
	features: Array<string>
	/** Display price, e.g. `$35`. A string so a future free module reads `Free`. */
	price: string
	/** Odoo versions the module supports, e.g. `['19.0', '18.0']`. */
	odooVersions: Array<string>
	/** Odoo App Store category, e.g. `Document Management`. */
	category: string
	/** Licence identifier, e.g. `OPL-1`. */
	license: string
	/** Optional buyer gate surfaced on the card, e.g. `Requires Odoo Enterprise`
	 * or `Odoo.sh or self-hosted only`. */
	requirement?: string
	/** Odoo module dependencies, e.g. `['Documents', 'Discuss']`. */
	dependencies: Array<string>
	/** Supported deployments, e.g. `['Odoo Online', 'Odoo.sh', 'On-Premise']`. */
	deployment: Array<string>
	/** The apps.odoo.com listing URL, the external CTA target. */
	storeUrl: string
	/** Card glyph (matches the {@link Service} icon convention). */
	icon: LucideIcon
	/** Optional screenshot path under /public, e.g. `/documents-folder-upload.webp`. */
	image?: string
}

/**
 * The Portfolio-page section content for a Case Study. Co-located on
 * {@link CaseStudy} for the same no-drift reason as {@link ServiceDetail},
 * see docs/adr/0001.
 */
export interface CaseStudyDetail {
	/** Richer narrative than `summary`, the section's intro on Portfolio. */
	body: string
	/**
	 * Hand-written excerpt for Case Studies with a detail page: shown on the
	 * /portfolio card and used as the detail page's meta description. Names
	 * the client in full and the Odoo work; under 160 characters.
	 */
	excerpt?: string
	/** Titled sections of the story after the intro, e.g. "Seed-to-sale traceability". */
	sections?: Array<CaseStudyDetailSection>
	/** Outcome / result points shown as a bullet list. */
	outcomes?: Array<string>
	/** Closing "The result" paragraph. */
	result?: string
}

/** One titled section of a Case Study's story on the Portfolio page. */
export interface CaseStudyDetailSection {
	heading: string
	body: string
}

/**
 * A Case Study is a delivered client project featured on the Portfolio page
 * (e.g. MHPSS Pakistan, Hameed Automation). The set is fixed editorial content.
 */
export interface CaseStudy {
	slug: string
	title: string
	summary: string
	/** Each tag must be listed in `TAG_KINDS` (content/tags.ts). */
	tags: Array<Tag>
	/** Slugs of the Service(s) the work demonstrates. */
	services: Array<string>
	liveUrl?: string
	/** Path under /public for the media-column image, e.g. `/mhpss.webp`. */
	image: string
	/** Long-form content for this Case Study's section on the Portfolio page. */
	detail: CaseStudyDetail
}

/**
 * A Client is an organization TechHive has delivered for, shown in the
 * credibility strip ("More clients we've delivered for") on the Portfolio page.
 * Lighter than a Case Study, name + logo, no narrative, outcomes or live link.
 * See CONTEXT.md.
 */
export interface Client {
	name: string
	/** Path under /public for the client logo, e.g. `/who.webp`. */
	logo: string
	/** Optional one-line descriptor of the work, e.g. 'Property portal & CRM'. */
	blurb?: string
}

/** A headline metric shown in the hero trust row and the "Why TechHive" grid. */
export interface Stat {
	value: string
	suffix?: string
	label: string
	detail?: string
}

/** A small offering card rendered in the hero visual. */
export interface HeroCard {
	name: string
	description: string
	icon: LucideIcon
	/** When true, the card spans both columns of the hero card grid. */
	wide?: boolean
}

export interface CallToAction {
	label: string
	href: string
}

/**
 * One step in the "how we work" process shown on the About page. The canonical
 * order (Discovery → Proposal → Build → Launch & Support) is the array order in
 * `about.ts`, the step number is derived from the index, never stored, so the
 * sequence can never desync from its numbering.
 */
export interface ProcessStep {
	name: string
	description: string
}

/**
 * An Industry TechHive serves, shown as a card in the About page's industries
 * grid. "Industries" is the canonical word (not "Sectors"), see CONTEXT.md.
 */
export interface Industry {
	name: string
	icon: LucideIcon
}

/** A frequently-asked question shown on the Contact page, above the form's fold. */
export interface Faq {
	question: string
	answer: string
}
