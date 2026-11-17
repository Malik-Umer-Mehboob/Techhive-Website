# TechHive Design System

The source of truth for how the marketing site is styled. The visual language
(clean white, deep navy, orange accent; Inter body + Sora display) is unchanged
from the original reference design; this document describes the **mechanism**:
design tokens in CSS, everything else as **shadcn primitives + Tailwind
utilities**. No component styling lives in `.css` files.

## Where things live

| Concern                                       | Location                                                   |
| --------------------------------------------- | ---------------------------------------------------------- |
| Design tokens (colors, radii, shadows, fonts) | `src/styles.css` (`:root` + `@theme inline`)               |
| Base reset + reduced-motion                   | `src/styles.css`                                           |
| Reusable primitives                           | `src/components/ui/*`, `src/components/site/page-hero.tsx` |
| `cn()` class merge helper                     | `src/lib/utils.ts`                                         |
| shadcn config                                 | `components.json`                                          |

## Tokens

All brand values are defined once as hex in the `:root` block of
`src/styles.css`, then registered as Tailwind utilities in `@theme inline`.
**To retheme, edit the hex in `:root` and every utility + primitive follows.**

### Colors (utility prefix `bg-` / `text-` / `border-`)

| Utility       | `:root` var     | Value     | Use                                       |
| ------------- | --------------- | --------- | ----------------------------------------- |
| `navy`        | `--navy`        | `#0a1628` | hero / footer / CTA backgrounds, headings |
| `navy-mid`    | `--navy-mid`    | `#112040` | deeper navy fills                         |
| `navy-light`  | `--navy-light`  | `#1a3054` | navy hover / accents                      |
| `orange`      | `--orange`      | `#ff6b2b` | primary accent, CTAs, links               |
| `orange-dim`  | `--orange-dim`  | `#e55a1c` | orange hover                              |
| `orange-pale` | `--orange-pale` | `#fff0e8` | tinted icon/tag backgrounds               |
| `off-white`   | `--off-white`   | `#f8f9fb` | alternating section bands, visuals        |
| `ink`         | `--text`        | `#1a2232` | body text                                 |
| `ink-muted`   | `--text-muted`  | `#5c6575` | secondary text                            |
| `hairline`    | `--gray-200`    | `#e2e6ed` | default 1px borders                       |
| `wash`        | `--gray-100`    | `#f1f3f6` | subtle fills / nav hover                  |
| `faint`       | `--gray-400`    | `#9aa3b0` | de-emphasized labels                      |

shadcn's own semantic tokens (`primary`, `secondary`, `muted`, `accent`,
`border`, `ring`, `destructive`, ...) remain zinc-based and untouched; they back
the form primitives (`Input`, `Select`, `Textarea`, default `Button`). The brand
utilities above coexist with them.

### Radii (`rounded-brand-*`)

`sm` 6px - `md` 12px - `lg` 20px - `xl` 32px. (shadcn primitives use their own
`--radius` scale via `rounded-shadcn-*`.)

### Shadows (`shadow-brand-*`)

`sm` / `md` / `lg` - the soft layered elevation used by cards on hover.

### Fonts

`font-sans` = Inter (body) - `font-display` = Sora (headings, stats, nav logo).

### Layout vars (arbitrary use)

`var(--max-w)` = 1160px content cap - `var(--pad)` = responsive gutter
`clamp(1.25rem, 5vw, 3rem)` - `var(--header-h)` = 68px fixed-header height.

## Primitives

Import via the `#/components/...` alias.

### Layout

```tsx
import { Container } from '#/components/ui/container'
import {
	Section,
	SectionEyebrow,
	SectionTitle,
	SectionLead,
} from '#/components/ui/section'
;<Section tone="wash" id="industries">
	{' '}
	{/* tone="wash" => off-white band; id => anchor (scroll offset baked in) */}
	<Container>
		<SectionEyebrow centered>What we build</SectionEyebrow>
		<SectionTitle>Services that move the needle</SectionTitle>
		<SectionLead>Supporting copy.</SectionLead>
	</Container>
</Section>
```

- `Section` - vertical rhythm `clamp(4rem, 8vw, 7rem)`; `tone="wash"` paints
  `off-white`; always carries a `scroll-mt` offset so any `id` anchor clears the
  fixed header (replaces the old `.anchor-offset`).
- `SectionEyebrow` - orange uppercase kicker with the 20x2px leading bar;
  `centered` for centered headers.
- `SectionTitle` - the display `h2`. `SectionLead` - supporting paragraph.

### Button

`src/components/ui/button.tsx` extends the shadcn cva with brand variants. The
original shadcn variants (`default`, `outline`, `ghost`, ...) are unchanged.

| `variant`      | was                | look                                         |
| -------------- | ------------------ | -------------------------------------------- |
| `brand`        | `.btn-primary`     | orange fill, white text, hover darken + lift |
| `brandOutline` | `.btn-outline`     | transparent, navy text, hairline border      |
| `white`        | `.btn-white`       | white fill, navy text                        |
| `ghostWhite`   | `.btn-ghost-white` | transparent on dark, translucent border      |

Pair brand variants with `size="brand"` (the legacy `.btn` footprint; the arrow
nudge-on-hover is built in). Wrap a router link with `asChild`:

```tsx
<Button asChild variant="brand" size="brand">
	<Link to="/contact">
		Get in touch <ArrowRight className="size-4" />
	</Link>
</Button>
```

### Badge

`<Badge variant="tag">` - the orange-pale uppercase pill used for service tags.

Case Study tags use `<TagBadge tag="..." />` (`components/portfolio/tag-badge.tsx`),
never a raw `Badge`. Each tag maps to a kind in `content/tags.ts` (`TAG_KINDS`),
and the kind picks the variant:

| Kind       | Variant         | Text on background                        | Contrast |
| ---------- | --------------- | ----------------------------------------- | -------- |
| odoo       | `tagOdoo`       | `tag-odoo` on `tag-odoo-pale`             | 6.3:1    |
| technology | `tagTechnology` | `tag-technology` on `tag-technology-pale` | 6.1:1    |
| industry   | `tagIndustry`   | `tag-industry` on `tag-industry-pale`     | 5.4:1    |
| partner    | `tagPartner`    | `tag-partner` on `wash`                   | 9.3:1    |
| own        | `tagOwn`        | `tag-own` on `orange-pale`                | 5.2:1    |

All tag variants share one pill shape (`tagPill` in `badge.tsx`). A new tag needs
a `TAG_KINDS` entry (a missing one is a compile error); a new kind needs tokens in
`styles.css`, a `Badge` variant, and a WCAG AA contrast check.

### Card

`<Card>` - the brand surface (white, hairline border, `rounded-brand-lg`); the
shared base for service / portfolio / client cards. Padding and per-card hover
behavior (lift, `shadow-brand-md`, the orange reveal bar) are composed at the
call site so each card keeps its distinct motion.

### PageHero

`src/components/site/page-hero.tsx` - the navy hero band atop inner pages
(Services, Portfolio, About, Contact), including the white elliptical sweep.

```tsx
<PageHero eyebrow="Case studies" title="Real projects. Real results.">
	Supporting copy.
</PageHero>
```

## Conventions

- Compose classes through `cn()` so call-site overrides win via `tailwind-merge`.
- Lucide icons stroke with `currentColor`: set color with `text-orange` etc.,
  size with `size-4` (16px) / `size-5` (20px) / `size-6` (24px).
- Test hooks use `data-slot="..."` (not presentation classes), so styling can
  change without breaking unit tests.
- Reduced motion is respected globally (`prefers-reduced-motion` in `styles.css`).

## Adding a component

1. Reach for an existing primitive first (`Section`, `Card`, `Button`, `Badge`).
2. Style with the brand utilities above; only drop to arbitrary values
   (`bg-[rgba(...)]`) for one-off alpha tints not in the palette.
3. Never add component rules to `styles.css` - keep it tokens + base only.
