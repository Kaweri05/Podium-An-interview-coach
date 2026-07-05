# Podium — AI Mock Interview Coach (with backend)

A free, self-hosted mock interview practice app. Everything runs on your
own machine — no paid services, no cloud database.

## Stack
- **Frontend**: plain HTML/CSS/JS (`/public`) — camera, mic, speech
  recognition, and all the scoring heuristics run in the browser.
- **Backend**: Express (`server.js`) — a small REST API for accounts and
  interview history.
- **Database**: SQLite via Node's **built-in** `node:sqlite` module — a
  single file (`podium.db`) created automatically the first time you run
  the server. No database server to install, no native modules to
  compile, no account to create, nothing to pay for.

> **Requires Node.js 22.5 or newer** (check with `node -v`). That's the
> version `node:sqlite` was added in. If you're on an older Node, either
> upgrade (recommended — nodejs.org) or ask me to swap in `better-sqlite3`
> instead, which works on older Node versions but needs build tools
> during `npm install`.

## Setup

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser (Chrome or Edge
recommended, for full speech-recognition support).

That's it — `podium.db` is created next to `server.js` on first run.

## Why localhost works for the camera

Browsers block camera/mic access on plain `file://` pages, but they trust
`http://localhost`, so running it through this server (instead of
double-clicking the HTML file) fixes that automatically.

## How accounts & data work right now
- Passwords are hashed with bcrypt before being stored — never saved in
  plain text.
- Logging in gives your browser a random token (kept in `localStorage`),
  which is sent back on each request so the server knows who you are.
- Interview sessions are stored per-account in SQLite, so your history
  now persists across devices/browsers as long as you log into the same
  account — unlike the old `localStorage`-only version.

## Deploying this for free
Any of these have a free tier that works well for a small SQLite app:
- **Render.com** (free web service tier)
- **Railway.app**
- **Fly.io**

Just make sure the platform gives you **persistent disk storage** for
`podium.db` — some free tiers wipe the filesystem on redeploy, which
would reset everyone's accounts. If that happens, look into the
platform's "persistent volume" or "disk" option, or switch to a small
managed free Postgres (e.g. Supabase's free tier) down the line when you
add more features.

## Where to go next (you mentioned expanding later)
- Swap the token auth for real JWTs with expiry.
- Add password reset.
- Move from SQLite to Postgres if you outgrow a single file / need
  multiple server instances.
- Add rate limiting on `/api/signup` and `/api/login`.
