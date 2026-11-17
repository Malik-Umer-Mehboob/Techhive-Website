/**
 * The name of the hidden "honeypot" field on the contact form. The field is
 * invisible to a human (hidden via CSS, removed from the tab order, autocomplete
 * disabled), but many bots blindly fill every field they find, so a non-empty
 * value is a strong bot signal.
 *
 * Kept as a single exported constant so the form that renders the field and the
 * guard that checks it can never disagree on the name.
 */
export const honeypotFieldName = 'website'

/**
 * Whether a submission tripped the honeypot, i.e. the hidden field came back
 * with a non-empty value. Reads the raw, un-validated input (the honeypot is not
 * part of `leadSchema`), so it can run ahead of validation.
 */
export function isHoneypotTripped(input: unknown): boolean {
	if (typeof input !== 'object' || input === null) return false
	const value = (input as Record<string, unknown>)[honeypotFieldName]
	return typeof value === 'string' && value.trim().length > 0
}
