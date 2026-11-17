import { createFileRoute } from '@tanstack/react-router'

import { ContactFaqs } from '#/components/contact/contact-faqs'
import { ContactForm } from '#/components/contact/contact-form'
import { ContactInfo } from '#/components/contact/contact-info'
import { PageHero } from '#/components/site/page-hero'
import { Container } from '#/components/ui/container'
import { Section } from '#/components/ui/section'
import { contact } from '#/content'
import { seo } from '#/lib/seo'

/**
 * Contact page, the agency's contact details, the contact form (the site's one
 * runtime surface) and the FAQs. Copy is single-sourced from the typed
 * `contact` content module; the form's service-interest dropdown derives from
 * the canonical `Service[]` via `serviceOptions()`. The form posts to the
 * `submitLeadFn` server function, which validates and persists the Lead.
 */
export const Route = createFileRoute('/_site/contact')({
	head: () =>
		seo({
			title: 'Contact - TechHive Solutions',
			description:
				'Get in touch with TechHive Solutions. Based in Lahore, Pakistan, serving clients in Pakistan, the US and internationally.',
			url: '/contact',
			breadcrumb: 'Contact',
		}),
	component: ContactPage,
})

function ContactPage() {
	return (
		<>
			<PageHero eyebrow={contact.hero.label} title={contact.hero.title}>
				{contact.hero.body}
			</PageHero>

			<Section>
				<Container>
					<div className="grid gap-12 lg:grid-cols-2">
						<ContactInfo />
						<ContactForm />
					</div>
				</Container>
			</Section>

			<ContactFaqs />
		</>
	)
}
