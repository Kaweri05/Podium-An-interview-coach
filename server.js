/**
 * Podium backend — minimal, free-to-run server.
 *
 * Stack: Express (web server) + Node's BUILT-IN SQLite module (node:sqlite —
 * a single local database file, no external database service, no native
 * modules to compile, no paid tier) + bcryptjs (password hashing, pure JS).
 *
 * Requires Node.js 22.5 or newer (run `node -v` to check — node:sqlite is
 * built in from that version on, so there's nothing extra to install for
 * the database itself).
 *
 * Auth model (kept intentionally simple for now):
 *   - Signup/login return a random token.
 *   - The frontend stores that token in localStorage and sends it back
 *     as "Authorization: Bearer <token>" on every request.
 *   - The server looks the token up in the users table to identify you.
 * This is fine for a personal/college project. If you ever open this up
 * publicly, swap in proper JWTs + refresh tokens + HTTPS.
 */

const path = require("path");
const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcryptjs");
const { DatabaseSync } = require("node:sqlite");

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "podium.db");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

/* ---------------------------------------------------------
   DATABASE — one file, created automatically on first run
   --------------------------------------------------------- */
const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    token TEXT,
    leaderboard_opt_in INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date INTEGER NOT NULL,
    role TEXT NOT NULL,
    type TEXT NOT NULL,
    overall_score INTEGER NOT NULL,
    avg_fluency INTEGER NOT NULL,
    avg_pace INTEGER NOT NULL,
    avg_voice INTEGER NOT NULL,
    avg_composure INTEGER NOT NULL,
    avg_content INTEGER NOT NULL,
    used_resume INTEGER NOT NULL DEFAULT 0,
    questions_json TEXT NOT NULL,
    comparison_json TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
`);

/* ---------------------------------------------------------
   HELPERS
   --------------------------------------------------------- */
function makeToken(){
  return crypto.randomBytes(24).toString("hex");
}

function auth(req, res, next){
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if(!token) return res.status(401).json({ error: "Please log in." });
  const user = db.prepare("SELECT * FROM users WHERE token = ?").get(token);
  if(!user) return res.status(401).json({ error: "Your session has expired — please log in again." });
  req.user = user;
  next();
}

function rowToSession(row){
  return {
    id: row.id,
    date: row.date,
    role: row.role,
    type: row.type,
    overallScore: row.overall_score,
    avgFluency: row.avg_fluency,
    avgPace: row.avg_pace,
    avgVoice: row.avg_voice,
    avgComposure: row.avg_composure,
    avgContent: row.avg_content,
    usedResume: !!row.used_resume,
    questions: JSON.parse(row.questions_json || "[]"),
    comparison: JSON.parse(row.comparison_json || '{"hasPrevious":false}')
  };
}

/* ---------------------------------------------------------
   AUTH ROUTES
   --------------------------------------------------------- */
app.post("/api/signup", (req, res) => {
  const { name, pass } = req.body || {};
  if(!name || !pass) return res.status(400).json({ error: "Please enter both a name and a passcode." });
  const key = name.trim().toLowerCase();
  if(!key) return res.status(400).json({ error: "Please enter a valid name." });

  const existing = db.prepare("SELECT id FROM users WHERE name = ?").get(key);
  if(existing) return res.status(409).json({ error: "An account with this name already exists — try logging in instead." });

  const hash = bcrypt.hashSync(pass, 10);
  const token = makeToken();
  db.prepare(`
    INSERT INTO users (name, display_name, password_hash, token, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(key, name.trim(), hash, token, Date.now());

  res.json({ token, displayName: name.trim(), leaderboardOptIn: false });
});

app.post("/api/login", (req, res) => {
  const { name, pass } = req.body || {};
  if(!name || !pass) return res.status(400).json({ error: "Please enter both a name and a passcode." });
  const key = name.trim().toLowerCase();

  const user = db.prepare("SELECT * FROM users WHERE name = ?").get(key);
  if(!user || !bcrypt.compareSync(pass, user.password_hash)){
    return res.status(401).json({ error: "No account found with that name and passcode." });
  }

  const token = makeToken();
  db.prepare("UPDATE users SET token = ? WHERE id = ?").run(token, user.id);
  res.json({ token, displayName: user.display_name, leaderboardOptIn: !!user.leaderboard_opt_in });
});

app.get("/api/me", auth, (req, res) => {
  res.json({ displayName: req.user.display_name, leaderboardOptIn: !!req.user.leaderboard_opt_in });
});

/* ---------------------------------------------------------
   SESSION (interview history) ROUTES
   --------------------------------------------------------- */
app.get("/api/sessions", auth, (req, res) => {
  const rows = db.prepare("SELECT * FROM sessions WHERE user_id = ? ORDER BY date DESC").all(req.user.id);
  res.json(rows.map(rowToSession));
});

app.post("/api/sessions", auth, (req, res) => {
  const s = req.body || {};
  if(!s.role || !s.type || typeof s.overallScore !== "number"){
    return res.status(400).json({ error: "Malformed session data." });
  }

  // Compare against the most recent prior session, computed server-side
  const prior = db.prepare("SELECT * FROM sessions WHERE user_id = ? ORDER BY date DESC LIMIT 1").get(req.user.id);
  const comparison = prior ? {
    hasPrevious: true,
    prevScore: prior.overall_score,
    delta: s.overallScore - prior.overall_score,
    metricDeltas: {
      Fluency: s.avgFluency - prior.avg_fluency,
      Pace: s.avgPace - prior.avg_pace,
      Voice: s.avgVoice - prior.avg_voice,
      Composure: s.avgComposure - prior.avg_composure,
      Content: s.avgContent - prior.avg_content
    }
  } : { hasPrevious: false };

  const date = Date.now();
  const info = db.prepare(`
    INSERT INTO sessions
      (user_id, date, role, type, overall_score, avg_fluency, avg_pace, avg_voice, avg_composure, avg_content, used_resume, questions_json, comparison_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    req.user.id, date, s.role, s.type, s.overallScore,
    s.avgFluency, s.avgPace, s.avgVoice, s.avgComposure, s.avgContent,
    s.usedResume ? 1 : 0,
    JSON.stringify(s.questions || []),
    JSON.stringify(comparison)
  );

  const row = db.prepare("SELECT * FROM sessions WHERE id = ?").get(info.lastInsertRowid);
  res.json(rowToSession(row));
});

/* ---------------------------------------------------------
   LEADERBOARD (opt-in)
   --------------------------------------------------------- */
app.post("/api/leaderboard-optin", auth, (req, res) => {
  const optIn = !!(req.body && req.body.optIn);
  db.prepare("UPDATE users SET leaderboard_opt_in = ? WHERE id = ?").run(optIn ? 1 : 0, req.user.id);
  res.json({ ok: true, optIn });
});

app.get("/api/leaderboard", (req, res) => {
  const rows = db.prepare(`
    SELECT u.display_name AS name, COUNT(s.id) AS count, AVG(s.overall_score) AS avg
    FROM users u
    JOIN sessions s ON s.user_id = u.id
    WHERE u.leaderboard_opt_in = 1
    GROUP BY u.id
    ORDER BY avg DESC
  `).all();
  res.json(rows.map(r => ({ name: r.name, count: r.count, avg: Math.round(r.avg) })));
});

/* ---------------------------------------------------------
   FALLBACK: send index.html for any other route (single-page app)
   --------------------------------------------------------- */
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Podium server running at http://localhost:${PORT}`);
  console.log(`Database file: ${DB_PATH}`);
});
