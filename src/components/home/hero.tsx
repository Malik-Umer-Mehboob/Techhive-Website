import { Link } from '@tanstack/react-router'
import { ArrowRight, Star } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '#/components/ui/button'
import { home } from '#/content'

const { hero } = home

export function Hero() {
	return (
		<section className="relative flex min-h-screen items-center overflow-hidden bg-navy px-(--pad) pt-32 pb-20">
			<div
				className="pointer-events-none absolute top-[-10%] right-[-5%] h-[120%] w-[52%] bg-[linear-gradient(135deg,var(--orange)_0%,#ff9a5c_100%)] opacity-[0.08] [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]"
				aria-hidden="true"
			/>
			<div className="relative z-1 mx-auto grid w-full max-w-(--max-w) grid-cols-1 items-center gap-20 lg:grid-cols-2">
				<div>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,107,43,0.3)] bg-[rgba(255,107,43,0.12)] py-1.5 pr-3.5 pl-2 text-[0.78rem] font-semibold text-orange">
						<span className="flex size-6 items-center justify-center rounded-full bg-orange">
							<Star size={12} fill="white" strokeWidth={0} />
						</span>
						Claude Partner Network
					</div>
					<h1 className="mb-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-white">
						{hero.headlineLead}{' '}
						<span className="text-orange">{hero.headlineAccent}</span>
					</h1>
					<p className="mb-10 max-w-[46ch] text-[1.1rem] leading-[1.75] text-white/65">
						{hero.body}
					</p>
					<div className="flex flex-wrap items-center gap-4">
						<Button asChild variant="brand" size="brand">
							<Link to={hero.primaryCta.href}>
								{hero.primaryCta.label} <ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button asChild variant="ghostWhite" size="brand">
							<Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
						</Button>
					</div>
					<div className="mt-14 flex flex-wrap items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
						{hero.trustStats.map((stat, index) => (
							<Fragment key={stat.label}>
								<div className="flex flex-col gap-0.5">
									<span className="font-display text-[1.6rem] leading-none font-bold text-white">
										{stat.value}
										{stat.suffix ? <span>{stat.suffix}</span> : null}
									</span>
									<span className="text-[0.78rem] text-white/50">
										{stat.label}
									</span>
								</div>
								{index < hero.trustStats.length - 1 ? (
									<div className="h-9 w-px bg-white/15" />
								) : null}
							</Fragment>
						))}
					</div>
				</div>

				<div className="relative hidden lg:block" aria-hidden="true">
					<div className="grid grid-cols-2 gap-4">
						{hero.cards.map((card) => {
							const Icon = card.icon
							return (
								<div
									key={card.name}
									className={`rounded-brand-lg border border-white/10 bg-white/6 p-6 backdrop-blur-[8px]${card.wide ? ' col-span-2' : ''}`}
								>
									<div className="mb-3 flex size-10 items-center justify-center rounded-[10px] bg-[rgba(255,107,43,0.15)]">
										<Icon className="size-5 text-orange" />
									</div>
									<div className="mb-1 font-display text-[0.9rem] font-semibold text-white">
										{card.name}
									</div>
									<div className="text-[0.78rem] leading-normal text-white/50">
										{card.description}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
