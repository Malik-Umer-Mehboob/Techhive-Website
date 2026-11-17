const SITE_URL = 'https://techhivesolutions.com'
const SITE_NAME = 'TechHive Solutions'

/**
 * Per-page Open Graph image, generated at build time into `public/og/` by
 * `scripts/generate-og.ts`. The home page maps to `/og/home.png`; every other
 * path maps to `/og<path>.png` (e.g. `/services` -> `/og/services.png`). Pass an
 * explicit `image` to override.
 */
function ogImageFor(url: string) {
	return `/og${url === '/' ? '/home' : url}.png`
}

type JsonLd = Record<string, unknown>

interface SeoInput {
	/** Full <title> for the page. */
	title: string
	/** Meta description, also used for og:description / twitter:description. */
	description: string
	/** Site-relative path, e.g. `/services`. Used for canonical + og:url. */
	url: string
	/** Site-relative 1200x630 share image. Defaults to the per-page generated card. */
	image?: string
	/**
	 * Short label for this page in the breadcrumb trail, e.g. `Services`. When
	 * set (and the page isn't home), a `BreadcrumbList` of Home > label is
	 * emitted as JSON-LD.
	 */
	breadcrumb?: string
	/**
	 * Pages between Home and this one in the breadcrumb trail, e.g.
	 * `[{ name: 'Portfolio', url: '/portfolio' }]` for a case study page.
	 */
	breadcrumbParents?: Array<{ name: string; url: string }>
	/** Extra JSON-LD objects to emit as additional `application/ld+json` scripts. */
	jsonLd?: Array<JsonLd>
}

function ldScript(data: JsonLd) {
	return { type: 'application/ld+json', children: JSON.stringify(data) }
}

/**
 * Single source for a route's `head()` output: title, description, Open Graph,
 * Twitter Card, canonical, plus optional BreadcrumbList and page-specific
 * JSON-LD. Spread the result into the route's `head`:
 *
 *   head: () => seo({ title: '...', description: '...', url: '/services' })
 *
 * The root route (`__root.tsx`) sets charSet + viewport and the site-wide
 * ProfessionalService schema once; every page route calls this so social
 * previews and canonicals are never forgotten per page.
 */
export function seo({
	title,
	description,
	url,
	image,
	breadcrumb,
	breadcrumbParents = [],
	jsonLd = [],
}: SeoInput) {
	const canonical = SITE_URL + url
	const imageUrl = SITE_URL + (image ?? ogImageFor(url))

	const schemas: Array<JsonLd> = []
	if (breadcrumb && url !== '/') {
		schemas.push({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ name: 'Home', item: SITE_URL + '/' },
				...breadcrumbParents.map((parent) => ({
					name: parent.name,
					item: SITE_URL + parent.url,
				})),
				{ name: breadcrumb, item: canonical },
			].map((entry, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				...entry,
			})),
		})
	}
	schemas.push(...jsonLd)

	return {
		meta: [
			{ title },
			{ name: 'description', content: description },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:title', content: title },
			{ property: 'og:description', content: description },
			{ property: 'og:url', content: canonical },
			{ property: 'og:image', content: imageUrl },
			{ property: 'og:image:width', content: '1200' },
			{ property: 'og:image:height', content: '630' },
			{ property: 'og:image:alt', content: title },
			{ property: 'og:site_name', content: SITE_NAME },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: title },
			{ name: 'twitter:description', content: description },
			{ name: 'twitter:image', content: imageUrl },
			{ name: 'twitter:image:alt', content: title },
		],
		links: [{ rel: 'canonical', href: canonical }],
		scripts: schemas.map(ldScript),
	}
}
