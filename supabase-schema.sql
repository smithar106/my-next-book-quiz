-- My Next Book Quiz Funnel — Supabase Schema
-- Run this in your Supabase SQL editor

create table if not exists quiz_sessions (
  id text primary key,
  quiz_id text not null,
  attribution jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists quiz_answers (
  id bigserial primary key,
  session_id text not null,
  quiz_id text not null,
  question_id text not null,
  option_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists quiz_results (
  id bigserial primary key,
  session_id text not null,
  quiz_id text not null,
  result_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists funnel_events (
  id bigserial primary key,
  session_id text not null,
  quiz_id text not null,
  event_name text not null,
  properties jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists email_leads (
  id bigserial primary key,
  session_id text not null,
  quiz_id text not null,
  email text not null,
  result_id text not null,
  attribution jsonb default '{}',
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_funnel_events_quiz on funnel_events (quiz_id, event_name);
create index if not exists idx_funnel_events_session on funnel_events (session_id);
create index if not exists idx_quiz_results_quiz on quiz_results (quiz_id, result_id);
create index if not exists idx_email_leads_email on email_leads (email);

-- Row Level Security: allow anonymous inserts from the frontend
alter table quiz_sessions enable row level security;
alter table quiz_answers enable row level security;
alter table quiz_results enable row level security;
alter table funnel_events enable row level security;
alter table email_leads enable row level security;

create policy "anon insert quiz_sessions" on quiz_sessions for insert to anon with check (true);
create policy "anon insert quiz_answers" on quiz_answers for insert to anon with check (true);
create policy "anon insert quiz_results" on quiz_results for insert to anon with check (true);
create policy "anon insert funnel_events" on funnel_events for insert to anon with check (true);
create policy "anon insert email_leads" on email_leads for insert to anon with check (true);

-- Analytics views (handy for a quick dashboard)
create or replace view quiz_funnel_summary as
select
  quiz_id,
  event_name,
  count(*) as event_count,
  date_trunc('day', created_at) as day
from funnel_events
group by quiz_id, event_name, day
order by day desc, quiz_id, event_name;

create or replace view quiz_result_distribution as
select
  quiz_id,
  result_id,
  count(*) as completions
from quiz_results
group by quiz_id, result_id
order by quiz_id, completions desc;
