-- quiz_tokens: short-lived tokens for quiz_vector + attribution handoff
-- to the iOS app via App Store deep link (replaces fragile URL-encoded JSON)
create table if not exists quiz_tokens (
  token         text primary key,
  result_id     text not null,
  archetype_name text not null default '',
  quiz_id       text not null,
  quiz_vector   jsonb,
  attribution   jsonb not null default '{}',
  expires_at    timestamptz not null,
  created_at    timestamptz not null default now()
);

-- Auto-delete expired tokens to keep the table lean
create index if not exists quiz_tokens_expires_at on quiz_tokens (expires_at);

-- RLS: allow anon insert (token created client-side via API route);
-- reads go through the API route using service key, no direct anon read needed
alter table quiz_tokens enable row level security;
create policy "anon insert" on quiz_tokens for insert to anon with check (true);
