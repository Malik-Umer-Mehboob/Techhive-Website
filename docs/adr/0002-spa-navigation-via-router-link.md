# Internal navigation uses router `<Link>` (SPA), not plain `<a>`

All internal navigation moves to TanStack Router `<Link>` for client-side SPA
transitions, replacing the plain `<a href>` tags the initial Home page + shell
shipped with (#2). The router already has `scrollRestoration: true` enabled; this
makes use of it.

**Why:** snappier in-app transitions and proper scroll restoration across the
marketing pages, rather than a full document reload on every nav click.

**Consequences:**

- **Retrofit of already-shipped code.** The shell (`site-header`, `site-footer`,
  logo) and the Home components (`services-section` "Learn more", CTAs) currently
  use plain `<a>` and must be converted. This expands the content-pages work into
  code merged under #2.
- **External links stay `<a>`.** Case Study `liveUrl`s (mhpss.pk, tutorbees.net,
  …) and any off-site link keep plain `<a target="_blank" rel="...">`. `<Link>` is
  for internal routes only.
- **Deep-link hashes go through the router.** `serviceHref`/`caseStudyHref` (today
  returning `/services#slug` strings) feed `<Link to hash>`; hash scrolling is
  handled by the router on client-side nav and natively on first load.
- **Fixed-header offset still required.** Regardless of Link vs `<a>`, the
  `position: fixed` header overlaps the scrolled-to anchor, so anchored sections on
  Services/Portfolio still need `scroll-margin-top` ≈ header height. SPA navigation
  does not remove this.
- **Active state.** Header active-link styling can move from the manual
  `isActive(pathname, href)` check to `<Link>` active props, or keep the manual
  check, either works.

**Considered and rejected:** keep plain `<a>` (MPA-style full reloads). Simpler and
makes native hash-scroll free, but forgoes SPA transitions and the already-enabled
`scrollRestoration`, and was rejected in favour of the snappier experience.
