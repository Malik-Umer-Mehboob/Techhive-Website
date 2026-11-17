import { Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'

import { Container } from '#/components/ui/container'
import {
	Section,
	SectionEyebrow,
	SectionLead,
	SectionTitle,
} from '#/components/ui/section'
import { about } from '#/content'

const { odoo } = about

/**
 * The Odoo Partner credential section. Odoo appears here as proof, a
 * certified-partner badge and module expertise, not as a primary offering (see
 * CONTEXT.md). Carries the `partners` anchor the footer deep-links to (#10).
 */
export function OdooSection() {
	return (
		<Section id="partners" tone="wash">
			<Container>
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
					<div>
						<SectionEyebrow>{odoo.label}</SectionEyebrow>
						<SectionTitle>{odoo.title}</SectionTitle>
						{odoo.body.map((paragraph) => (
							<SectionLead key={paragraph}>{paragraph}</SectionLead>
						))}
						<div className="mt-6 inline-flex items-center gap-2 rounded-brand-md border border-hairline bg-white px-5 py-3 text-[0.88rem] font-semibold text-navy shadow-brand-sm">
							<Check size={16} className="text-orange" /> {odoo.badge}
						</div>
						<Link
							to="/odoo-apps"
							className="group mt-6 flex items-center gap-1.5 text-[0.83rem] font-semibold text-orange transition-[gap] duration-200 hover:gap-2.5"
						>
							Explore our Odoo apps <ArrowRight size={14} />
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{odoo.modules.map((module) => (
							<div
								key={module.name}
								className="flex items-start gap-3 rounded-brand-md border border-hairline bg-white p-5"
							>
								<div className="mt-1.5 size-2 shrink-0 rounded-full bg-orange" />
								<div>
									<div className="text-[0.88rem] font-semibold text-navy">
										{module.name}
									</div>
									<div className="mt-0.5 text-[0.78rem] text-ink-muted">
										{module.description}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
