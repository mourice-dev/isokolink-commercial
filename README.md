# IsokoLink Rwanda

IsokoLink is organized as two separately deployable applications:

- `frontend/`: React + Vite client
- `backend/`: Express API + PostgreSQL persistence

## Local development

1. Install the root frontend toolchain: `npm install`
2. Start the API: `npm run dev:api`
3. In another terminal, start the frontend: `npm run dev`

The Vite dev server proxies `/api` to `http://localhost:3001`. The API reads `backend/.env`. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL`. The local `.env` file is ignored by Git.

## Separate deployment

Each folder has its own package manifest, so install dependencies from `frontend/` and `backend/` independently when deploying. Deploy `frontend/` as a static Vite site and `backend/` as a Node service. Set `VITE_API_BASE_URL` at frontend build time to the API origin, such as `https://api.example.com` (without a trailing slash). On the backend, set `DATABASE_URL`, `API_PORT` if required by the host, and `FRONTEND_ORIGIN` to the exact frontend origin. Multiple allowed origins can be comma-separated.

The backend creates its tables on startup and inserts the initial marketplace listings when the products table is empty. PostgreSQL TLS is enabled by the supplied Neon connection URL's `sslmode=require` parameter.

## Community

The community feed is available at `/community`. Visitors can browse posts, while signed-in users can publish posts, react, comment, and keep direct-message history with the listed community contacts. Community activity is persisted in PostgreSQL; the client keeps a local copy so the feed remains usable when the API is temporarily unavailable.

## Accounts and dashboards

Register at `/register/farmer` or `/register/buyer`, then sign in at `/login`. The API hashes passwords with bcrypt and stores login sessions in PostgreSQL. Set a long random `SESSION_SECRET` in `backend/.env`; production also requires `NODE_ENV=production` and the exact `FRONTEND_ORIGIN` allowlist. Farmer and buyer dashboards and their data APIs enforce the account role on the server.

## Build

Run `npm run build` from the repository root. The production bundle is written to `dist/`.
