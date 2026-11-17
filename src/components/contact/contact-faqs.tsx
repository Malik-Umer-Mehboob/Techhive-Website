import { Container } from '#/components/ui/container'
import { Section, SectionEyebrow, SectionTitle } from '#/components/ui/section'
import { contact } from '#/content'

const { faqs } = contact

/** The "common questions" list shown below the contact form. */
export function ContactFaqs() {
	return (
		<Section tone="wash">
			<Container>
				<div className="mx-auto max-w-175">
					<SectionEyebrow>{faqs.label}</SectionEyebrow>
					<SectionTitle>{faqs.title}</SectionTitle>
					<div className="mt-12 flex flex-col gap-5">
						{faqs.items.map((faq) => (
							<div
								key={faq.question}
								className="rounded-xl border border-hairline bg-white p-6"
							>
								<div className="mb-2 font-semibold text-navy">
									{faq.question}
								</div>
								<p className="text-sm leading-relaxed text-ink-muted">
									{faq.answer}
								</p>
							</div>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
