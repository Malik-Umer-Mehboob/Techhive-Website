import * as React from 'react'

import { cn } from '#/lib/utils.ts'

/**
 * A full-bleed page section with the brand's vertical rhythm
 * (`clamp(4rem, 8vw, 7rem)` block padding). Replaces the legacy `.section`
 * class. `tone="wash"` paints the off-white band used by alternating sections.
 * A `scroll-mt` offset is always applied so an `id` anchor target clears the
 * fixed 68px header (the old `.anchor-offset`); harmless when not a target.
 */
function Section({
	className,
	tone = 'default',
	...props
}: React.ComponentProps<'section'> & { tone?: 'default' | 'wash' }) {
	return (
		<section
			data-slot="section"
			className={cn(
				'scroll-mt-[calc(var(--header-h)+1.5rem)] py-[clamp(4rem,8vw,7rem)]',
				tone === 'wash' && 'bg-off-white',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * The small uppercase orange kicker above a section title (legacy
 * `.section-label`), with its 20x2px leading bar. `centered` centers it for
 * centered section headers.
 */
function SectionEyebrow({
	className,
	centered = false,
	...props
}: React.ComponentProps<'p'> & { centered?: boolean }) {
	return (
		<p
			data-slot="section-eyebrow"
			className={cn(
				"mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-orange uppercase before:block before:h-0.5 before:w-5 before:rounded-[1px] before:bg-orange before:content-['']",
				centered && 'justify-center',
				className,
			)}
			{...props}
		/>
	)
}

/** The section heading (legacy `.section-title`). Renders an `<h2>`. */
function SectionTitle({ className, ...props }: React.ComponentProps<'h2'>) {
	return (
		<h2
			data-slot="section-title"
			className={cn(
				'font-display text-[clamp(1.9rem,3.5vw,2.75rem)] leading-[1.2] font-bold tracking-[-0.02em] text-navy',
				className,
			)}
			{...props}
		/>
	)
}

/** Supporting paragraph under a section title (legacy `.section-body`). */
function SectionLead({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			data-slot="section-lead"
			className={cn(
				'mt-4 max-w-[54ch] text-[1.05rem] leading-[1.75] text-ink-muted',
				className,
			)}
			{...props}
		/>
	)
}

export { Section, SectionEyebrow, SectionLead, SectionTitle }
