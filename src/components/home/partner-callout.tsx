import { Star } from 'lucide-react'

import { home } from '#/content'

const { partner } = home

/** The Claude Partner Network credibility banner, the AI Integration anchor. */
export function PartnerCallout() {
	return (
		<section className="border-t border-b border-[rgba(255,107,43,0.15)] bg-orange-pale px-(--pad) py-10">
			<div className="mx-auto flex max-w-(--max-w) flex-wrap items-center gap-8">
				<div className="flex size-14 shrink-0 items-center justify-center rounded-brand-md bg-orange">
					<Star size={28} fill="white" strokeWidth={0} />
				</div>
				<div className="min-w-[200px] flex-1">
					<h2 className="mb-[0.3rem] font-display text-[1.05rem] font-bold text-navy">
						{partner.title}
					</h2>
					<p className="text-[0.88rem] leading-[1.6] text-ink-muted">
						{partner.body}
					</p>
				</div>
				<div className="inline-flex shrink-0 items-center gap-2 rounded-brand-md bg-orange px-[1.2rem] py-[0.6rem] text-[0.82rem] font-bold whitespace-nowrap text-white">
					{partner.pill}
				</div>
			</div>
		</section>
	)
}
