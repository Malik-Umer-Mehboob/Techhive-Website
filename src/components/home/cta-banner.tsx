import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { home } from '#/content'

const { cta } = home

export function CtaBanner() {
	return (
		<section className="relative overflow-hidden bg-navy px-(--pad) py-[clamp(3.5rem,7vw,6rem)] before:absolute before:top-0 before:right-0 before:bottom-0 before:w-[40%] before:bg-[linear-gradient(135deg,transparent_0%,rgba(255,107,43,0.08)_100%)] before:content-[''] before:[clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)]">
			<div className="relative z-1 mx-auto flex max-w-(--max-w) flex-wrap items-center justify-between gap-12 max-md:justify-center max-md:text-center">
				<div>
					<h2 className="mb-2 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-white">
						{cta.title}
					</h2>
					<p className="text-base text-white/55">{cta.body}</p>
				</div>
				<div className="flex shrink-0 flex-wrap items-center gap-4 max-md:justify-center">
					<Button asChild variant="brand" size="brand">
						<Link to={cta.primaryCta.href}>
							{cta.primaryCta.label} <ArrowRight className="size-4" />
						</Link>
					</Button>
					<Button asChild variant="ghostWhite" size="brand">
						<Link to={cta.secondaryCta.href}>{cta.secondaryCta.label}</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
