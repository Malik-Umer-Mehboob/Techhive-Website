import { Container } from '#/components/ui/container'
import { Section, SectionEyebrow, SectionTitle } from '#/components/ui/section'
import { about } from '#/content'

const { industries } = about

/**
 * The industries grid, the sectors TechHive serves. Carries the `industries`
 * anchor the footer deep-links to (#10).
 */
export function IndustriesSection() {
	return (
		<Section id="industries">
			<Container>
				<div className="mx-auto mb-14 max-w-135 text-center">
					<SectionEyebrow centered>{industries.label}</SectionEyebrow>
					<SectionTitle>{industries.title}</SectionTitle>
				</div>
				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
					{industries.items.map((industry) => {
						const Icon = industry.icon
						return (
							<div
								key={industry.name}
								className="rounded-brand-md border border-hairline bg-off-white p-6 text-center transition-[background,transform] duration-200 hover:-translate-y-0.75 hover:bg-white"
							>
								<div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-brand-sm bg-orange-pale">
									<Icon className="size-5.5 text-orange stroke-[1.75]" />
								</div>
								<div
									data-slot="industry-name"
									className="text-[0.9rem] font-semibold text-navy"
								>
									{industry.name}
								</div>
							</div>
						)
					})}
				</div>
			</Container>
		</Section>
	)
}
