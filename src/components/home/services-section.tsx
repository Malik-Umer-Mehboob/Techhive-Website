import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Card } from '#/components/ui/card'
import { Container } from '#/components/ui/container'
import {
	Section,
	SectionEyebrow,
	SectionLead,
	SectionTitle,
} from '#/components/ui/section'
import { SERVICES, home, serviceLink } from '#/content'

const { services } = home

export function ServicesSection() {
	return (
		<Section>
			<Container>
				<div className="mb-14 max-w-[600px]">
					<SectionEyebrow>{services.label}</SectionEyebrow>
					<SectionTitle>{services.title}</SectionTitle>
					<SectionLead>{services.body}</SectionLead>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{SERVICES.map((service) => {
						const Icon = service.icon
						return (
							<Card
								key={service.slug}
								className="group relative overflow-hidden p-8 transition-[border-color,box-shadow,transform] duration-200 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-orange after:transition-transform after:duration-[0.25s] after:content-[''] hover:-translate-y-1 hover:border-transparent hover:shadow-brand-md hover:after:scale-x-100"
							>
								<div className="mb-5 flex size-13 items-center justify-center rounded-brand-md bg-orange-pale">
									<Icon className="size-6 text-orange [stroke-width:1.75]" />
								</div>
								<h3 className="mb-2.5 font-display text-[1.05rem] font-bold text-navy">
									{service.name}
								</h3>
								<p className="text-[0.88rem] leading-[1.7] text-ink-muted">
									{service.summary}
								</p>
								<Link
									{...serviceLink(service)}
									className="mt-5 inline-flex items-center gap-1.5 text-[0.83rem] font-semibold text-orange transition-[gap] duration-200 group-hover:gap-2.5"
								>
									Learn more <ArrowRight size={14} />
								</Link>
							</Card>
						)
					})}
				</div>
			</Container>
		</Section>
	)
}
