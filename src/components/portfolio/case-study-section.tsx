import { Link } from '@tanstack/react-router'
import { ArrowRight, ExternalLink } from 'lucide-react'

import { CaseStudyStory } from '#/components/portfolio/case-study-story'
import { Button } from '#/components/ui/button'
import { Container } from '#/components/ui/container'
import { Section } from '#/components/ui/section'
import { TagBadge } from '#/components/portfolio/tag-badge'
import type { CaseStudy } from '#/content'
import { caseStudyDetailLink, hasDetailPage } from '#/content'

/** Strip the protocol from a URL for a cleaner "Visit …" label. */
function displayHost(url: string): string {
	return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * One Case Study section on the Portfolio page, the reference design's
 * alternating media/text treatment. Even-indexed studies put text first;
 * odd-indexed ones flip (media first) and sit on an off-white band.
 *
 * Long-form Case Studies (with titled sections, see `hasDetailPage`) show an
 * excerpt and a "Read the case study" button to `/portfolio/<slug>`; the rest
 * render their full story here.
 *
 * The section carries `id={slug}` (the <Section> bakes in the scroll offset)
 * so `/portfolio#<slug>` deep links (see docs/adr/0002) land below the fixed
 * header.
 */
export function CaseStudySection({
	study,
	index,
}: {
	study: CaseStudy
	index: number
}) {
	const flipped = index % 2 === 1
	const excerptOnly = hasDetailPage(study)

	return (
		<Section
			data-slot="case-study-section"
			id={study.slug}
			tone={flipped ? 'wash' : undefined}
			className="border-b border-hairline"
		>
			<Container>
				<div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[1.3fr_1fr] min-[900px]:gap-20">
					<div>
						<div className="mb-5 flex flex-wrap gap-2">
							{study.tags.map((tag) => (
								<TagBadge key={tag} tag={tag} />
							))}
						</div>
						<h2 className="mb-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] text-navy">
							{study.title}
						</h2>
						{excerptOnly ? (
							<>
								<p className="mb-8 text-[0.95rem] leading-[1.75] text-ink-muted">
									{study.detail.excerpt}
								</p>
								<Button asChild variant="brand" size="brand">
									<Link {...caseStudyDetailLink(study)}>
										Read the case study <ArrowRight className="size-4" />
									</Link>
								</Button>
							</>
						) : (
							<CaseStudyStory study={study} />
						)}
						{study.liveUrl ? (
							<div className="flex flex-wrap gap-4">
								<Button asChild variant="brandOutline" size="brand">
									<a
										href={study.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										Visit {displayHost(study.liveUrl)}{' '}
										<ExternalLink className="size-4" />
									</a>
								</Button>
							</div>
						) : null}
					</div>
					<div
						className={`flex items-center justify-center rounded-brand-xl border border-hairline bg-off-white p-12${
							flipped ? ' min-[900px]:order-first' : ''
						}`}
					>
						<img
							src={study.image}
							alt={study.title}
							className="max-h-37.5 w-auto max-w-64 object-contain"
						/>
					</div>
				</div>
			</Container>
		</Section>
	)
}
