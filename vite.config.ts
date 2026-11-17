import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

import { DETAIL_PAGE_CASE_STUDIES } from './src/content/case-studies.ts'

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart({
			// Prerender pages to static HTML (SSG). Crawling is disabled because the
			// inner routes (/services, …) land in their own issues; the
			// pages to prerender are listed explicitly until those routes exist.
			prerender: { enabled: true, crawlLinks: false, failOnError: true },
			pages: [
				{ path: '/' },
				{ path: '/portfolio' },
				{ path: '/about' },
				{ path: '/contact' },
				// Case study detail pages (/portfolio/<slug>), derived from the content
				// so a new long-form Case Study is prerendered without editing this file.
				...DETAIL_PAGE_CASE_STUDIES.map((study) => ({
					path: `/portfolio/${study.slug}`,
				})),
			],
		}),
		viteReact(),
	],
})

export default config
