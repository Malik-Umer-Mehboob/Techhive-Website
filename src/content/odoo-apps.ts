import { Bot, CalendarRange, FolderUp } from 'lucide-react'

import type { OdooApp } from './types'

/**
 * The canonical list of Odoo Apps, the SINGLE source of truth for the
 * `/odoo-apps` page (and its JSON-LD, OG copy and the About cross-link).
 *
 * An Odoo App is owned software TechHive publishes and sells on the Odoo App
 * Store, not a Service (client work) and not an operated Product (TutorBees /
 * Talent). See CONTEXT.md. The list is list-shaped from day one; each entry
 * hands off to its `storeUrl` for the full listing and checkout. Ordering is
 * significant: it is the priority order in which apps are presented, so the
 * flagship MCP Server leads.
 */
export const ODOO_APPS: Array<OdooApp> = [
	{
		slug: 'mcp-server-for-ai-agents',
		name: 'MCP Server for AI Agents',
		technicalName: 'th_mcp_server',
		tagline:
			'Let Claude, ChatGPT, Cursor and other AI assistants search, report on and update Odoo, on your terms.',
		description:
			'MCP Server for AI Agents connects the AI assistants your team already uses to Odoo through the Model Context Protocol. You decide what the AI sees, what it can change and when it has to ask first, and a setup wizard gets a client connected in about five minutes. Every purchase includes one hour of setup help.',
		features: [
			'Asks before it acts: deletes, bulk changes and outgoing emails wait for your confirmation',
			"Hidden fields, record rules and write limits set per key, so salaries or other companies' data never reach the AI",
			'Full audit trail: every call is logged and AI chatter posts carry an AI badge',
			'Ready-made setup for Claude, ChatGPT, Cursor, VS Code, Gemini CLI and Codex, with OAuth or expiring MCP keys',
		],
		price: '$200',
		odooVersions: ['19.0', '18.0', '17.0', '16.0'],
		category: 'Productivity',
		license: 'OPL-1',
		requirement: 'Odoo.sh or self-hosted only',
		dependencies: ['Discuss'],
		deployment: ['Odoo.sh', 'On-Premise'],
		storeUrl: 'https://apps.odoo.com/apps/modules/19.0/th_mcp_server',
		icon: Bot,
	},
	{
		slug: 'financial-year-switcher',
		name: 'Financial Year Switcher',
		technicalName: 'th_financial_year',
		tagline:
			'Pick the fiscal year in the top bar, like the company switcher, and everything dated outside it stays out of sight.',
		description:
			'Financial Year Switcher adds a fiscal year switcher next to the company switcher. Invoices, payments, orders, transfers and payslips dated outside the years you select are hidden by record rules, in every list, report, export and API call. You decide who can open past years, and a setup wizard previews every year and record count before anything is hidden.',
		features: [
			'Select one fiscal year or several, on desktop and mobile, with your own start month',
			'Enforced by record rules, so lists, reports, exports and AI assistants over MCP all follow it',
			'Past years only for the users you choose; everyone else sees the current year and any you open',
			'Opening balances in Enterprise ledgers, Trial Balance and Aged reports keep full history',
		],
		price: '$300',
		odooVersions: ['18.0'],
		category: 'Accounting',
		license: 'OPL-1',
		requirement: 'Odoo.sh or self-hosted only',
		dependencies: ['None'],
		deployment: ['Odoo.sh', 'On-Premise'],
		storeUrl: 'https://apps.odoo.com/apps/modules/18.0/th_financial_year',
		icon: CalendarRange,
	},
	{
		slug: 'documents-folder-upload',
		name: 'Documents Folder Upload',
		technicalName: 'documents_upload_folder',
		tagline:
			'Upload entire local directory structures straight into Odoo Documents, folders and all.',
		description:
			'Recreating a nested folder tree in Odoo Documents by hand is slow and error-prone. Documents Folder Upload adds a native "Upload Folder" button to the Documents interface: pick a local folder and the module recreates the exact nested structure as sub-workspaces while uploading every file inside it, respecting your existing access rights and workspace permissions.',
		features: [
			'Preserves the exact nested folder hierarchy as Documents sub-workspaces',
			'Native "Upload Folder" button inside the Documents interface',
			'Bulk-uploads every file in the tree, no manual folder recreation',
			'Respects standard access rights, workspace permissions and security',
		],
		price: '$35',
		odooVersions: ['19.0', '18.0'],
		category: 'Document Management',
		license: 'OPL-1',
		requirement: 'Requires Odoo Enterprise',
		dependencies: ['Documents', 'Discuss'],
		deployment: ['Odoo Online', 'Odoo.sh', 'On-Premise'],
		storeUrl: 'https://apps.odoo.com/apps/modules/19.0/documents_upload_folder',
		icon: FolderUp,
	},
]
