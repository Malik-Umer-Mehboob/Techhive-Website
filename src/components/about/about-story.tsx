import { Check } from 'lucide-react'

import { Container } from '#/components/ui/container'
import {
	Section,
	SectionEyebrow,
	SectionLead,
	SectionTitle,
} from '#/components/ui/section'
import { about } from '#/content'

const { story } = about

/**
 * The "Who we are" story, narrative paragraphs and value bullets beside the
 * stat visual that opens the About page.
 */
export function AboutStory() {
	return (
		<Section>
			<Container>
				<div className="grid items-center gap-20 lg:grid-cols-2">
					<div>
						<SectionEyebrow>{story.label}</SectionEyebrow>
						<SectionTitle>{story.title}</SectionTitle>
						{story.body.map((paragraph) => (
							<SectionLead key={paragraph}>{paragraph}</SectionLead>
						))}
						<div className="mt-8 flex flex-col gap-4">
							{story.values.map((value) => (
								<div key={value} className="flex items-start gap-3">
									<div className="mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full bg-orange-pale">
										<Check className="size-3 text-orange stroke-[2.5]" />
									</div>
									<span
										data-slot="value-text"
										className="text-[0.9rem] leading-[1.6] text-ink-muted"
									>
										{value}
									</span>
								</div>
							))}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 rounded-brand-xl bg-off-white p-12">
						{story.stats.map((stat) => (
							<div
								key={stat.label}
								data-slot="about-stat"
								className={
									stat.accent
										? 'rounded-brand-md border border-navy bg-navy p-6'
										: 'rounded-brand-md border border-hairline bg-white p-6'
								}
							>
								<div className="font-display text-[2rem] leading-none font-extrabold text-orange">
									{stat.value}
								</div>
								<div
									className={
										stat.accent
											? 'mt-[0.35rem] text-[0.82rem] text-white'
											: 'mt-[0.35rem] text-[0.82rem] text-navy'
									}
								>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
