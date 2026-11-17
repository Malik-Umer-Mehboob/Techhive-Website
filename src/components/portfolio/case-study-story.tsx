import { Check } from 'lucide-react'

import type { CaseStudy } from '#/content'

/**
 * A Case Study's full story: the intro, titled sections, outcome bullets and
 * "The result". Shared by the inline /portfolio sections and the
 * /portfolio/<slug> detail page so the two never render it differently.
 */
export function CaseStudyStory({ study }: { study: CaseStudy }) {
	return (
		<>
			<p className="mb-6 text-[0.95rem] leading-[1.75] text-ink-muted">
				{study.detail.body}
			</p>
			{study.detail.sections?.map((section) => (
				<div key={section.heading} className="mb-5">
					<h3 className="mb-2 font-display text-[1.05rem] font-semibold text-navy">
						{section.heading}
					</h3>
					<p className="text-[0.95rem] leading-[1.75] text-ink-muted">
						{section.body}
					</p>
				</div>
			))}
			{study.detail.outcomes?.length ? (
				<div className="mb-8 flex flex-col gap-[0.6rem]">
					{study.detail.outcomes.map((outcome) => (
						<div
							key={outcome}
							className="flex items-start gap-3 text-[0.88rem] text-ink-muted"
						>
							<span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-orange-pale">
								<Check className="size-2.5 stroke-3 text-orange" />
							</span>
							{outcome}
						</div>
					))}
				</div>
			) : null}
			{study.detail.result ? (
				<div className="mb-8 rounded-brand-xl border border-hairline bg-off-white p-5">
					<h3 className="mb-2 font-display text-[1.05rem] font-semibold text-navy">
						The result
					</h3>
					<p className="text-[0.95rem] leading-[1.75] text-ink-muted">
						{study.detail.result}
					</p>
				</div>
			) : null}
		</>
	)
}
