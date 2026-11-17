import { z } from 'zod'

import { serviceOptions } from '#/content'

/**
 * The allowed "service interest" values for a Lead, derived from
 * {@link serviceOptions} (the seven Services + "Something else") so the schema
 * can never drift from the canonical Service list. See CONTEXT.md.
 */
const serviceInterestValues = serviceOptions().map(
	(option) => option.value,
) as [string, ...Array<string>]

/**
 * The shared validation rules for a Lead, a contact-form submission. Used on
 * both the client (live field validation) and the server (the authoritative
 * check inside `submitLead`), so the two can never disagree.
 *
 * Field rules: first/last name and message are required with sensible length
 * bounds; email must be a valid work-email format; company is optional; the
 * service interest must be a known Service slug or "something-else".
 */
export const leadSchema = z.object({
	firstName: z.string().trim().min(1, 'First name is required').max(80),
	lastName: z.string().trim().min(1, 'Last name is required').max(80),
	email: z.email('Enter a valid email address').max(200),
	// Company is optional for the visitor, a blank value is allowed, but the
	// field is always present (the form sends ''), so it stays a plain string
	// rather than `.optional()`, which keeps the form value and schema types in
	// step for client-side validation.
	company: z.string().trim().max(120),
	serviceInterest: z.enum(serviceInterestValues, {
		error: 'Select what you are looking for',
	}),
	message: z
		.string()
		.trim()
		.min(10, 'Tell us a little about your project')
		.max(2000),
})

/** A validated Lead submission, ready to persist. */
export type LeadInput = z.infer<typeof leadSchema>
