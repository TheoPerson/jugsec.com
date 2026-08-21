<div align="center">
  <br />

# ⚡ FrameForge

**AI-Powered PC Optimization for Competitive Gamers**

[![SvelteKit](https://img.shields.io/badge/SvelteKit-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge)](https://orm.drizzle.team/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

  <br />

_Unlock every frame. Eliminate every bottleneck. Dominate every match._

</div>

---

## 🎯 What is FrameForge?

FrameForge is a premium web platform that helps competitive gamers optimize their PC for maximum performance. Enter your specs, run an AI-powered scan, and get prioritized, game-specific recommendations — no more digging through Reddit threads and YouTube videos.

### Core Features

- **🤖 AI System Analysis** — Gemini-powered scan of your hardware, generating personalized optimization recommendations
- **🎮 Game-Specific Profiles** — Curated optimization presets for Valorant, CS2, Fortnite, Apex Legends, and more
- **📊 Performance Scoring** — Overall + per-category scores (CPU, GPU, RAM, Storage, Network) on a 0-100 scale
- **📋 Step-by-Step Guides** — Clear instructions for every recommendation, rated by difficulty and impact
- **📈 History Tracking** — Track optimizations applied and performance improvements over time

---

## 🛠️ Tech Stack

| Layer               | Technology                                                                           |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Framework**       | [SvelteKit 5](https://kit.svelte.dev/) (Svelte 5 runes)                              |
| **Language**        | [TypeScript](https://www.typescriptlang.org/) (strict)                               |
| **Database**        | [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/) |
| **Styling**         | [Tailwind CSS v4](https://tailwindcss.com/)                                          |
| **AI**              | [Google Gemini](https://ai.google.dev/)                                              |
| **Hosting**         | [Vercel](https://vercel.com/)                                                        |
| **Package Manager** | pnpm                                                                                 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (Neon, Supabase, or local)

### Installation

```bash
git clone <your-repo-url>
cd frameforge
cp .env.example .env
# Edit .env with your database URL and optional Gemini API key
pnpm install
pnpm db:push
pnpm dev
```

Your FrameForge instance will be running at `http://localhost:5173`.

### Environment Variables

| Variable         | Required | Description                                 |
| ---------------- | -------- | ------------------------------------------- |
| `DATABASE_URL`   | ✅       | PostgreSQL connection string                |
| `SESSION_SECRET` | ✅       | Random string for session security          |
| `GEMINI_API_KEY` | ❌       | Google Gemini API key (enables AI analysis) |

---

## 📁 Project Structure

```
src/
├── app.css                    # Design system (Tailwind v4 @theme)
├── app.html                   # HTML shell
├── app.d.ts                   # Type declarations
├── hooks.server.ts            # Auth middleware
├── lib/
│   ├── utils.ts               # Shared utilities
│   ├── server/
│   │   ├── auth.ts            # Authentication (bcrypt, sessions)
│   │   ├── db/
│   │   │   ├── schema.ts      # Drizzle ORM schema
│   │   │   └── index.ts       # Database connection
│   │   └── services/
│   │       ├── optimization.ts # AI optimization engine
│   │       └── game-profiles.ts # Game-specific presets
│   └── components/            # Reusable UI components
├── routes/
│   ├── +page.svelte           # Landing page
│   ├── auth/                  # Login, register, logout
│   └── dashboard/             # Protected dashboard
│       ├── scan/              # Run optimization scan
│       ├── system/            # Edit PC specs
│       ├── games/             # Browse game profiles
│       ├── history/           # Optimization timeline
│       └── settings/          # Account settings
```

---

## 🗄️ Database Schema

| Table                  | Purpose                              |
| ---------------------- | ------------------------------------ |
| `users`                | User accounts with tier (free/pro)   |
| `sessions`             | Database-backed auth sessions        |
| `system_profiles`      | User's PC hardware specs             |
| `optimization_scans`   | AI scan results with scores          |
| `game_profiles`        | Per-game optimization presets        |
| `user_game_profiles`   | Applied game profiles                |
| `optimization_history` | Audit trail of applied optimizations |

---

## 📄 License

MIT
