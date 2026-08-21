<div align="center">
  <img src="./static/favicon.svg" width="80" alt="FrameForge Logo" />
  <h1 align="center">FrameForge</h1>
  <p align="center">
    <strong>L'ultime plateforme d'optimisation PC pour les joueurs compétitifs (Esport)</strong>
    <br />
    <i>Zéro lag. Plus de FPS. Des clics plus rapides.</i>
  </p>

  <p align="center">
    <a href="https://svelte.dev"><img src="https://img.shields.io/badge/SvelteKit-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit 5" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-Edge_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  </p>
</div>

---

## 🎯 Vision

**FrameForge** est conçu pour les joueurs exigeants (Valorant, CS2, Fortnite). L'objectif est simple : auditer automatiquement ta configuration matérielle et fournir les recommandations d'optimisation (BIOS, OS, Registre, GPU, In-Game) générant le plus haut retour sur investissement en termes de FPS et de réduction d'input lag.

## 🏗️ Architecture "Startup Grade"

Ce repository suit les standards d'ingénierie les plus stricts, inspirés des workflows Vercel/TheoPerson :

- **Frontend SSR** : SvelteKit 5 (Runes).
- **Design System** : Tailwind v4 avec tokens personnalisés (`@theme`).
- **Base de Données** : PostgreSQL via Drizzle ORM (zéro vendor-lock, migrations claires).
- **Sécurité** : Auth custom avec Bcrypt + JWT (Cookies `HttpOnly`, `SameSite=Lax`).
- **SEO & SMO** : Génération dynamique de `sitemap.xml`, `robots.txt`, et balises OpenGraph universelles.
- **Intelligence Artificielle** : Moteur d'analyse de bottleneck basé sur Google Gemini 2.0 Flash.

## 🚀 Lancement Rapide (Dev)

### 1. Variables d'environnement

Copiez le fichier d'exemple :

```bash
cp .env.example .env
```

Remplissez votre `DATABASE_URL` (Supabase, Neon, ou local).

> **Bloqué sur Supabase (Permissions) ?**
> Si vous voyez l'erreur _« You need additional permissions to create a project »_ (comme sur l'organisation _Alan Data Base_), retournez à l'accueil Supabase et **créez une nouvelle organisation personnelle gratuite** depuis le menu de gauche, puis créez-y votre projet.

### 2. Installation & Base de données

```bash
pnpm install
pnpm db:push
```

### 3. Démarrage

```bash
pnpm dev
```

Rendez-vous sur [http://localhost:5173](http://localhost:5173) pour voir la magie opérer.

## 📁 Structure du Projet

```text
frameforge/
├── src/
│   ├── lib/
│   │   ├── components/       # UI (SEO, Buttons, Cards)
│   │   ├── server/
│   │   │   ├── auth.ts       # Logique JWT & bcrypt
│   │   │   ├── db/           # Schéma Drizzle
│   │   │   └── services/     # Moteur IA & Profils de jeux
│   │   └── utils.ts          # Helpers (cn, scores)
│   └── routes/               # Pages (App Router SvelteKit)
│       ├── (landing)/        # /, /proof, /legal
│       ├── auth/             # Login & Register
│       ├── dashboard/        # Espace utilisateur protégé
│       ├── sitemap.xml/      # SEO dynamique
│       └── robots.txt/       # SEO statique
```

## 🧪 Tests (QA)

L'infrastructure est prête pour le testing automatisé (Vitest / Playwright).

```bash
pnpm check      # Svelte-check (Typescript strict)
pnpm lint       # ESLint & Prettier
```

---

_Construit avec passion pour l'esport et la performance pure._
