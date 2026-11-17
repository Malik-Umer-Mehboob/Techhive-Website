# TechHive Website

The marketing site for TechHive Solutions, a software/AI services agency (Lahore + US). Brochure content plus one runtime surface: the contact form.

## Language

**Service**:
One of the agency's offerings, shown as a card on Home, Services, and the footer, and selectable in the contact form. The canonical list of seven, in priority order: AI Integration, Odoo ERP, Web Portals & Apps, Mobile Applications, eLearning & LMS, Offshoring.
_Avoid_: offering, product (a Product is in-house software, not a Service).

**AI Integration**:
The flagship Service, embedding Anthropic Claude into client applications (document automation, NL interfaces, intelligent workflows). Backed by the Claude Partner Network membership, not by a shipped case study yet.
_Avoid_: AI, ML, "Claude services".

**Odoo ERP**:
A Service (certified Odoo Partner work). Kept as a credential and case-study proof, but demoted from primary offering, it is no longer what the brand leads with.
_Avoid_: ERP Solutions (the old primary-offering label, retired).

**Product**:
In-house software TechHive owns and operates, not client work. The two are TutorBees (eLearning/tutoring) and Talent.
_Avoid_: app, platform (used loosely in copy).

**Odoo App**:
Owned software TechHive publishes and _sells on the Odoo App Store_ (apps.odoo.com), shown on the `/odoo-apps` page. Distinct from a **Product** (owned software TechHive _operates_, e.g. TutorBees) and from **Odoo ERP** (the Service, client implementation work). The catalogue, in priority order: MCP Server for AI Agents (the flagship, connects AI assistants to Odoo over MCP), Financial Year Switcher (a top-bar fiscal year switcher that hides records outside the selected years), Documents Folder Upload. The website is a showcase, not a store: each Odoo App's card hands off to its Odoo App Store listing (the canonical product and checkout page); we do not duplicate the listing or add per-app pages.
_Avoid_: Product (that's operated, not sold-as-module), Service (that's client work), Case Study, module (fine in body copy, but the domain noun is "Odoo App").

**Case Study**:
A delivered client project featured on the Portfolio page (e.g. MHPSS Pakistan, Hameed Automation). TutorBees appears as a Case Study despite being a Product ("our own"). The set is fixed editorial content.
_Avoid_: project, work, portfolio item.

**Lead**:
A contact-form submission, name, work email, company, service interest, message. Emailed to the team AND persisted to the database.
_Avoid_: contact, enquiry, message (the free-text field is the "message"; the whole record is a Lead).

**Claude Partner Network**:
TechHive's registered membership in Anthropic's partner programme. The lead credibility anchor for AI Integration.

**Case study detail page**:
The page at `/portfolio/<slug>` that tells a long-form Case Study's full story: the intro, its titled sections, any outcomes and "The result". A Case Study gets one when it has titled sections (`detail.sections`); /portfolio then shows only its excerpt and a "Read the case study" button, and its `#<slug>` anchor on /portfolio keeps working. The content stays on the Case Study entry and the page is derived from it by slug (docs/adr/0001); the detail pages are prerendered from `CASE_STUDIES`. Unknown slugs, and Case Studies without sections, are a 404.
_Avoid_: Project page, a separate page-content module for case studies.

**Client**:
An organization TechHive has delivered for, shown as a name + logo (+ optional one-line descriptor) in the credibility strip ("More clients we've delivered for") on the Portfolio page. Lighter than a Case Study, no narrative, outcomes or live link. The fixed set is delivered-for orgs that do _not_ get full Case Study treatment: World Health Organization, MedAce (Getz Pharma), Hameed Automation.
_Avoid_: Case Study (the detailed, narrated form), Lead (a prospect's contact-form submission, not a delivered client).

## Relationships

- A **Service** appears on Home, Services, footer, and as a contact-form dropdown option; all four are single-sourced from one `Service[]`.
- The contact dropdown = the seven **Services** + a "Something else" option.
- A **Lead** carries a service interest that references one **Service** (or "Something else").
- A **Case Study** demonstrates one or more **Services**; a **Product** may also appear as a **Case Study**.
- A **Client** is a delivered-for org shown on Portfolio _without_ full Case Study treatment, the "More clients" strip is distinct from the Case Study set, not a superset of it.
- An **Odoo App** lives on its own `/odoo-apps` page (in nav + footer), single-sourced from one `OdooApp[]`. It is not a Service, Product or Case Study. The About page's Odoo credential section (`#partners`) cross-links to it, published modules are proof of the same Odoo Partner depth.
- An **Odoo App** may also serve as shipped proof for a **Service**: a Service's detail names it by slug (`ServiceDetail.odooApp`) and the Services page deep-links to its card (`/odoo-apps#<slug>`). It is still an Odoo App, not a Case Study. First use: **AI Integration** -> MCP Server for AI Agents.

## Example dialogue

> **Dev:** "The contact dropdown, is that its own list?"
> **Domain expert:** "No. It's the seven **Services** plus 'Something else'. One source. If we add a Service, the dropdown gets it for free."
> **Dev:** "And Odoo, still a Service, or just history?"
> **Domain expert:** "Still a Service, still a card. Just not the flagship anymore, **AI Integration** leads. Keep the Odoo partner badge; it's proof."

## Decisions

- **AI-first positioning.** AI Integration is the flagship Service even though there is no shipped AI **Case Study** yet, credibility rests on the **Claude Partner Network** membership. **Odoo ERP** was demoted from primary offering but kept as a Service, a partner credential, and case-study proof. Reversing means a content-wide rewrite, so it is recorded here deliberately.
- **Odoo App is a new noun, not a Product.** When TechHive began publishing modules on the Odoo App Store (first: Documents Folder Upload), we minted a new domain concept "Odoo App" rather than folding it into Product. Reasons: Product means owned software TechHive _operates_ (TutorBees/Talent), a $35 marketplace module sold to third parties is a different thing; and it is not client work (not a Case Study) nor a Service. It gets a dedicated `/odoo-apps` route (nav + footer), a flat directory that hands off to the store rather than per-app pages, because the store listing is the canonical product/checkout surface. The concept is list-shaped from day one to hold the growing catalogue. Decided 2026-07-08.
- **Odoo Apps can back a Service.** MCP Server for AI Agents is the first shipped TechHive software that connects Claude to a business system, so it backs **AI Integration** (which has no AI **Case Study** yet) via a slug cross-link from the Services page, rather than being promoted to a Case Study or repeated across Home/About. The link is a slug reference, not a freeform URL, so it can't drift (docs/adr/0001). Decided 2026-09-28.
- **Content in git, DB only for Leads.** Page content is hardcoded typed TS modules (no CMS, no content DB) because it changes only on deploy and has no editor persona. The database exists solely to persist **Leads**, and uses libSQL/Turso (not local `better-sqlite3`) so lead data survives on any host, including serverless. Pages are prerendered (SSG); the only per-request code is the contact-form server function.

## Flagged ambiguities

- **"ERP Solutions" as primary offering**, retired. Odoo ERP remains a **Service** and a credential, but **AI Integration** is now the flagship. Resolved 2026-06-18.
- **Contact dropdown vs Service list**, previously diverged (dropdown listed "AI Integration" the cards didn't). Resolved: single canonical `Service[]`; dropdown derives from it.
- **TutorBees**, both a **Product** and a **Case Study**. Intentional: it's owned software shown as proof of capability.
- **"Industries" vs "Sectors"**, canonical word is **Industries** (the About page sectors-served list). "Sectors" retired in copy. General business term, so a wording note here rather than a glossary entry. Resolved 2026-06-18.
