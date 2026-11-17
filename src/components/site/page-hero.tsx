import type { ReactNode } from 'react'

import { SectionEyebrow } from '#/components/ui/section'

/**
 * The navy hero band atop the inner marketing pages (Services, Portfolio,
 * About, Contact). Replaces the legacy `.page-hero` block, including the white
 * elliptical sweep masked into its lower edge. The centered orange eyebrow,
 * display title and supporting copy come through as props.
 */
export function PageHero({
	eyebrow,
	title,
	children,
}: {
	eyebrow: string
	title: string
	children: ReactNode
}) {
	return (
		<header className="relative overflow-hidden bg-navy px-(--pad) pt-40 pb-20 text-center after:absolute after:inset-x-0 after:bottom-0 after:h-15 after:bg-white after:content-[''] after:[clip-path:ellipse(60%_100%_at_50%_100%)]">
			<SectionEyebrow centered>{eyebrow}</SectionEyebrow>
			<h1 className="mb-4 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] font-extrabold tracking-tight text-white">
				{title}
			</h1>
			<p className="mx-auto max-w-[52ch] text-[1.1rem] leading-[1.7] text-white/60">
				{children}
			</p>
		</header>
	)
}
