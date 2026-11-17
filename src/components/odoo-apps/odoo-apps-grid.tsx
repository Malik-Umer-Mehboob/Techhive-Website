import { Container } from '#/components/ui/container'
import { Section } from '#/components/ui/section'
import { ODOO_APPS } from '#/content'
import { OdooAppCard } from './odoo-app-card'

/**
 * The Odoo Apps listing, one {@link OdooAppCard} per app in the canonical
 * `ODOO_APPS` array. The layout is list-shaped from day one (a single-column
 * stack that reads well with one app and scales as the catalogue grows); no
 * parallel list, so the page can never desync from the content module.
 */
export function OdooAppsGrid() {
	return (
		<Section>
			<Container>
				<div className="mx-auto flex max-w-3xl flex-col gap-8">
					{ODOO_APPS.map((app) => (
						<OdooAppCard key={app.slug} app={app} />
					))}
				</div>
			</Container>
		</Section>
	)
}
