import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FONT_DIR = resolve(ROOT, 'scripts/og-fonts')
const OUT_DIR = resolve(ROOT, 'public/linkedin')

const NAVY = '#0a1628'
const NAVY_MID = '#112040'
const NAVY_LIGHT = '#1a3054'
const ORANGE = '#ff6b2b'

/**
 * Creates SVG for LinkedIn Company Banner Option 1:
 * "Built by engineers. Trusted by enterprises."
 * ViewBox: 0 0 1128 191
 */
function bannerOption1Svg(): string {
	return `<svg width="1128" height="191" viewBox="0 0 1128 191" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1128" y2="191" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${NAVY}" />
      <stop offset="60%" stop-color="${NAVY_MID}" />
      <stop offset="100%" stop-color="#142343" />
    </linearGradient>

    <!-- Warm orange ambient glow in top-right -->
    <radialGradient id="glowRight" cx="950" cy="50" r="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.22" />
      <stop offset="60%" stop-color="${ORANGE}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0" />
    </radialGradient>

    <!-- Subtle accent glow on bottom left -->
    <radialGradient id="glowLeft" cx="120" cy="180" r="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${NAVY_LIGHT}" stop-opacity="0.4" />
      <stop offset="100%" stop-color="${NAVY_LIGHT}" stop-opacity="0" />
    </radialGradient>

    <!-- Honeycomb pattern stroke -->
    <pattern id="hexGrid" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
      <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 104 L60 86.68 L60 52.04 L30 34.72 L0 52.04 L0 86.68 Z" 
            stroke="${NAVY_LIGHT}" stroke-width="1" stroke-opacity="0.45" fill="none"/>
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="1128" height="191" fill="url(#bgGrad)"/>
  <rect width="1128" height="191" fill="url(#glowRight)"/>
  <rect width="1128" height="191" fill="url(#glowLeft)"/>

  <!-- Subtle honeycomb pattern on right side only -->
  <g opacity="0.35" transform="translate(720, -20)">
    <!-- Hexagon 1 -->
    <polygon points="260,20 295,40 295,80 260,100 225,80 225,40" stroke="${ORANGE}" stroke-width="1.5" stroke-opacity="0.3" fill="none"/>
    <!-- Hexagon 2 -->
    <polygon points="320,55 355,75 355,115 320,135 285,115 285,75" stroke="${NAVY_LIGHT}" stroke-width="1.5" stroke-opacity="0.8" fill="none"/>
    <!-- Hexagon 3 -->
    <polygon points="200,55 235,75 235,115 200,135 165,115 165,75" stroke="${NAVY_LIGHT}" stroke-width="1.5" stroke-opacity="0.8" fill="none"/>
    <!-- Hexagon 4 -->
    <polygon points="260,90 295,110 295,150 260,170 225,150 225,110" stroke="${ORANGE}" stroke-width="1.5" stroke-opacity="0.4" fill="none"/>
    <!-- Hexagon 5 -->
    <polygon points="320,125 355,145 355,185 320,205 285,185 285,145" stroke="${NAVY_LIGHT}" stroke-width="1.5" stroke-opacity="0.5" fill="none"/>
    <!-- Hexagon 6 -->
    <polygon points="140,90 175,110 175,150 140,170 105,150 105,110" stroke="${NAVY_LIGHT}" stroke-width="1.5" stroke-opacity="0.5" fill="none"/>
  </g>

  <!-- Left Accent Vertical Edge Line -->
  <rect x="0" y="0" width="6" height="191" fill="${ORANGE}"/>

  <!-- CONTENT SECTION (Positioned from x=250 to keep safe from desktop logo avatar overlap) -->

  <!-- Top Eyebrow / Kicker -->
  <g transform="translate(250, 36)">
    <rect x="0" y="4" width="20" height="3" rx="1.5" fill="${ORANGE}"/>
    <text x="30" y="9" font-family="Sora" font-weight="700" font-size="11.5" letter-spacing="1.5" fill="${ORANGE}">
      SOFTWARE &amp; AI ENGINEERING
    </text>
  </g>

  <!-- Main Headline -->
  <text x="250" y="80" font-family="Sora" font-weight="800" font-size="28" fill="#ffffff">
    Built by engineers. <tspan fill="#e2e6ed">Trusted by enterprises.</tspan>
  </text>

  <!-- Services Subline -->
  <text x="250" y="112" font-family="Sora" font-weight="500" font-size="14.5" fill="#c6cbd4">
    AI Integration <tspan fill="${ORANGE}">·</tspan> Certified Odoo Partner <tspan fill="${ORANGE}">·</tspan> Web &amp; Mobile Platforms
  </text>

  <!-- Credibility Badges / Pills -->
  <g transform="translate(250, 134)">
    <!-- Pill 1: Claude Partner Network -->
    <g>
      <rect x="0" y="0" width="186" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="${ORANGE}"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        Claude Partner Network
      </text>
    </g>

    <!-- Pill 2: Certified Odoo Partner -->
    <g transform="translate(196, 0)">
      <rect x="0" y="0" width="168" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="#a24689"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        Certified Odoo Partner
      </text>
    </g>

    <!-- Pill 3: 20+ Years Track Record -->
    <g transform="translate(374, 0)">
      <rect x="0" y="0" width="148" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="#22c55e"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        20+ Years Delivery
      </text>
    </g>
  </g>

  <!-- Domain on Right -->
  <g transform="translate(930, 150)">
    <text text-anchor="end" font-family="Sora" font-weight="700" font-size="13" fill="${ORANGE}">
      techhivesolutions.com
    </text>
  </g>
</svg>`
}

/**
 * Creates SVG for LinkedIn Company Banner Option 2:
 * "We build software that drives growth."
 * ViewBox: 0 0 1128 191
 */
function bannerOption2Svg(): string {
	return `<svg width="1128" height="191" viewBox="0 0 1128 191" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="1128" y2="191" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${NAVY}" />
      <stop offset="50%" stop-color="${NAVY_MID}" />
      <stop offset="100%" stop-color="#0e1a2f" />
    </linearGradient>

    <radialGradient id="glow2" cx="1020" cy="95" r="380" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.25" />
      <stop offset="50%" stop-color="${ORANGE}" stop-opacity="0.06" />
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bgGrad2)"/>
  <rect width="1128" height="191" fill="url(#glow2)"/>

  <!-- Left Accent Vertical Edge Line -->
  <rect x="0" y="0" width="6" height="191" fill="${ORANGE}"/>

  <!-- Tech Geometric Graphics on Right -->
  <g opacity="0.3" transform="translate(860, 20)">
    <!-- Circuit / Mesh Hexagons -->
    <polygon points="120,15 155,35 155,75 120,95 85,75 85,35" stroke="${ORANGE}" stroke-width="1.5" fill="none"/>
    <polygon points="180,50 215,70 215,110 180,130 145,110 145,70" stroke="${NAVY_LIGHT}" stroke-width="2" fill="none"/>
    <polygon points="60,50 95,70 95,110 60,130 25,110 25,70" stroke="${NAVY_LIGHT}" stroke-width="1.5" fill="none"/>
    <polygon points="120,85 155,105 155,145 120,165 85,145 85,105" stroke="${ORANGE}" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
    <!-- Connecting points -->
    <circle cx="120" cy="15" r="2.5" fill="${ORANGE}"/>
    <circle cx="155" cy="75" r="2.5" fill="${ORANGE}"/>
    <circle cx="85" cy="75" r="2.5" fill="${ORANGE}"/>
  </g>

  <!-- CONTENT SECTION (Offset from x=250 for Desktop logo overlap safety) -->

  <!-- Top Eyebrow -->
  <g transform="translate(250, 36)">
    <rect x="0" y="4" width="20" height="3" rx="1.5" fill="${ORANGE}"/>
    <text x="30" y="9" font-family="Sora" font-weight="700" font-size="11.5" letter-spacing="1.5" fill="${ORANGE}">
      TECHHIVE SOLUTIONS
    </text>
  </g>

  <!-- Main Headline -->
  <text x="250" y="80" font-family="Sora" font-weight="800" font-size="28" fill="#ffffff">
    We build software that drives growth.
  </text>

  <!-- Subheadline -->
  <text x="250" y="112" font-family="Sora" font-weight="500" font-size="14.5" fill="#c6cbd4">
    AI Integration <tspan fill="${ORANGE}">·</tspan> Odoo ERP <tspan fill="${ORANGE}">·</tspan> Enterprise Web &amp; Mobile Portals
  </text>

  <!-- Badges & Callout -->
  <g transform="translate(250, 134)">
    <!-- Badge 1: Claude Partner Network -->
    <g>
      <rect x="0" y="0" width="186" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="${ORANGE}"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        Claude Partner Network
      </text>
    </g>

    <!-- Badge 2: Certified Odoo Partner -->
    <g transform="translate(196, 0)">
      <rect x="0" y="0" width="168" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="#a24689"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        Certified Odoo Partner
      </text>
    </g>

    <!-- Badge 3: Global Delivery -->
    <g transform="translate(374, 0)">
      <rect x="0" y="0" width="138" height="26" rx="13" fill="#14233a" stroke="#253a5c" stroke-width="1"/>
      <circle cx="12" cy="13" r="3.5" fill="#38bdf8"/>
      <text x="23" y="17" font-family="Sora" font-weight="600" font-size="10.5" fill="#f1f3f6">
        US &amp; Global Delivery
      </text>
    </g>
  </g>

  <!-- Website Link -->
  <g transform="translate(930, 150)">
    <text text-anchor="end" font-family="Sora" font-weight="700" font-size="13" fill="${ORANGE}">
      techhivesolutions.com
    </text>
  </g>
</svg>`
}

function main() {
	mkdirSync(OUT_DIR, { recursive: true })
	const fontFiles = [
		resolve(FONT_DIR, 'sora-400.ttf'),
		resolve(FONT_DIR, 'sora-600.ttf'),
		resolve(FONT_DIR, 'sora-800.ttf'),
	]

	const banners = [
		{
			id: 'linkedin-banner-engineers',
			svg: bannerOption1Svg(),
		},
		{
			id: 'linkedin-banner-growth',
			svg: bannerOption2Svg(),
		},
	]

	// Dimensions to export:
	// 1x: 1128 x 191
	// 2x (Retina): 2256 x 382
	// 4200 x 700 (High-res 6:1)
	for (const banner of banners) {
		// 1x standard
		const resvg1x = new Resvg(banner.svg, {
			font: { fontFiles, defaultFontFamily: 'Sora', loadSystemFonts: false },
			fitTo: { mode: 'width', value: 1128 },
		})
		const png1x = resvg1x.render().asPng()
		writeFileSync(resolve(OUT_DIR, `${banner.id}-1128x191.png`), png1x)

		// 2x Retina
		const resvg2x = new Resvg(banner.svg, {
			font: { fontFiles, defaultFontFamily: 'Sora', loadSystemFonts: false },
			fitTo: { mode: 'width', value: 2256 },
		})
		const png2x = resvg2x.render().asPng()
		writeFileSync(resolve(OUT_DIR, `${banner.id}-2256x382.png`), png2x)

		// 4200x700
		const resvg4200 = new Resvg(banner.svg, {
			font: { fontFiles, defaultFontFamily: 'Sora', loadSystemFonts: false },
			fitTo: { mode: 'width', value: 4200 },
		})
		const png4200 = resvg4200.render().asPng()
		writeFileSync(resolve(OUT_DIR, `${banner.id}-4200x700.png`), png4200)

		console.log(`Generated banner variants for ${banner.id}`)
	}
}

main()
