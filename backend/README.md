# Backend

Node.js 20+ and PostgreSQL service for IsokoLink. Start with `npm start` after setting `DATABASE_URL` and a long random `SESSION_SECRET`; `npm run dev` restarts on file changes. In production, set `NODE_ENV=production` and `FRONTEND_ORIGIN` to the exact browser origin(s). The API creates its schema and PostgreSQL session table at startup/use.

For local development from the repository root, copy `.env.example` to `.env` in this folder and run `npm run dev:api` at the root. Never commit `.env`.
