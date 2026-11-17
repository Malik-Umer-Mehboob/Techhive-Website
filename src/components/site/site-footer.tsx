import { Link, linkOptions } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import { SERVICES, contact, serviceLink } from '#/content'
import { LogoMark } from './logo'

const COMPANY_LINKS = [
	{ label: 'About us', link: linkOptions({ to: '/about' }) },
	{ label: 'Case studies', link: linkOptions({ to: '/portfolio' }) },
	{ label: 'Odoo Apps', link: linkOptions({ to: '/odoo-apps' }) },
	{ label: 'Partners', link: linkOptions({ to: '/about', hash: 'partners' }) },
	{
		label: 'Industries',
		link: linkOptions({ to: '/about', hash: 'industries' }),
	},
]

/**
 * LinkedIn mark as inline SVG: lucide-react's Linkedin brand icon is
 * deprecated. Decorative, since the link carries its own label.
 */
function LinkedInIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="14"
			height="14"
			fill="currentColor"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	)
}

export function SiteFooter() {
	return (
		<footer className="bg-navy px-(--pad) pt-20 pb-0 text-white/65">
			<div className="mx-auto grid max-w-(--max-w) grid-cols-1 gap-12 border-b border-white/8 pb-12 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
				<div className="flex flex-col gap-4">
					<Link
						to="/"
						className="flex items-center gap-2.5 font-display text-[1.1rem] font-bold text-white"
					>
						<LogoMark />
						TechHive Solutions
					</Link>
					<p className="max-w-[28ch] text-[0.88rem] leading-[1.65]">
						Building AI-powered software, ERP solutions and digital platforms
						for businesses in Pakistan and beyond.
					</p>
					<div className="mt-2 inline-flex w-fit items-center gap-2 rounded-brand-sm border border-[rgba(255,107,43,0.2)] bg-[rgba(255,107,43,0.1)] px-2.5 py-1.5 text-[0.78rem] font-semibold text-orange">
						<Star size={13} fill="currentColor" strokeWidth={0} />
						Claude Partner Network - Registered
					</div>
				</div>

				<div>
					<h4 className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/40">
						Services
					</h4>
					<ul className="m-0 flex list-none flex-col gap-[0.7rem] p-0">
						{SERVICES.map((service) => (
							<li key={service.slug}>
								<Link
									{...serviceLink(service)}
									className="text-[0.88rem] transition-colors hover:text-white"
								>
									{service.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/40">
						Company
					</h4>
					<ul className="m-0 flex list-none flex-col gap-[0.7rem] p-0">
						{COMPANY_LINKS.map((item) => (
							<li key={item.label}>
								<Link
									{...item.link}
									className="text-[0.88rem] transition-colors hover:text-white"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/40">
						Contact
					</h4>
					<ul className="m-0 flex list-none flex-col gap-[0.7rem] p-0">
						<li>
							<Link
								to="/contact"
								className="text-[0.88rem] transition-colors hover:text-white"
							>
								Get in touch
							</Link>
						</li>
						<li>
							<a
								href="tel:+923494186663"
								className="text-[0.88rem] transition-colors hover:text-white"
							>
								+92 349 418 6663
							</a>
						</li>
						<li>
							<a
								href="mailto:info@techhivesolutions.com"
								className="text-[0.88rem] transition-colors hover:text-white"
							>
								info@techhivesolutions.com
							</a>
						</li>
						<li>
							<a
								href={contact.details.linkedin.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${contact.details.linkedin.label}: ${contact.details.linkedin.value} (opens in a new tab)`}
								className="inline-flex items-center gap-2 text-[0.88rem] transition-colors hover:text-white"
							>
								<LinkedInIcon />
								{contact.details.linkedin.label}
							</a>
						</li>
						<li>
							<Link
								to="/contact"
								className="text-[0.88rem] transition-colors hover:text-white"
							>
								Lahore, Pakistan
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="mx-auto flex max-w-(--max-w) flex-wrap items-center justify-between gap-4 py-7 text-[0.8rem]">
				<p>
					&copy; {new Date().getFullYear()} TechHive Solutions SMC. Ltd. All
					rights reserved.
				</p>
				<nav className="flex gap-6"></nav>
			</div>
		</footer>
	)
}
