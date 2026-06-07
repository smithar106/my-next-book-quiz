-- Migration: add handoff payload columns to quiz_tokens
-- Required for Quiz→App identity handoff (schema version 2.0)
alter table quiz_tokens
  add column if not exists dominant_signals  jsonb,
  add column if not exists avoided_signals   jsonb,
  add column if not exists quiz_responses    jsonb,
  add column if not exists identity_summary  text,
  add column if not exists schema_version    text not null default '1.0';
