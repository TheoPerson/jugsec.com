<div align="center">
  <img src="./static/repo-banner.svg" alt="JUGSEC Banner" width="100%" />
</div>

<br/>

<div align="center">
  <a href="https://svelte.dev"><img src="https://img.shields.io/badge/SvelteKit-5-14141E?style=for-the-badge&logo=svelte&logoColor=FF3E00&labelColor=0a0a0f" alt="SvelteKit 5" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-14141E?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=0a0a0f" alt="Tailwind CSS v4" /></a>
  <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-14141E?style=for-the-badge&logo=drizzle&logoColor=C5F74F&labelColor=0a0a0f" alt="Drizzle ORM" /></a>
</div>

<br/>

> **JUGSEC** is an ultra-premium, 1-on-1 PC optimization service. No automated snake-oil. Deep, manual hardware and OS tuning (BIOS, Registry, GPU, Windows) built for competitive esports players who need zero input lag and maximum stable frames.

<br/>

## ✦ System Architecture

This repository hosts the **Client Portal**. It allows users to register, securely submit their PC specifications, and undergo a preliminary system audit (powered by Grok 4.6) before their 1-on-1 remote tuning session.

| 01 / FRONTEND | 02 / BACKEND | 03 / AI AUDIT |
|:---|:---|:---|
| **SvelteKit 5 (Runes)**<br/>Ultra-fast SSR and state management. | **PostgreSQL + Drizzle**<br/>Secure, strictly typed schema. | **xAI Grok 4.6**<br/>Pre-session spec analysis. |
| **Tailwind v4**<br/>Custom dark theme & fluid UI. | **Bcrypt Auth**<br/>HTTP-Only JWT Sessions. | **Actionable Intel**<br/>Saves manual triage time. |

<br/>

## ✦ Local Deployment

<details>
<summary><b>View Setup Instructions</b></summary>
<br/>

**1. Environment Configuration**
`ash
cp .env.example .env
`
Add your \DATABASE_URL\ (Neon.tech / Supabase) and \XAI_API_KEY\.

**2. Install & Sync Schema**
`ash
pnpm install
pnpm db:push
`

**3. Launch System**
`ash
pnpm dev
`
Access the portal at \http://localhost:5173\.

</details>

<br/>

## ✦ Repository Topology

- \src/routes/(landing)\ — Conversion pages & esport social proof (\/proof\).
- \src/routes/dashboard\ — The client portal for spec submission.
- \src/lib/server\ — Core logic, auth middleware, and xAI integrations.

<br/>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=14&pause=2000&color=00FF88&vCenter=true&random=false&width=200&lines=System+Online.;Optimization+Ready." alt="Typing SVG" />
</div>
