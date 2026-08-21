<div align="center">
  <img src="./static/favicon.svg" width="80" alt="JUGSEC Logo" />
  <h1 align="center">JUGSEC</h1>
  <p align="center">
    <strong>Premium 1-on-1 PC Optimization Service by Theo</strong>
    <br />
    <i>Zero input lag. Maximum FPS. Real human expertise.</i>
  </p>

  <p align="center">
    <a href="https://svelte.dev"><img src="https://img.shields.io/badge/SvelteKit-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit 5" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" /></a>
  </p>
</div>

---

## 🎯 About

**JUGSEC** is a premium, 1-on-1 PC optimization service run by Theo. No automated snake-oil software—just deep, manual hardware and OS tuning (BIOS, Registry, GPU, Windows) for competitive esports players who need zero input lag and maximum stable frames.

This repository hosts the client portal and booking system. Clients can register, input their PC specifications, and get an initial technical audit (powered by Grok 4.6) before their 1-on-1 remote tuning session.

## 🏗️ Tech Stack

- **Frontend SSR**: SvelteKit 5 (Runes) + Tailwind v4.
- **Database**: PostgreSQL via Drizzle ORM.
- **Auth**: Custom robust Auth (Bcrypt + JWT, HttpOnly Cookies).
- **AI Integration**: xAI Grok 4.6 (for preliminary spec analysis).
- **Deployment**: Vercel Edge.

## 🚀 Local Setup

### 1. Environment Variables

`ash
cp .env.example .env
`
Fill in your \DATABASE_URL\ (Neon.tech or Supabase) and \XAI_API_KEY\.

### 2. Install & Push Schema

`ash
pnpm install
pnpm db:push
`

### 3. Run Development Server

`ash
pnpm dev
`
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Repository Structure

- \src/routes/(landing)\ - Marketing pages and social proof.
- \src/routes/dashboard\ - Client portal where users submit their PC specs.
- \src/lib/server\ - Core backend logic, auth, database schema, and xAI integration.

---

_Built for pure competitive performance._
