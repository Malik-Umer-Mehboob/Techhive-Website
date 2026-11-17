# TechHive Website

The marketing site for TechHive Solutions.
Brochure content plus one runtime surface: the contact form.

## Getting Started

To run the website:

```bash
pnpm install
npm run dev
```

Install with pnpm, at the version pinned by `engines.pnpm` in `package.json` (`npm install -g pnpm@12.4.2`). `npm install` ignores `pnpm-lock.yaml` and the security overrides in `pnpm-workspace.yaml`.

## Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
for linting and formatting.
Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint).
The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Deploy with Nitro

This project uses Nitro as a generic server adapter (the `node-server` preset),
so it can run on any Node-compatible host.
The build prerenders the pages to static HTML and bundles the contact-form server function
into the same Node server.

```bash
pnpm install --frozen-lockfile
npm run build
node .output/server/index.mjs
```

The build output is a self-contained Node server. To deploy, push the build output to your host (Render, Fly.io, Railway, your own VPS, etc.) and run the server command above. The contact form needs the database and email secrets below set as **platform environment variables**, `.env` is for local dev only and is gitignored.

For host-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda, etc.) and tuning, see <https://v3.nitro.build/deploy>.

### Run with PM2

On a long-running VPS, keep the server alive across crashes and reboots with [PM2](https://pm2.keymetrics.io/). The repo ships an `ecosystem.config.cjs` that runs the Nitro server entry as a single forked process bound to `127.0.0.1:3000` (front it with a reverse proxy such as nginx or Caddy; set `HOST` to `0.0.0.0` in the config to expose it directly).

```bash
pnpm install --frozen-lockfile   # install the locked dependencies; the build uses what is installed
npm run build                    # produces .output/ (gitignored - build on the server)
pm2 start ecosystem.config.cjs
pm2 save                         # persist the process list
pm2 startup                      # then run the printed command once, to start PM2 on boot
```

Secrets are **not** in the ecosystem file. Provide `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, and `RESEND_API_KEY` through the server's environment before `pm2 start` (see below). Useful commands: `pm2 logs techhive-website`, `pm2 restart techhive-website`, `pm2 reload techhive-website` (zero-downtime), `pm2 status`.

To redeploy, run `git pull --ff-only`, `pnpm install --frozen-lockfile`, `npm run build`, then `pm2 reload techhive-website`. Skipping the install builds against the old dependencies, so dependency updates, including security fixes, never reach production.

### Environment / secrets

Copy `.env.example` to `.env` for local dev and set the same keys as platform env vars in production. **Never commit `.env`.**

| Variable              | Local dev                                   | Production                                                                                                                                            |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`        | leave unset → falls back to `file:local.db` | the Turso database URL, `libsql://<db>-<org>.turso.io`                                                                                                |
| `DATABASE_AUTH_TOKEN` | leave unset                                 | the Turso **database** auth token (`turso db tokens create <db>`), _not_ the platform API token (`turso auth token`), which the DB connection rejects |
| `RESEND_API_KEY`      | optional (unset → no email sent)            | the Resend API key for Lead notifications                                                                                                             |

The same libSQL client serves both environments; only `DATABASE_URL` changes the target,
so Leads persist durably in Turso across redeploys and host changes (including serverless/edge).

### Database (Turso)

The `leads` table is the only table; page content lives in typed TS modules, not the DB.
Provisioning a Turso database and creating its auth token are one-time human steps:

```bash
turso db create techhive-leads        # provision (once)
turso db show techhive-leads --url    # → DATABASE_URL
turso db tokens create techhive-leads # → DATABASE_AUTH_TOKEN
```

Apply the schema migrations to the target database (reads `DATABASE_URL` / `DATABASE_AUTH_TOKEN` from `.env`):

```bash
npm run db:migrate
```

Run this against the Turso database once before the first deploy, and again whenever a new migration is added under `drizzle/`.

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing.
Routes are managed as files in `src/routes`.
