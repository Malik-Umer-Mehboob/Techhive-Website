import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Container } from '#/components/ui/container'
import { Section } from '#/components/ui/section'
import { ODOO_APPS } from '#/content'
import type { Service } from '#/content'

/**
 * One Service section on the Services page, the reference design's alternating
 * text/visual treatment. Even-indexed services put text first; odd-indexed ones
 * flip (visual first) and sit on an off-white band, mirroring the Portfolio
 * `CaseStudySection`.
 *
 * The section carries `id={service.slug}` (the <Section> bakes in the scroll
 * offset) so the Home grid's `/services#<slug>` deep links (serviceLink,
 * docs/adr/0002) land below the fixed header. The id is derived from the
 * canonical Service, never a parallel list, so the anchor can't drift from the
 * offering it names.
 *
 * When `detail.odooApp` is set, a "See it shipped" link deep-links to that Odoo
 * App's card on `/odoo-apps`. Name and anchor are looked up from `ODOO_APPS`
 * by slug, so the cross-link can't go stale (see CONTEXT.md).
 */
export function ServiceSection({
	service,
	index,
}: {
	service: Service
	index: number
}) {
	const flipped = index % 2 === 1
	const { detail } = service
	const Icon = service.icon
	const odooApp = detail.odooApp
		? ODOO_APPS.find((app) => app.slug === detail.odooApp)
		: undefined

	return (
		<Section
			data-slot="service-section"
			id={service.slug}
			tone={flipped ? 'wash' : undefined}
			className="border-b border-hairline"
		>
			<Container>
				<div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-2 min-[900px]:gap-20">
					<div>
						<Badge variant="tag" className="gap-[.4rem]">
							<Icon className="size-3.25" />
							{service.name}
						</Badge>
						<h2 className="my-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] text-navy">
							{detail.headline}
						</h2>
						<p className="mb-8 text-[0.95rem] leading-[1.75] text-ink-muted">
							{detail.body}
						</p>
						{odooApp ? (
							<Link
								to="/odoo-apps"
								hash={odooApp.slug}
								data-slot="service-odoo-app"
								className="group mb-6 flex items-center gap-1.5 text-[0.83rem] font-semibold text-orange transition-[gap] duration-200 hover:gap-2.5"
							>
								See it shipped: {odooApp.name} <ArrowUpRight size={14} />
							</Link>
						) : null}
						<Button asChild variant="brand" size="brand" className="mt-2">
							<Link to="/contact">
								Get in touch <ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					{detail.highlights ? (
						<div
							className={`rounded-brand-xl border border-hairline bg-off-white p-10 ${
								flipped ? ' min-[900px]:order-first' : ''
							}`}
						>
							<p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-faint">
								{detail.highlights.label}
							</p>
							<div className="flex flex-col gap-3">
								{detail.highlights.items.map((item) => (
									<div
										key={item}
										data-slot="service-highlight"
										className="flex items-center gap-[0.6rem] rounded-brand-md border border-hairline bg-white px-4 py-3 text-[0.85rem] font-medium text-navy before:size-2 before:shrink-0 before:rounded-full before:bg-orange before:content-['']"
									>
										{item}
									</div>
								))}
							</div>
						</div>
					) : null}
				</div>
			</Container>
		</Section>
	)
}
