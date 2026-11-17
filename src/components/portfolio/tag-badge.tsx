import { Badge } from '#/components/ui/badge'
import type { Tag, TagKind } from '#/content'
import { TAG_KINDS } from '#/content'

/** Badge variant for each tag kind: the one place tag styles are chosen. */
const TAG_VARIANT = {
	odoo: 'tagOdoo',
	technology: 'tagTechnology',
	industry: 'tagIndustry',
	partner: 'tagPartner',
	own: 'tagOwn',
} as const satisfies Record<TagKind, string>

/** A Case Study tag, styled by its kind (Odoo ERP in Odoo purple, etc.). */
export function TagBadge({ tag }: { tag: Tag }) {
	return <Badge variant={TAG_VARIANT[TAG_KINDS[tag]]}>{tag}</Badge>
}
