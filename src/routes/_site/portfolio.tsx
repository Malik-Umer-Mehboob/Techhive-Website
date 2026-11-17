import { createFileRoute } from '@tanstack/react-router'

import { CtaBanner } from '#/components/home/cta-banner'
import { CaseStudySection } from '#/components/portfolio/case-study-section'
import { ClientsStrip } from '#/components/portfolio/clients-strip'
import { PageHero } from '#/components/site/page-hero'
import { CASE_STUDIES } from '#/content'
import { seo } from '#/lib/seo'

/**
 * Portfolio page, the Case Studies (MHPSS Pakistan, TutorBees, Yuksel Seeds
 * Asia, Healthy Salt International, Next Bridge Real Estate) rendered from the
 * typed `Content` module in the reference design's alternating media/text
 * layout, followed by the "More clients" credibility strip.
 *
 * Each Case Study renders an `id={slug}` section carrying `.anchor-offset` so
 * the fixed header doesn't overlap the scrolled-to section, the real scroll
 * target for `/portfolio#<slug>` deep links (#10, docs/adr/0002).
 */
export const Route = createFileRoute('/_site/portfolio')({
	head: () =>
		seo({
			title: 'Portfolio - TechHive Solutions',
			description:
				'Case studies from TechHive Solutions: MHPSS Pakistan, TutorBees, Yuksel Seeds Asia, Healthy Salt International and Next Bridge Real Estate, across government, eLearning, agriculture, manufacturing and real estate.',
			url: '/portfolio',
			breadcrumb: 'Portfolio',
		}),
	component: PortfolioPage,
})

function PortfolioPage() {
	return (
		<>
			<PageHero eyebrow="Case studies" title="Real projects. Real results.">
				We've delivered for government ministries, international NGOs,
				manufacturing firms and fast-growing startups. Here's a selection of
				what we've built.
			</PageHero>

			{CASE_STUDIES.map((study, index) => (
				<CaseStudySection key={study.slug} study={study} index={index} />
			))}

			<ClientsStrip />
			<CtaBanner />
		</>
	)
}
