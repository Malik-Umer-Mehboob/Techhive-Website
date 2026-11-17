import { createFileRoute } from '@tanstack/react-router'

import { CtaBanner } from '#/components/home/cta-banner'
import { AppsPartnerBand } from '#/components/odoo-apps/apps-partner-band'
import { OdooAppsGrid } from '#/components/odoo-apps/odoo-apps-grid'
import { PageHero } from '#/components/site/page-hero'
import { ODOO_APPS } from '#/content'
import { seo } from '#/lib/seo'

/**
 * Odoo Apps page, the modules TechHive publishes and sells on the Odoo App
 * Store. Composition only: the app list, the JSON-LD and the copy are all
 * single-sourced from the canonical `ODOO_APPS` array (see CONTEXT.md). Each
 * app hands off to its store listing; we don't duplicate the store's product
 * page here.
 *
 * JSON-LD emits an `ItemList` of `SoftwareApplication` entries (with `offers`),
 * the correct schema for paid software, matching how the Services page emits an
 * `OfferCatalog`.
 */
export const Route = createFileRoute('/_site/odoo-apps')({
	head: () =>
		seo({
			title: 'Odoo Apps - TechHive Solutions',
			description:
				'Odoo modules built and published by TechHive Solutions, a certified Odoo Partner. Available on the Odoo App Store for Odoo 18 and 19.',
			url: '/odoo-apps',
			breadcrumb: 'Odoo Apps',
			jsonLd: [
				{
					'@context': 'https://schema.org',
					'@type': 'ItemList',
					name: 'TechHive Solutions Odoo Apps',
					url: 'https://techhivesolutions.com/odoo-apps',
					itemListElement: ODOO_APPS.map((app, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'SoftwareApplication',
							name: app.name,
							description: app.tagline,
							applicationCategory: app.category,
							operatingSystem: `Odoo ${app.odooVersions.join(', ')}`,
							url: app.storeUrl,
							offers: {
								'@type': 'Offer',
								price: app.price.replace(/[^0-9.]/g, ''),
								priceCurrency: 'USD',
								url: app.storeUrl,
							},
							author: {
								'@type': 'Organization',
								name: 'TechHive Solutions',
								url: 'https://techhivesolutions.com',
							},
						},
					})),
				},
			],
		}),
	component: OdooAppsPage,
})

function OdooAppsPage() {
	return (
		<>
			<PageHero
				eyebrow="Our Odoo apps"
				title="Odoo modules, built and published"
			>
				We publish our Odoo implementation expertise as modules the whole Odoo
				community can buy and install.
			</PageHero>

			<OdooAppsGrid />
			<AppsPartnerBand />
			<CtaBanner />
		</>
	)
}
