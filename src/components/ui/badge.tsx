import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '#/lib/utils.ts'

/** Shared shape of every tag pill; each tag variant only sets its colours. */
const tagPill =
	'rounded-full border-transparent px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] uppercase'

const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground',
				secondary: 'border-transparent bg-secondary text-secondary-foreground',
				destructive: 'border-transparent bg-destructive text-white',
				outline: 'text-foreground',
				// -- Brand tag: orange pill used for service tags (legacy .tag). --
				tag: `${tagPill} bg-orange-pale text-orange`,
				// -- Case Study tag kinds (content/tags.ts), via TagBadge. --
				tagOdoo: `${tagPill} bg-tag-odoo-pale text-tag-odoo`,
				tagTechnology: `${tagPill} bg-tag-technology-pale text-tag-technology`,
				tagIndustry: `${tagPill} bg-tag-industry-pale text-tag-industry`,
				tagPartner: `${tagPill} bg-wash text-tag-partner`,
				tagOwn: `${tagPill} bg-orange-pale text-tag-own`,
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Badge({
	className,
	variant = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : 'span'

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
