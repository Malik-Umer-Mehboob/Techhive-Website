import type { Client } from './types'

/**
 * Canonical Clients, organizations TechHive has delivered for that render in
 * the "More clients we've delivered for" credibility strip on the Portfolio
 * page. Distinct from {@link CASE_STUDIES}: a Client is shown as name + logo
 * (+ optional blurb) with no narrative, outcomes or live link, and the strip is
 * deliberately *not* a superset of the Case Study set. See CONTEXT.md.
 */
export const CLIENTS: Array<Client> = [
	{
		name: 'World Health Organization',
		logo: '/who.webp',
	},
	{
		name: 'Medace - Getz Pharma',
		logo: '/medace.webp',
	},
	{
		name: 'Hameed Automation',
		logo: '/hameed-automation.webp',
	},
	{
		name: 'Opus Guild',
		logo: '/opus-guild.svg',
	},
	{
		name: 'Talent Games',
		logo: '/talent.webp',
	},
	{
		name: 'TPS',
		logo: '/tps.webp',
	},
	{
		name: '10xEngineers',
		logo: '/10x.webp',
	},
]
