import { Check } from 'lucide-react'

import { Container } from '#/components/ui/container'
import {
	Section,
	SectionEyebrow,
	SectionLead,
	SectionTitle,
} from '#/components/ui/section'

/**
 * The credential band on the `/odoo-apps` page: ties the apps we publish back
 * to the Odoo Partner story ("why trust these modules"). It reinforces
 * the About page's `#partners` narrative without duplicating its copy, the
 * apps are proof of the same Odoo depth, expressed as shipped product rather
 * than client implementation work.
 */
export function AppsPartnerBand() {
	return (
		<Section tone="wash" className="border-t border-hairline">
			<Container>
				<div className="mx-auto max-w-3xl text-center">
					<SectionEyebrow centered>Why our modules</SectionEyebrow>
					<SectionTitle>Built by a certified Odoo Partner</SectionTitle>
					<SectionLead className="mx-auto text-center">
						We&apos;ve implemented, extended and maintained Odoo for enterprises
						for years. These modules are that same depth, packaged and published
						for the whole Odoo community, tested against real deployments and
						built to Odoo&apos;s own standards.
					</SectionLead>
					<div className="mt-8 inline-flex items-center gap-2 rounded-brand-md border border-hairline bg-white px-5 py-3 text-[0.88rem] font-semibold text-navy shadow-brand-sm">
						<Check size={16} className="text-orange" /> Odoo Partner
					</div>
				</div>
			</Container>
		</Section>
	)
}
