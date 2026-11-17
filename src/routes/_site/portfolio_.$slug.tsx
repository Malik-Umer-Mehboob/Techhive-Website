import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { CtaBanner } from '#/components/home/cta-banner'
import { CaseStudyStory } from '#/components/portfolio/case-study-story'
import { PageHero } from '#/components/site/page-hero'
import { Container } from '#/components/ui/container'
import { Section } from '#/components/ui/section'
import { TagBadge } from '#/components/portfolio/tag-badge'
import { findCaseStudy, hasDetailPage } from '#/content'
import { seo } from '#/lib/seo'

/**
 * Case study detail page, `/portfolio/<slug>`: the full story of a long-form
 * Case Study (one with titled sections), derived from `CASE_STUDIES` by slug
 * (docs/adr/0001). /portfolio shows only its excerpt. Unknown slugs, and
 * Case Studies without sections, are a 404. See CONTEXT.md.
 */
export const Route = createFileRoute('/_site/portfolio_/$slug')({
	loader: ({ params }) => {
		const study = findCaseStudy(params.slug)
		if (!study || !hasDetailPage(study)) throw notFound()
		return study
	},
	head: ({ loaderData }) =>
		loaderData
			? seo({
					title: `${loaderData.title} - TechHive Solutions`,
					description: loaderData.detail.excerpt ?? loaderData.summary,
					url: `/portfolio/${loaderData.slug}`,
					image: '/og/portfolio.png',
					breadcrumb: loaderData.title,
					breadcrumbParents: [{ name: 'Portfolio', url: '/portfolio' }],
				})
			: {},
	component: CaseStudyPage,
	notFoundComponent: CaseStudyNotFound,
})

function BackLink() {
	return (
		<Link
			to="/portfolio"
			className="mb-8 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-orange hover:underline"
		>
			<ArrowLeft className="size-4" /> All case studies
		</Link>
	)
}

function CaseStudyPage() {
	const study = Route.useLoaderData()

	return (
		<>
			<PageHero eyebrow="Case study" title={study.title}>
				{study.summary}
			</PageHero>
			<Section>
				<Container>
					<BackLink />
					<div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-[1.6fr_1fr] min-[900px]:gap-16">
						<div>
							<div className="mb-6 flex flex-wrap gap-2">
								{study.tags.map((tag) => (
									<TagBadge key={tag} tag={tag} />
								))}
							</div>
							<CaseStudyStory study={study} />
						</div>
						<div className="flex items-center justify-center self-start rounded-brand-xl border border-hairline bg-off-white p-12 min-[900px]:sticky min-[900px]:top-28">
							<img
								src={study.image}
								alt={study.title}
								className="max-h-37.5 w-auto max-w-64 object-contain"
							/>
						</div>
					</div>
				</Container>
			</Section>
			<CtaBanner />
		</>
	)
}

function CaseStudyNotFound() {
	return (
		<Section>
			<Container>
				<BackLink />
				<h1 className="mb-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-navy">
					Case study not found
				</h1>
				<p className="text-[0.95rem] text-ink-muted">
					We couldn't find that case study. See all our work on the portfolio
					page.
				</p>
			</Container>
		</Section>
	)
}
