import { supabase } from './supabase'
import type { Attribution } from '@/types/quiz'

export type EventName =
  | 'page_view'
  | 'quiz_started'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'result_viewed'
  | 'email_submitted'
  | 'app_store_clicked'

export async function trackEvent(
  sessionId: string,
  event: EventName,
  quizId: string,
  properties?: Record<string, unknown>,
) {
  if (!supabase) return
  try {
    await supabase.from('funnel_events').insert({
      session_id: sessionId,
      quiz_id: quizId,
      event_name: event,
      properties: properties ?? {},
      created_at: new Date().toISOString(),
    })
  } catch {
    // never block user flow on tracking failure
  }
}

export async function createSession(
  sessionId: string,
  quizId: string,
  attr: Attribution,
) {
  if (!supabase) return
  try {
    await supabase.from('quiz_sessions').insert({
      id: sessionId,
      quiz_id: quizId,
      attribution: attr,
      created_at: new Date().toISOString(),
    })
  } catch {}
}

export async function saveAnswers(
  sessionId: string,
  quizId: string,
  answers: Record<string, string>,
) {
  if (!supabase) return
  try {
    const rows = Object.entries(answers).map(([questionId, optionId]) => ({
      session_id: sessionId,
      quiz_id: quizId,
      question_id: questionId,
      option_id: optionId,
      created_at: new Date().toISOString(),
    }))
    await supabase.from('quiz_answers').insert(rows)
  } catch {}
}

export async function saveResult(
  sessionId: string,
  quizId: string,
  resultId: string,
) {
  if (!supabase) return
  try {
    await supabase.from('quiz_results').insert({
      session_id: sessionId,
      quiz_id: quizId,
      result_id: resultId,
      created_at: new Date().toISOString(),
    })
  } catch {}
}

export async function captureEmail(
  sessionId: string,
  quizId: string,
  email: string,
  resultId: string,
  attr: Attribution,
) {
  if (!supabase) return
  try {
    await supabase.from('email_leads').insert({
      session_id: sessionId,
      quiz_id: quizId,
      email,
      result_id: resultId,
      attribution: attr,
      created_at: new Date().toISOString(),
    })
  } catch {}
}

export function genSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
