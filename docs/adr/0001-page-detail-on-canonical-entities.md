# Page-specific detail lives on the canonical content entities

The Services and Portfolio pages need richer per-item content than the cross-cutting
entities carry - the Services page wants a marketing headline, body and labelled
bullet list per Service; the Portfolio page wants outcome points and media per Case
Study. We attach this as a page-scoped nested object (`Service.detail`,
`CaseStudy.detail`/equivalent) **on the existing canonical entity** rather than in a
separate page-content module keyed by slug. The nested object is **required** on
each entity (its inner fields may be optional) so the type enforces that every
Service/Case Study the grid shows can also render its full page section - no silent
desync.

**Why:** `SERVICES[]` (and `CASE_STUDIES[]`) exist specifically to be the single
source of truth - the Home grid, footer and contact dropdown all derive from
`SERVICES[]` so no parallel list can drift. A separate page module keyed by slug
would reintroduce exactly that drift risk (a Service with no section, or a section
for a slug that no longer exists). Co-locating makes slug-alignment automatic and
impossible to desync. The cost - a longer canonical module file - is acceptable for
~7 Services and a fixed set of Case Studies.

**Considered and rejected:** a separate `services-page.ts` / `portfolio.ts` keyed by
slug. Cleaner separation of "identity" from "presentation", but it brings back the
parallel-list drift the single-source design was built to prevent.
