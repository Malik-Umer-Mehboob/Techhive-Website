import { Link } from '@tanstack/react-router'
import { ArrowRight, ExternalLink } from 'lucide-react'

import { TagBadge } from '#/components/portfolio/tag-badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Container } from '#/components/ui/container'
import { SectionEyebrow, SectionTitle, Section } from '#/components/ui/section'
import { CASE_STUDIES, caseStudyLink, home } from '#/content'

const { caseStudies } = home

/** Case Studies preview, proof of work, linking through to the Portfolio page. */
export function CaseStudiesSection() {
	return (
		<Section tone="wash">
			<Container>
				<div className="mb-12 flex flex-wrap items-end justify-between gap-4">
					<div>
						<SectionEyebrow>{caseStudies.label}</SectionEyebrow>
						<SectionTitle>{caseStudies.title}</SectionTitle>
					</div>
					<Button asChild variant="brandOutline" size="brand">
						<Link to="/portfolio">
							View all <ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{CASE_STUDIES.map((study) => (
						<Card
							key={study.slug}
							className="overflow-hidden transition-[box-shadow,transform] duration-[0.25s] hover:-translate-y-1 hover:shadow-brand-md"
						>
							<div className="flex items-center justify-center border-b border-hairline bg-off-white p-8">
								<img
									src={study.image}
									alt={study.title}
									className="h-12 w-auto object-contain"
								/>
							</div>
							<div className="p-6">
								<div className="mb-3 flex flex-wrap gap-2">
									{study.tags.map((tag) => (
										<TagBadge key={tag} tag={tag} />
									))}
								</div>
								<h3 className="mb-2 font-display text-base font-bold text-navy">
									{study.title}
								</h3>
								<p className="text-[0.85rem] leading-[1.65] text-ink-muted">
									{study.summary}
								</p>
								<div className="mt-5 flex gap-4">
									<Link
										{...caseStudyLink(study)}
										className="flex items-center gap-[5px] text-[0.82rem] font-semibold text-orange transition-[gap] duration-[0.15s] hover:gap-2"
									>
										Case study <ArrowRight size={12} />
									</Link>
									{study.liveUrl ? (
										<a
											href={study.liveUrl}
											className="flex items-center gap-[5px] text-[0.82rem] font-semibold text-orange transition-[gap] duration-[0.15s] hover:gap-2"
											target="_blank"
											rel="noopener noreferrer"
										>
											Visit site <ExternalLink size={12} />
										</a>
									) : null}
								</div>
							</div>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	)
}
