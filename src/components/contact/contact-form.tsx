import { useForm } from '@tanstack/react-form'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#/components/ui/select'
import { Textarea } from '#/components/ui/textarea'
import { contact, serviceOptions } from '#/content'
import { honeypotFieldName, leadSchema } from '#/lib/leads'
import { submitLeadFn } from '#/lib/leads/submit-lead-fn'

const { form: copy } = contact
const serviceChoices = serviceOptions()

// Shared field styling: filled, taller (44px touch target) inputs with a
// brand-orange focus ring, since the default `--ring` token is a near-invisible
// light gray. Applied to every input/select/textarea for a consistent feel.
const fieldBase =
	'rounded-lg border-hairline transition-[color,box-shadow,background-color] hover:border-faint focus-visible:border-orange focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-orange/20'
const inputClassName = `mt-1.5 h-11 ${fieldBase}`
const textareaClassName = `mt-1.5 ${fieldBase}`
const selectTriggerClassName = `mt-1.5 w-full data-[size=default]:h-11 ${fieldBase}`

type FieldMeta = {
	isTouched: boolean
	errors: Array<{ message?: string } | string | undefined>
}

/** Whether a field should render its invalid (error) state. */
function isInvalid(meta: FieldMeta) {
	return meta.isTouched && meta.errors.length > 0
}

/** A field-level validation message, shown only once the field has been touched. */
function FieldError({ meta }: { meta: FieldMeta }) {
	if (!meta.isTouched || meta.errors.length === 0) return null
	const first = meta.errors[0]
	const message = typeof first === 'string' ? first : first?.message
	if (!message) return null
	return <p className="mt-1.5 text-sm text-destructive">{message}</p>
}

/**
 * The contact form. Validates with the shared `leadSchema` on the client (so
 * the same rules the server enforces give instant feedback), then submits to
 * the `submitLeadFn` server function and surfaces its Result, a success
 * confirmation, or an error message, to the visitor.
 */
export function ContactForm() {
	const [submitFailed, setSubmitFailed] = useState(false)
	const [succeeded, setSucceeded] = useState(false)
	// The honeypot lives outside the form's typed state (and `leadSchema`) so a
	// human never sees it and validation never touches it, we read its value at
	// submit time and thread it through to the server guard.
	const honeypotRef = useRef<HTMLInputElement>(null)

	const form = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			company: '',
			serviceInterest: '',
			message: '',
		},
		validators: { onBlur: leadSchema, onSubmit: leadSchema },
		onSubmit: async ({ value }) => {
			setSubmitFailed(false)
			const result = await submitLeadFn({
				data: {
					...value,
					[honeypotFieldName]: honeypotRef.current?.value ?? '',
				},
			})
			// A `notification` failure still means the Lead was captured, only the
			// team email missed, so the visitor gets the same success confirmation
			// and never re-submits a Lead that was already saved.
			if (result.ok || result.kind === 'notification') {
				setSucceeded(true)
				form.reset()
			} else {
				setSubmitFailed(true)
			}
		},
	})

	if (succeeded) {
		return (
			<div className="rounded-2xl border border-hairline bg-white p-8">
				<h3 className="mb-2 font-bold text-navy">{copy.successTitle}</h3>
				<p className="text-sm leading-relaxed text-ink-muted">
					{copy.successBody}
				</p>
			</div>
		)
	}

	return (
		<div className="rounded-2xl border border-hairline bg-white p-8">
			<h3 className="mb-7 text-xl font-bold text-navy">{copy.label}</h3>
			<form
				noValidate
				onSubmit={(event) => {
					event.preventDefault()
					event.stopPropagation()
					void form.handleSubmit()
				}}
				className="flex flex-col gap-5"
			>
				<div className="hidden" aria-hidden="true">
					<label htmlFor={honeypotFieldName}>Leave this field empty</label>
					<input
						ref={honeypotRef}
						id={honeypotFieldName}
						name={honeypotFieldName}
						type="text"
						tabIndex={-1}
						autoComplete="off"
						defaultValue=""
					/>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					<form.Field name="firstName">
						{(field) => (
							<div>
								<Label htmlFor={field.name}>First name</Label>
								<Input
									id={field.name}
									name={field.name}
									className={inputClassName}
									aria-invalid={isInvalid(field.state.meta)}
									placeholder="Ali"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<FieldError meta={field.state.meta} />
							</div>
						)}
					</form.Field>
					<form.Field name="lastName">
						{(field) => (
							<div>
								<Label htmlFor={field.name}>Last name</Label>
								<Input
									id={field.name}
									name={field.name}
									className={inputClassName}
									aria-invalid={isInvalid(field.state.meta)}
									placeholder="Hassan"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<FieldError meta={field.state.meta} />
							</div>
						)}
					</form.Field>
				</div>

				<form.Field name="email">
					{(field) => (
						<div>
							<Label htmlFor={field.name}>Work email</Label>
							<Input
								id={field.name}
								name={field.name}
								type="email"
								className={inputClassName}
								aria-invalid={isInvalid(field.state.meta)}
								placeholder="ali@company.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldError meta={field.state.meta} />
						</div>
					)}
				</form.Field>

				<form.Field name="company">
					{(field) => (
						<div>
							<Label htmlFor={field.name}>Company</Label>
							<Input
								id={field.name}
								name={field.name}
								className={inputClassName}
								aria-invalid={isInvalid(field.state.meta)}
								placeholder="Your organization"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldError meta={field.state.meta} />
						</div>
					)}
				</form.Field>

				<form.Field name="serviceInterest">
					{(field) => (
						<div>
							<Label htmlFor={field.name}>What are you looking for?</Label>
							<Select
								value={field.state.value}
								onValueChange={(value) => {
									field.handleChange(value)
									field.handleBlur()
								}}
							>
								<SelectTrigger
									id={field.name}
									className={selectTriggerClassName}
									aria-invalid={isInvalid(field.state.meta)}
								>
									<SelectValue placeholder="Select a service..." />
								</SelectTrigger>
								<SelectContent>
									{serviceChoices.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FieldError meta={field.state.meta} />
						</div>
					)}
				</form.Field>

				<form.Field name="message">
					{(field) => (
						<div>
							<Label htmlFor={field.name}>Tell us about your project</Label>
							<Textarea
								id={field.name}
								name={field.name}
								rows={5}
								className={textareaClassName}
								aria-invalid={isInvalid(field.state.meta)}
								placeholder="What are you building? What's the timeline? What have you tried so far?"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldError meta={field.state.meta} />
						</div>
					)}
				</form.Field>

				{submitFailed ? (
					<p className="text-sm text-destructive">{copy.errorBody}</p>
				) : null}

				<form.Subscribe selector={(state) => state.isSubmitting}>
					{(isSubmitting) => (
						<Button
							type="submit"
							disabled={isSubmitting}
							className="self-start"
							variant="brand"
							size="brand"
						>
							{isSubmitting ? 'Sending…' : 'Send message'}
							<ArrowRight size={16} />
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	)
}
