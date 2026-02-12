-- Run this in Supabase SQL Editor to create the letters table.

create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  password text not null,
  author_name text not null default '',
  content text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists letters_slug_idx on public.letters (slug);

-- Optional: enable RLS and allow service role to do everything (API uses service key).
alter table public.letters enable row level security;

create policy "Service role full access"
  on public.letters
  for all
  using (true)
  with check (true);
