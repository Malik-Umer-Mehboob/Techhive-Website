/**
 * Tag kinds for Case Study tags. Each tag maps to one kind here, and the kind
 * picks the tag's style in `TagBadge`, so the home grid, /portfolio and the
 * case study pages always style a tag the same way.
 */
export type TagKind = 'odoo' | 'technology' | 'industry' | 'partner' | 'own'

export const TAG_KINDS = {
	'Odoo ERP': 'odoo',
	'SaaS Product': 'technology',
	'Multi-Company': 'technology',
	Integrations: 'technology',
	Costing: 'technology',
	'Digital Health': 'industry',
	Government: 'industry',
	eLearning: 'industry',
	Agriculture: 'industry',
	Manufacturing: 'industry',
	'Real Estate': 'industry',
	UNICEF: 'partner',
	'Our own': 'own',
} as const satisfies Record<string, TagKind>

/**
 * Every tag a Case Study may use. `CaseStudy.tags` is `Array<Tag>`, so a tag
 * missing from `TAG_KINDS` is a compile error rather than an unstyled pill.
 */
export type Tag = keyof typeof TAG_KINDS
