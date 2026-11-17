import { Outlet, createFileRoute } from '@tanstack/react-router'

import { SiteFooter } from '#/components/site/site-footer'
import { SiteHeader } from '#/components/site/site-header'

/**
 * Pathless layout route. Owns the shared site shell, navigation bar, footer
 * and mobile menu, and renders the active page through `<Outlet/>`. Every
 * marketing page route nests under this layout.
 */
export const Route = createFileRoute('/_site')({
	component: SiteLayout,
})

function SiteLayout() {
	return (
		<>
			<SiteHeader />
			<main>
				<Outlet />
			</main>
			<SiteFooter />
		</>
	)
}
