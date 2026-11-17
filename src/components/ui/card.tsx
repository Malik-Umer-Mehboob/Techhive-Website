import * as React from 'react'

import { cn } from '#/lib/utils.ts'

/**
 * The brand surface card: white fill, hairline border, large brand radius.
 * The shared base for the service / portfolio / client / why / industry cards.
 * Padding and per-card hover mechanics (lift, shadow, the orange reveal bar)
 * are composed at the call site so each card keeps its distinct behavior while
 * sharing one surface definition. Renders an `<article>` by default; pass
 * `asChild`-style elements via the `className`/element you need.
 */
function Card({ className, ...props }: React.ComponentProps<'article'>) {
	return (
		<article
			data-slot="card"
			className={cn(
				'rounded-brand-lg border border-hairline bg-white',
				className,
			)}
			{...props}
		/>
	)
}

export { Card }
