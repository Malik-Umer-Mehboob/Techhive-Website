import { createFileRoute } from '@tanstack/react-router'

import { CtaBanner } from '#/components/home/cta-banner'
import { PartnerCallout } from '#/components/home/partner-callout'
import { ServiceSection } from '#/components/services/service-section'
import { PageHero } from '#/components/site/page-hero'
import { SERVICES } from '#/content'
import { seo } from '#/lib/seo'

/**
 * Services page, one detailed anchor section per Service, rendered from the
 * canonical `Service[]` in priority order (AI Integration first, Odoo ERP
 * retained with its partner credential). No second copy of the list: the same
 * array feeds the Home grid, the footer and this page.
 *
 * Each section carries `id={slug}` + `.anchor-offset`, so the Home grid's
 * "Learn more" deep links (`/services#<slug>`, serviceLink) land below the
 * fixed header (#10, docs/adr/0002).
 */
export const Route = createFileRoute('/_site/services')({
	head: () =>
		seo({
			title: 'Services - TechHive Solutions',
			description:
				'AI Integration, Odoo ERP, web portals, mobile apps, eLearning platforms, and offshore development. Built, shipped and maintained at scale by TechHive Solutions.',
			url: '/services',
			breadcrumb: 'Services',
			jsonLd: [
				{
					'@context': 'https://schema.org',
					'@type': 'OfferCatalog',
					name: 'TechHive Solutions Services',
					url: 'https://techhivesolutions.com/services',
					provider: {
						'@type': 'ProfessionalService',
						name: 'TechHive Solutions',
						url: 'https://techhivesolutions.com',
					},
					itemListElement: SERVICES.map((s) => ({
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: s.name,
							description: s.summary,
							url: `https://techhivesolutions.com/services#${s.slug}`,
						},
					})),
				},
			],
		}),
	component: ServicesPage,
})

function ServicesPage() {
	return (
		<>
			<PageHero eyebrow="What we build" title="Services that move the needle">
				From your first Odoo module to a fully custom enterprise platform; we've
				built it, shipped it, and maintained it at scale.
			</PageHero>

			{SERVICES.map((service, index) => (
				<ServiceSection key={service.slug} service={service} index={index} />
			))}

			<PartnerCallout />
			<CtaBanner />
		</>
	)
}
