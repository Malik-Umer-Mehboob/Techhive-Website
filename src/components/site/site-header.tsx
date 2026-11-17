import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { LogoMark } from './logo'

/**
 * Primary navigation. These point at the five marketing pages; the page bodies
 * for the inner routes land in their own issues, but the shell links to them
 * from day one. Active styling (the `data-status="active"` attribute +
 * `aria-current="page"`) is applied natively by `<Link>`, Home matches `exact`
 * so it isn't highlighted on every nested route. See docs/adr/0002.
 */
const NAV_ITEMS = [
	{ to: '/', label: 'Home' },
	{ to: '/services', label: 'Services' },
	{ to: '/portfolio', label: 'Portfolio' },
	{ to: '/odoo-apps', label: 'Odoo Apps' },
	{ to: '/about', label: 'About' },
	{ to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<nav
			className={cn(
				'fixed inset-x-0 top-0 z-100 border-b border-hairline bg-white/96 backdrop-blur-md transition-shadow',
				scrolled && 'shadow-brand-sm',
			)}
		>
			<div className="mx-auto flex h-17 max-w-(--max-w) items-center justify-between gap-8 px-(--pad)">
				<Link
					to="/"
					className="flex items-center gap-2.5 font-display text-[1.2rem] font-bold text-navy"
				>
					<LogoMark />
					TechHive Solutions
				</Link>
				<div className="hidden flex-1 items-center gap-1 md:flex">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							activeOptions={{ exact: item.to === '/' }}
							className="rounded-brand-sm px-3.5 py-2 text-[0.88rem] font-medium text-ink-muted transition-colors hover:bg-wash hover:text-navy data-[status=active]:bg-wash data-[status=active]:text-navy"
						>
							{item.label}
						</Link>
					))}
				</div>
				<Button
					asChild
					variant="brand"
					size="brand"
					className="ml-auto hidden md:inline-flex"
				>
					<Link to="/contact">Get in touch</Link>
				</Button>
				<button
					type="button"
					className="cursor-pointer border-0 bg-none p-1.5 text-navy md:hidden"
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((open) => !open)}
				>
					<Menu size={22} />
				</button>
			</div>
			<div
				className={cn(
					'flex-col border-t border-hairline bg-white px-(--pad) pt-4 pb-6 gap-1',
					menuOpen ? 'flex' : 'hidden',
				)}
			>
				{NAV_ITEMS.map((item) => (
					<Link
						key={item.to}
						to={item.to}
						activeOptions={{ exact: item.to === '/' }}
						className="block rounded-brand-sm px-3.5 py-2.5 text-[0.88rem] font-medium text-ink-muted transition-colors hover:bg-wash hover:text-navy data-[status=active]:bg-wash data-[status=active]:text-navy"
						onClick={() => setMenuOpen(false)}
					>
						{item.label}
					</Link>
				))}
				<Button
					asChild
					variant="brand"
					size="brand"
					className="mt-2 justify-center"
				>
					<Link to="/contact" onClick={() => setMenuOpen(false)}>
						Get in touch
					</Link>
				</Button>
			</div>
		</nav>
	)
}
