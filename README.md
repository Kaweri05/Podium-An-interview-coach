# Podium — AI-Style Mock Interview Coach

A free, self-hosted mock interview practice app. Practice on camera, get
heuristic confidence scoring (fluency, pace, voice, composure, content),
and track your progress over time — no paid services required.

---

## Features

- Camera + mic mock interviews with live speech-to-text
- Confidence scoring from real signals: filler words, speaking pace,
  voice steadiness, on-camera stillness, answer length
- Role-specific technical questions (12 tracks) + HR/behavioural rounds
- Company-style rounds: Amazon Leadership Principles, Startup culture-fit
- Resume-based personalized questions (paste your resume, get tailored
  questions about your actual projects/skills)
- Sample answers for every question, for students new to interviewing
- Dashboard: confidence trend, streaks, badges, weakest-skill spotlight
- Opt-in peer leaderboard
- Dark/light theme
- Accounts + interview history stored in a real backend (Express + SQLite)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Plain HTML / CSS / JS (`public/`) |
| Backend | Express (`server.js`) |
| Database | `node:sqlite` — Node's built-in SQLite module |
| Auth | bcrypt password hashing + random session tokens |

No paid APIs, no external database service, no native modules to compile.

---

## Project Structure

See **`structure.txt`** for the full annotated file tree.

```
Podium/
├── server.js
├── package.json
├── node.txt
├── structure.txt
├── README.md
├── Dockerfile
├── .dockerignore
├── .gitignore
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

---

## Requirements

See **`node.txt`** for full details. Short version: **Node.js 22.5.0 or
newer** (check with `node -v`), because the backend uses Node's built-in
`node:sqlite` module.

---

## Local Setup

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

`podium.db` is created automatically next to `server.js` on first run —
no manual database setup.

> Camera/mic access requires `http://localhost` or `https://` — it will
> not work if you just double-click `index.html` directly.

---

## Flow Diagrams

### 1. System Architecture

```mermaid
flowchart LR
    subgraph Browser
        A["index.html + style.css"]
        B["app.js — camera, mic,
scoring heuristics"]
    end
    subgraph Server["server.js (Express)"]
        C["/api/signup
/api/login"]
        D["/api/sessions"]
        E["/api/leaderboard"]
    end
    F[("podium.db
(node:sqlite)")]

    B -- fetch --> C
    B -- fetch --> D
    B -- fetch --> E
    C --> F
    D --> F
    E --> F
```

### 2. Authentication Flow

```mermaid
flowchart TD
    A["User enters name + passcode"] --> B{"Sign up or log in?"}
    B -- Sign up --> C["POST /api/signup"]
    B -- Log in --> D["POST /api/login"]
    C --> E{"Name already taken?"}
    E -- Yes --> F["409 error: account exists"]
    E -- No --> G["Hash password with bcrypt
Create user row, generate token"]
    D --> H{"Name + password match?"}
    H -- No --> I["401 error: no match"]
    H -- Yes --> J["Generate new token
Update user row"]
    G --> K["Return token + displayName"]
    J --> K
    K --> L["Browser saves token in localStorage"]
    L --> M["Every future request sends
Authorization: Bearer token"]
```

### 3. Interview Recording & Scoring Flow

```mermaid
flowchart TD
    A["User clicks Start answer"] --> B["Camera + mic stream captured"]
    B --> C["Web Speech API: live transcript"]
    B --> D["Web Audio API: volume samples"]
    B --> E["Canvas frame-diff: motion samples"]
    F["User clicks Stop answer"] --> G["Combine transcript + volume + motion"]
    G --> H["analyzeAnswer() heuristic scoring"]
    H --> I["Fluency, Pace, Voice,
Composure, Content scores"]
    I --> J["Overall score + tips + sample answer"]
    J --> K["Shown in feedback panel
with animated gauge"]
```

### 4. Resume-Based Question Generation Flow

```mermaid
flowchart TD
    A["User pastes resume text in setup"] --> B["extractResumeInsights()"]
    B --> C["Scan against SKILL_KEYWORDS list"]
    B --> D["Scan for project-like lines
('built', 'developed', etc.)"]
    C --> E["Matched skills e.g. React, SQL"]
    D --> F["Matched project lines"]
    E --> G["buildResumeQuestions()"]
    F --> G
    G --> H["Personalized questions appended
to the interview question set"]
```

### 5. Session Save & Comparison Flow

```mermaid
flowchart TD
    A["Interview finishes"] --> B["Compute averages: Fluency,
Pace, Voice, Composure, Content"]
    B --> C["POST /api/sessions with results"]
    C --> D["Server looks up most recent
prior session for this user"]
    D --> E{"Prior session exists?"}
    E -- No --> F["comparison = hasPrevious: false"]
    E -- Yes --> G["Compute score delta +
per-metric deltas"]
    F --> H["Insert new row into sessions table"]
    G --> H
    H --> I["Return saved session + comparison"]
    I --> J["Report screen shows score,
verdict, and vs-last-time delta"]
```

### 6. Badges / Streak / Leaderboard Flow

```mermaid
flowchart TD
    A["Dashboard loads"] --> B["GET /api/sessions"]
    B --> C["computeStreak()
consecutive practice days"]
    B --> D["renderSpotlight()
weakest metric, last 3 sessions"]
    B --> E["renderBadges()
check 8 badge conditions"]
    F["User opts in"] --> G["POST /api/leaderboard-optin"]
    G --> H["GET /api/leaderboard"]
    H --> I["Ranked list of opted-in users
by average score"]
```

### User Flow Diagram

```mermaid
flowchart TD
    A["Land on login screen"] --> B["Sign up or log in"]
    B --> C["Dashboard: stats, streak,
badges, spotlight, history"]
    C --> D["Click Start new interview"]
    D --> E["Pick role + interview type
(optionally paste resume)"]
    E --> F["Enable camera & mic"]
    F --> G["Warm-up: say your name confidently"]
    G --> H{"Confident enough?"}
    H -- Retry --> G
    H -- Yes --> I["Answer each question
with live feedback per question"]
    I --> J["Finish interview"]
    J --> K["Final report: score, verdict,
vs-last-time comparison"]
    K --> C
```

---

## Deploying to Hugging Face Spaces

Hugging Face Spaces can run this project using the **Docker** SDK, since
it needs an always-on server (not a serverless function like Vercel or
Netlify use, which don't keep a persistent filesystem for `podium.db`).

### Steps

1. Go to **huggingface.co** → **New Space**.
2. Choose:
   - **SDK: Docker**
   - Visibility: your choice (public/private)
3. Push this project's files (including the `Dockerfile`) to the Space's
   repo, the same way you'd push to GitHub:
   ```bash
   git remote add space https://huggingface.co/spaces/<your-username>/<space-name>
   git push space main
   ```
4. At the very top of the Space's `README.md`, Hugging Face requires a
   metadata block. Add this (edit the values as you like):
   ```yaml
   ---
   title: Podium AI Interview Coach
   emoji: 🎤
   colorFrom: yellow
   colorTo: pink
   sdk: docker
   app_port: 7860
   pinned: false
   ---
   ```
5. Hugging Face will build the `Dockerfile` automatically and start your
   app. It listens on port `7860` by default on Spaces — the
   `Dockerfile` already sets `ENV PORT=7860`, and `server.js` already
   reads `process.env.PORT`, so no code changes are needed.

### Important limitation

Free Hugging Face Spaces **do not guarantee persistent disk storage** —
the container can restart on rebuilds or after inactivity, which resets
`podium.db` back to empty. This is fine for demoing the project, but
don't rely on it for real, permanent user accounts yet. When you're
ready to expand this project, look into:
- Hugging Face's **Persistent Storage** add-on (paid, but cheap), or
- Swapping SQLite for a hosted free database like **Supabase** (Postgres)
  or **Turso** (SQLite-compatible, but hosted) — both survive restarts.

---

## Roadmap (future features)

- Real JWT-based auth with expiry + refresh tokens
- Password reset flow
- Move from SQLite to Postgres for multi-instance / persistent hosting
- Rate limiting on `/api/signup` and `/api/login`
- Optional AI-graded answer content (via an LLM) alongside the existing
  heuristic scoring
