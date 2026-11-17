import { Container } from '#/components/ui/container'
import { Section, SectionEyebrow, SectionTitle } from '#/components/ui/section'
import { about } from '#/content'

const { process } = about

/**
 * The "how we work" process steps, rendered in canonical order (Discovery →
 * Proposal → Build → Launch & Support). The step number comes from the array
 * index, so numbering can never desync from sequence.
 */
export function ProcessSection() {
	return (
		<Section tone="wash">
			<Container>
				<div className="mx-auto max-w-135 text-center">
					<SectionEyebrow centered>{process.label}</SectionEyebrow>
					<SectionTitle>{process.title}</SectionTitle>
				</div>
				<div className="relative mt-12 grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
					<div
						aria-hidden
						className="pointer-events-none absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] hidden h-0.5 lg:block [background:linear-gradient(90deg,var(--orange)_0%,var(--orange-pale)_100%)]"
					/>
					{process.steps.map((step, index) => (
						<div
							key={step.name}
							className="relative z-1 flex flex-col items-center px-4 text-center"
						>
							<div
								data-slot="step-circle"
								className={
									index === 0
										? 'mb-5 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-orange bg-orange font-display text-base font-bold text-white'
										: 'mb-5 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-hairline bg-white font-display text-base font-bold text-ink-muted'
								}
							>
								{index + 1}
							</div>
							<div
								data-slot="step-name"
								className="mb-[0.4rem] text-[0.9rem] font-semibold text-navy"
							>
								{step.name}
							</div>
							<div className="text-[0.8rem] leading-[1.6] text-ink-muted">
								{step.description}
							</div>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}
