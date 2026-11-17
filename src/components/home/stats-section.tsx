import { Container } from '#/components/ui/container'
import { Section, SectionEyebrow, SectionTitle } from '#/components/ui/section'
import { home } from '#/content'

const { stats } = home

/** Headline stats, "Why TechHive" numbers. */
export function StatsSection() {
	return (
		<Section>
			<div className="mx-auto mb-14 max-w-140 text-center">
				<SectionEyebrow centered>{stats.label}</SectionEyebrow>
				<SectionTitle>{stats.title}</SectionTitle>
			</div>
			<Container>
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
					{stats.items.map((stat) => (
						<div
							key={stat.label}
							className="rounded-brand-lg border border-hairline bg-off-white px-6 py-8 text-center transition-[background,box-shadow] duration-200 hover:bg-white hover:shadow-brand-md"
						>
							<div className="mb-[0.4rem] font-display text-[2.5rem] leading-none font-extrabold text-orange">
								{stat.value}
								{stat.suffix ? (
									<span className="text-[1.4rem]">{stat.suffix}</span>
								) : null}
							</div>
							<div className="mb-[0.35rem] text-[0.9rem] font-semibold text-navy">
								{stat.label}
							</div>
							{stat.detail ? (
								<div className="text-[0.8rem] leading-normal text-ink-muted">
									{stat.detail}
								</div>
							) : null}
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}
