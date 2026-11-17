import { Mail, MapPin, Phone, Star } from 'lucide-react'

import {
	SectionEyebrow,
	SectionLead,
	SectionTitle,
} from '#/components/ui/section'
import { contact } from '#/content'

const { intro, details, partnerNote } = contact

/** The "reach us directly" column, agency phone, email and office address. */
export function ContactInfo() {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<SectionEyebrow>{intro.label}</SectionEyebrow>
				<SectionTitle className="text-[1.8rem]">{intro.title}</SectionTitle>
				<SectionLead>{intro.body}</SectionLead>
			</div>

			<div className="flex items-start gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale text-orange">
					<Phone size={18} />
				</div>
				<div>
					<div className="text-sm font-semibold text-navy">
						{details.phone.label}
					</div>
					<a href={details.phone.href} className="text-ink-muted">
						{details.phone.value}
					</a>
				</div>
			</div>

			<div className="flex items-start gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale text-orange">
					<Mail size={18} />
				</div>
				<div>
					<div className="text-sm font-semibold text-navy">
						{details.email.label}
					</div>
					<a href={details.email.href} className="text-ink-muted">
						{details.email.value}
					</a>
				</div>
			</div>

			<div className="flex items-start gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale text-orange">
					<MapPin size={18} />
				</div>
				<div>
					<div className="text-sm font-semibold text-navy">
						{details.office.label}
					</div>
					<address className="text-ink-muted not-italic">
						{details.office.lines.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</address>
				</div>
			</div>

			<div className="rounded-xl border border-[rgba(255,107,43,.2)] bg-orange-pale p-6">
				<div className="mb-2 flex items-center gap-3">
					<div className="flex size-7 items-center justify-center rounded-md bg-orange">
						<Star size={14} fill="white" strokeWidth={0} />
					</div>
					<span className="font-bold text-orange">{partnerNote.title}</span>
				</div>
				<p className="text-sm leading-relaxed text-ink-muted">
					{partnerNote.body}
				</p>
			</div>
		</div>
	)
}
