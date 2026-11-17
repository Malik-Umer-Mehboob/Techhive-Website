import { createFileRoute } from '@tanstack/react-router'

import { CaseStudiesSection } from '#/components/home/case-studies-section'
import { CtaBanner } from '#/components/home/cta-banner'
import { Hero } from '#/components/home/hero'
import { PartnerCallout } from '#/components/home/partner-callout'
import { ServicesSection } from '#/components/home/services-section'
import { StatsSection } from '#/components/home/stats-section'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/_site/')({
	head: () =>
		seo({
			title: 'TechHive Solutions - AI Integration & Enterprise Software',
			description:
				'TechHive Solutions builds AI-powered software, Odoo ERP, web portals and mobile apps for businesses in Pakistan and the US. Registered Claude Partner Network member.',
			url: '/',
		}),
	component: Home,
})

function Home() {
	return (
		<>
			<Hero />
			<ServicesSection />
			<PartnerCallout />
			<StatsSection />
			<CaseStudiesSection />
			<CtaBanner />
		</>
	)
}
