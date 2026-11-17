import { Card } from '#/components/ui/card'
import { Container } from '#/components/ui/container'
import { Section, SectionEyebrow, SectionTitle } from '#/components/ui/section'
import { CLIENTS } from '#/content'

/**
 * "More clients we've delivered for", the credibility strip below the Case
 * Studies. Lighter than a Case Study (name + logo + optional blurb), and a
 * distinct set of delivered-for orgs rather than a superset. See CONTEXT.md.
 */
export function ClientsStrip() {
	return (
		<Section>
			<Container>
				<div className="mb-4 text-center">
					<SectionEyebrow centered>Also in our portfolio</SectionEyebrow>
					<SectionTitle>More clients we've delivered for</SectionTitle>
				</div>
				<div className="mt-12 flex flex-wrap justify-center gap-6">
					{CLIENTS.map((client) => (
						<Card
							key={client.name}
							className="w-[calc(50%-0.75rem)] p-[2rem_1.5rem] text-center transition-shadow hover:shadow-brand-md lg:w-[calc(25%-1.125rem)]"
						>
							<img
								src={client.logo}
								alt={client.name}
								className="mx-auto mb-4 h-12 w-auto object-contain grayscale-[0.2]"
							/>
							<div className="mb-1 text-[0.88rem] font-semibold text-navy">
								{client.name}
							</div>
							{client.blurb ? (
								<div className="text-[0.78rem] leading-normal text-ink-muted">
									{client.blurb}
								</div>
							) : null}
						</Card>
					))}
				</div>
			</Container>
		</Section>
	)
}
