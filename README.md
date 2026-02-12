# Love Letter — SaaS Web App

A small SaaS-style app so anyone can create a password-protected love letter and share a unique link. Built with **Next.js 14**, **Tailwind CSS**, and **Supabase**, ready to deploy on **Vercel**.

## Features

- **Home** — Landing page with “Create Your Letter” form (password, your name, letter content).
- **Success** — After creating, you get a unique link and a “Copy link” button.
- **Viewer** — `/letter/[id]` loads the letter; the reader enters the password to unlock and see the letter with the typewriter effect.

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the contents of `supabase-schema.sql` to create the `letters` table.
3. In Project Settings → API: copy **Project URL** and **service_role** key (under “Project API keys”).

### 2. Environment

Copy the example env and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` — Project URL from Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key from Supabase.

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a letter, copy the link, open it in a new tab, and unlock with the password.



## Deploy on Vercel

1. Push the `webapp` folder to a Git repo (or the repo root if you move files).
2. In [Vercel](https://vercel.com), import the project and set the same env vars: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
3. Deploy. Your app URL will be `https://your-app.vercel.app`; the success page will show links like `https://your-app.vercel.app/letter/abc123xyz`.

## Project structure

- `app/page.tsx` — Home + create form.
- `app/success/page.tsx` — Success page with shareable link and Copy.
- `app/letter/[id]/page.tsx` — Dynamic viewer route; loads letter by slug.
- `app/api/letters/route.ts` — `POST` create letter, returns `slug`.
- `app/api/letters/[id]/route.ts` — `GET` letter meta (e.g. author name).
- `app/api/letters/[id]/unlock/route.ts` — `POST` unlock with password, returns content.
- `components/LetterViewer.tsx` — Gatekeeper + typewriter letter UI.
- `lib/supabase.ts` — Supabase client (service role).
- `lib/slug.ts` — Random slug generation.
- `supabase-schema.sql` — Table definition for Supabase.
