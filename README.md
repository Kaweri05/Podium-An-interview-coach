---
title: Podium AI Interview Coach
emoji: 🎤
colorFrom: yellow
colorTo: pink
sdk: docker
app_port: 7860
pinned: false
---

# 🎤 Podium — AI-Style Mock Interview Coach

**Practice interviews on camera and get instant, data-driven confidence feedback — built end-to-end with a custom scoring engine, a real backend, and zero paid services.**

![Node](https://img.shields.io/badge/node-%3E%3D22.5.0-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/backend-Express-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/database-SQLite-003B57?logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/deploy-Docker-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

**🔗 Live demo:** [huggingface.co/spaces/cleve05/Podium-An-interview-coach](https://cleve05-podium-an-interview-coach.hf.space)
**💻 Source:** [github.com/Kaweri05/Podium-An-interview-coach](https://github.com/Kaweri05/Podium-An-interview-coach)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Flow Diagrams](#architecture--flow-diagrams)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Many students freeze up in real interviews simply from lack of practice —
not lack of ability. **Podium** is a self-hosted mock interview platform
that turns any webcam into a practice partner: it asks real interview
questions, listens and watches while you answer, and scores your
delivery on the same things a real interviewer notices — filler words,
pacing, voice steadiness, on-camera composure, and answer depth.

Everything runs on a stack I designed to be genuinely free to run and
deploy: no ML API costs, no managed database bills, no paid hosting
tier required.

## Features

- 🎥 **Camera + mic mock interviews** with live browser-based speech-to-text
- 📊 **Heuristic confidence scoring** across 5 dimensions — fluency, pace,
  voice steadiness, composure, and content — computed from real signals
  (filler-word rate, words-per-minute, mic RMS volume, canvas frame-diff
  motion detection)
- 🧑‍💼 **Role-specific technical rounds** across 12 career tracks
  (Software Engineer, Data Analyst, Marketing, Finance, Mechanical/Civil/
  Electrical Engineering, and more)
- 🏢 **Company-style rounds** — Amazon Leadership Principles, Startup
  culture-fit
- 📄 **Resume-based question generation** — paste a resume, get questions
  built around the candidate's actual projects and skills
- 💡 **Sample answers** for every question, for students new to interviewing
- 📈 **Dashboard** — confidence trend over time, day-streaks, unlockable
  badges, and a "weakest skill" spotlight with targeted tips
- 🏆 **Opt-in peer leaderboard** — useful for a college placement-cell setting
- 🌗 **Dark/light theme**
- 🔐 **Real backend** — accounts and interview history persisted in SQLite,
  not just `localStorage`

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Vanilla HTML / CSS / JS | No build step, fully transparent, fast to iterate on |
| Backend | Express (Node.js) | Minimal, well-understood REST API layer |
| Database | `node:sqlite` (Node's built-in SQLite) | Zero extra dependencies, zero native compilation, zero cost |
| Auth | bcrypt password hashing + token sessions | Simple, secure enough for a personal project, easy to upgrade to JWT later |
| Deployment | Docker → Hugging Face Spaces | Free, container-based, no serverless filesystem limitations |

**Browser APIs used for scoring (no ML models, no external AI calls):**
Web Speech API (transcript), Web Audio API (volume/RMS), Canvas frame-diff
(motion/composure).

## Architecture & Flow Diagrams

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

### 7. User Flow Diagram

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

## Getting Started

### Requirements

**Node.js 22.5.0 or newer** (check with `node -v`) — the backend uses
Node's built-in `node:sqlite` module, added in that version. See
`node.txt` for upgrade instructions if you're on an older version.

### Run locally

```bash
git clone https://github.com/Kaweri05/Podium-An-interview-coach.git
cd Podium-An-interview-coach
npm install
npm start
```

Open **http://localhost:3000**. `podium.db` is created automatically on
first run — no manual database setup needed.

> Camera/mic access requires `http://localhost` or `https://` — it will
> not work if you just double-click `index.html` directly.

---

## Project Structure

Full annotated tree in `structure.txt`. Summary:

```
Podium/
├── server.js          Express API: auth, sessions, leaderboard
├── package.json        Dependencies: express, bcryptjs
├── node.txt              Node.js version requirement + notes
├── structure.txt          Full annotated file tree
├── Dockerfile              Container build for Hugging Face Spaces
├── .dockerignore
├── .gitignore
└── public/
    ├── index.html          App shell / screens
    ├── style.css            Theming, layout, components
    └── app.js                Question banks, scoring engine,
                              dashboard logic, API client
```

---

## Deployment

This project is deployed as a **Docker Space on Hugging Face** — chosen
specifically because it needs an always-on server with a real
filesystem (SQLite), which rules out serverless platforms like Vercel
or Netlify (their filesystem resets on every request, which would wipe
the database constantly).

### Deploy your own copy to Hugging Face Spaces

1. **Create the Space**
   Go to [huggingface.co](https://huggingface.co) → **New Space** →
   choose **SDK: Docker**, template **Blank**.

2. **Get a write-access token**
   [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   → **New token** → Write access.

3. **Push this project to the Space**
   ```bash
   git clone https://huggingface.co/spaces/<your-username>/<space-name>
   cd <space-name>
   # copy in server.js, package.json, package-lock.json, node.txt,
   # structure.txt, README.md, Dockerfile, .dockerignore, .gitignore,
   # and the public/ folder
   git add .
   git commit -m "Deploy Podium"
   git push origin main
   ```
   When prompted for a password, paste the **access token** from step 2
   (not your Hugging Face account password).

4. **Metadata block**
   The YAML block at the very top of this README (title, emoji,
   `sdk: docker`, `app_port: 7860`) is what tells Hugging Face how to
   build and run the Space — it needs to be the first thing in the file,
   with nothing before the opening `---`.

5. **Build & run**
   Hugging Face automatically builds `Dockerfile` and starts the app.
   Spaces expose port `7860` by default; the Dockerfile sets
   `ENV PORT=7860` and `server.js` already reads `process.env.PORT`, so
   no code changes are required.

### ⚠️ Known limitation

Free Hugging Face Spaces **do not guarantee persistent disk storage** —
a rebuild or restart after inactivity resets `podium.db` to empty. Fine
for a demo/portfolio deployment; for production-grade persistence,
options include Hugging Face's paid Persistent Storage add-on, or
swapping SQLite for a hosted free database like **Supabase** (Postgres)
or **Turso** (hosted SQLite).

---

## Roadmap

- [ ] Real JWT-based auth with expiry + refresh tokens
- [ ] Password reset flow
- [ ] Move to Postgres for persistent, multi-instance hosting
- [ ] Rate limiting on `/api/signup` and `/api/login`
- [ ] Optional LLM-graded answer content alongside the existing
      heuristic scoring engine
- [ ] Exportable PDF interview reports

---

## License

MIT — free to use, modify, and build on.

---

*Built by [Kaweri](https://github.com/Kaweri05) as a full-stack project
covering frontend UX, browser media APIs, backend API design, and
Docker-based deployment.*
