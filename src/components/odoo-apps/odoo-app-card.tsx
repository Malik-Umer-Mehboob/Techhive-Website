import { ArrowUpRight, Check } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import type { OdooApp } from '#/content'

/**
 * One Odoo App on the `/odoo-apps` page. An Odoo App is owned software sold on
 * the Odoo App Store (see CONTEXT.md), so the primary CTA is an *external*
 * hand-off to the store listing (`storeUrl`) rather than an in-app `<Link>`,
 * that store page is the canonical product and checkout surface.
 *
 * Carries `data-slot="odoo-app-card"` for the unit test and `id={app.slug}` so
 * a Service's `odooApp` cross-link (`/odoo-apps#<slug>`) lands on this card. The spec strip mirrors
 * the store's listing table (price, versions, category, licence, dependencies,
 * deployment) plus the Enterprise-requirement buyer gate, surfaced up front so
 * a prospect doesn't click through only to discover the prerequisite.
 */
export function OdooAppCard({ app }: { app: OdooApp }) {
	const Icon = app.icon

	const specs: Array<{ label: string; value: string }> = [
		{ label: 'Price', value: app.price },
		{ label: 'Odoo', value: app.odooVersions.join(', ') },
		{ label: 'Category', value: app.category },
		{ label: 'Licence', value: app.license },
		{ label: 'Dependencies', value: app.dependencies.join(', ') },
		{ label: 'Deployment', value: app.deployment.join(', ') },
	]

	return (
		<Card
			data-slot="odoo-app-card"
			id={app.slug}
			className="flex scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col gap-6 p-8 md:p-10"
		>
			<div className="flex items-start gap-4">
				<div className="flex size-13 shrink-0 items-center justify-center rounded-brand-md bg-orange-pale">
					<Icon className="size-6 text-orange [stroke-width:1.75]" />
				</div>
				<div className="min-w-0">
					<h2 className="font-display text-[1.35rem] font-bold text-navy">
						{app.name}
					</h2>
					<code className="text-[0.8rem] text-faint">{app.technicalName}</code>
				</div>
				<span className="ml-auto shrink-0 font-display text-[1.35rem] font-bold text-navy">
					{app.price}
				</span>
			</div>

			<p className="text-[0.95rem] leading-[1.75] text-ink-muted">
				{app.description}
			</p>

			<div className="flex flex-col gap-2.5">
				{app.features.map((feature) => (
					<div
						key={feature}
						data-slot="odoo-app-feature"
						className="flex items-start gap-2.5 text-[0.9rem] text-navy"
					>
						<Check size={17} className="mt-0.5 shrink-0 text-orange" />
						{feature}
					</div>
				))}
			</div>

			<dl className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-brand-md border border-hairline bg-off-white p-6 sm:grid-cols-2">
				{specs.map((spec) => (
					<div
						key={spec.label}
						className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
					>
						<dt className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-faint">
							{spec.label}
						</dt>
						<dd className="text-right text-[0.85rem] font-medium text-navy">
							{spec.value}
						</dd>
					</div>
				))}
			</dl>

			<div className="flex flex-wrap items-center gap-4">
				<Button asChild variant="brand" size="brand">
					<a href={app.storeUrl} target="_blank" rel="noopener noreferrer">
						View on Odoo Apps <ArrowUpRight className="size-4" />
					</a>
				</Button>
				{app.requirement ? (
					<Badge variant="tag" className="normal-case tracking-normal">
						{app.requirement}
					</Badge>
				) : null}
			</div>
		</Card>
	)
}
