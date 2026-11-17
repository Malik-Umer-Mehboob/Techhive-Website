import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TechHive Solutions',
			},
			{
				name: 'description',
				content:
					'TechHive Solutions, a software and AI services agency building enterprise-grade digital solutions for businesses in Pakistan and the US.',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
		scripts: [
			{
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'ProfessionalService',
					name: 'TechHive Solutions',
					url: 'https://techhivesolutions.com',
					logo: 'https://techhivesolutions.com/logo512.png',
					description:
						'AI-powered software, Odoo ERP, web portals and mobile apps for businesses in Pakistan and the US.',
					address: {
						'@type': 'PostalAddress',
						addressLocality: 'Lahore',
						addressCountry: 'PK',
					},
					areaServed: ['PK', 'US'],
					knowsAbout: [
						'AI Integration',
						'Odoo ERP',
						'Web Portals',
						'Mobile Apps',
					],
				}),
			},
		],
	}),
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
