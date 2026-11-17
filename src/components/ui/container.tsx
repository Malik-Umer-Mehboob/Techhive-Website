import * as React from 'react'

import { cn } from '#/lib/utils.ts'

/**
 * The site's horizontal frame: centered, capped at the brand max width
 * (`--max-w`) with the responsive gutter (`--pad`). Replaces the legacy
 * `.container` class. Renders a `<div>` by default.
 */
function Container({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="container"
			className={cn('mx-auto w-full max-w-(--max-w) px-(--pad)', className)}
			{...props}
		/>
	)
}

export { Container }
