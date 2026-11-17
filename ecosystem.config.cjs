// PM2 process definition for the production site.
//
// The build (`npm run build`) emits a self-contained Nitro node-server at
// .output/server/index.mjs. PM2 runs that entry directly. Secrets
// (DATABASE_URL, DATABASE_AUTH_TOKEN, RESEND_API_KEY) are NOT set here.
// Keep them in a gitignored `.env` at the repo root, loaded into the process
// by Node's `--env-file` (see `node_args` below). The Nitro production server
// does NOT read `.env` on its own (dotenv only runs in dev), so without this
// the libSQL client silently falls back to `file:local.db` and Lead writes
// fail at request time. See README "Deploy with Nitro".
//
// Named .cjs because package.json sets "type": "module"; PM2 ecosystem
// files use CommonJS module.exports.
//
//   pnpm install --frozen-lockfile
//   npm run build
//   pm2 start ecosystem.config.cjs
//   pm2 save        # persist across reboots (after `pm2 startup`)

module.exports = {
	apps: [
		{
			name: 'techhive-website',
			script: '.output/server/index.mjs',
			// Load the gitignored `.env` (resolved against `cwd`) into the
			// process so DATABASE_URL/DATABASE_AUTH_TOKEN/RESEND_API_KEY reach the
			// server. Requires Node 20.6+.
			node_args: '--env-file=.env',
			cwd: __dirname,
			exec_mode: 'fork',
			instances: 1,
			env: {
				NODE_ENV: 'production',
				HOST: '127.0.0.1',
				PORT: 5000,
			},
			autorestart: true,
			max_restarts: 10,
			min_uptime: '10s',
			max_memory_restart: '512M',
			time: true,
		},
	],
}
