-- Migration: add identity continuity columns to quiz_tokens
-- Required for Quiz→App handoff schema version 3.0
alter table quiz_tokens
  add column if not exists archetype_subtitle      text,
  add column if not exists mood_tiles              jsonb,
  add column if not exists dominant_signal_labels  jsonb,
  add column if not exists similar_books           jsonb;
