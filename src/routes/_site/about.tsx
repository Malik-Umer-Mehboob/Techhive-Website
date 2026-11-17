import { createFileRoute } from '@tanstack/react-router'

import { AboutStory } from '#/components/about/about-story'
import { IndustriesSection } from '#/components/about/industries-section'
import { OdooSection } from '#/components/about/odoo-section'
import { ProcessSection } from '#/components/about/process-section'
import { CtaBanner } from '#/components/home/cta-banner'
import { PartnerCallout } from '#/components/home/partner-callout'
import { PageHero } from '#/components/site/page-hero'
import { about } from '#/content'
import { seo } from '#/lib/seo'

/**
 * About page, the TechHive story, the Odoo Partner credential, the
 * Claude Partner Network callout (reused from Home), the industries served and
 * the "how we work" process steps. All copy is single-sourced from the typed
 * `about` content module; this route is purely composition.
 *
 * The Odoo and industries sections carry `id="partners"` / `id="industries"`,
 * the real scroll targets for the footer's `/about#partners` and
 * `/about#industries` deep links (#10).
 */
export const Route = createFileRoute('/_site/about')({
	head: () =>
		seo({
			title: 'About - TechHive Solutions',
			description:
				'TechHive Solutions, 20+ years of enterprise software delivery. Certified Odoo Partner and registered Claude Partner Network member based in Lahore.',
			url: '/about',
			breadcrumb: 'About',
		}),
	component: AboutPage,
})

function AboutPage() {
	return (
		<>
			<PageHero eyebrow={about.hero.label} title={about.hero.title}>
				{about.hero.body}
			</PageHero>

			<AboutStory />
			<PartnerCallout />
			<OdooSection />
			<IndustriesSection />
			<ProcessSection />
			<CtaBanner />
		</>
	)
}
