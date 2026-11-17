/**
 * Build-time Open Graph image generator.
 *
 * Renders one 1200x630 PNG per page into `public/og/`, from a hand-authored
 * brand SVG (navy card, orange accent, Sora type, embedded logo). Runs as part
 * of `npm run build` (before `vite build`, which copies `public/` into the
 * deployed output). Re-run whenever page copy or branding changes.
 *
 * The site is fully prerendered, so per-page images only change at build time;
 * generating here (rather than per-request) keeps the runtime free of a raster
 * pipeline while still giving every page its own social preview.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Resvg } from '@resvg/resvg-js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FONT_DIR = resolve(ROOT, 'scripts/og-fonts')
const OUT_DIR = resolve(ROOT, 'public/og')

const W = 1200
const H = 630
const NAVY = '#0a1628'
const NAVY_MID = '#112040'
const ORANGE = '#ff6b2b'

/** Pages to generate. `key` is the output filename and the URL `seo()` derives. */
const PAGES: Array<{ key: string; lines: Array<string>; sub: string }> = [
	{
		key: 'home',
		lines: ['We build software', 'that drives growth.'],
		sub: 'AI Integration · Odoo ERP · Web · Mobile · Automation',
	},
	{
		key: 'services',
		lines: ['Services that move', 'the needle'],
		sub: 'AI, Odoo ERP, web portals, mobile, RPA & eLearning',
	},
	{
		key: 'portfolio',
		lines: ['Real projects.', 'Real results.'],
		sub: 'Case studies across government, eLearning & manufacturing',
	},
	{
		key: 'odoo-apps',
		lines: ['Odoo modules,', 'built and published.'],
		sub: 'Modules on the Odoo App Store · Certified Odoo Partner',
	},
	{
		key: 'about',
		lines: ['Built by engineers.', 'Trusted by enterprises.'],
		sub: '20+ years of delivery · Certified Odoo & Claude Partner',
	},
	{
		key: 'contact',
		lines: ["Let's talk about", 'what you need'],
		sub: 'Based in Lahore, Pakistan · Serving clients worldwide',
	},
]

const esc = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')

const logoDataUri = () => {
	const buf = readFileSync(resolve(ROOT, 'public/logo.png'))
	return `data:image/png;base64,${buf.toString('base64')}`
}

function svg(page: (typeof PAGES)[number], logo: string): string {
	const headingY = 300
	const lineGap = 84
	const heading = page.lines
		.map(
			(line, i) =>
				`<text x="80" y="${headingY + i * lineGap}" font-family="Sora" font-weight="800" font-size="72" fill="#ffffff">${esc(line)}</text>`,
		)
		.join('')

	return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_MID}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.92" cy="0.12" r="0.5">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${ORANGE}"/>
  <image href="${logo}" x="80" y="72" width="60" height="60"/>
  <text x="160" y="113" font-family="Sora" font-weight="600" font-size="34" fill="#ffffff">TechHive Solutions</text>
  ${heading}
  <text x="80" y="${headingY + page.lines.length * lineGap + 6}" font-family="Sora" font-weight="400" font-size="30" fill="#9aa3b0">${esc(page.sub)}</text>
  <rect x="80" y="540" width="64" height="5" rx="2.5" fill="${ORANGE}"/>
  <text x="80" y="585" font-family="Sora" font-weight="600" font-size="28" fill="${ORANGE}">techhivesolutions.com</text>
</svg>`
}

function main() {
	mkdirSync(OUT_DIR, { recursive: true })
	const fontFiles = [
		resolve(FONT_DIR, 'sora-400.ttf'),
		resolve(FONT_DIR, 'sora-600.ttf'),
		resolve(FONT_DIR, 'sora-800.ttf'),
	]
	const logo = logoDataUri()

	for (const page of PAGES) {
		const resvg = new Resvg(svg(page, logo), {
			font: { fontFiles, defaultFontFamily: 'Sora', loadSystemFonts: false },
			fitTo: { mode: 'width', value: W },
		})
		const png = resvg.render().asPng()
		const out = resolve(OUT_DIR, `${page.key}.png`)
		writeFileSync(out, png)
		console.log(
			`og: wrote ${page.key}.png (${(png.length / 1024).toFixed(0)} KB)`,
		)
	}
}

main()
