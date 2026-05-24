import { dbInsert } from './supabase'
import type { Attribution } from '@/types/quiz'

export type EventName =
  | 'page_view'
  | 'quiz_started'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'result_viewed'
  | 'email_submitted'
  | 'app_store_clicked'
  | 'sticky_cta_clicked'
  | 'share_clicked'
  | 'save_card_clicked'

export function trackEvent(
  sessionId: string,
  event: EventName,
  quizId: string,
  properties?: Record<string, unknown>,
) {
  dbInsert('funnel_events', {
    session_id: sessionId,
    quiz_id: quizId,
    event_name: event,
    properties: properties ?? {},
    created_at: new Date().toISOString(),
  })
}

export function createSession(sessionId: string, quizId: string, attr: Attribution) {
  dbInsert('quiz_sessions', {
    id: sessionId,
    quiz_id: quizId,
    attribution: attr,
    created_at: new Date().toISOString(),
  })
}

export function saveAnswers(sessionId: string, quizId: string, answers: Record<string, string>) {
  const rows = Object.entries(answers).map(([questionId, optionId]) => ({
    session_id: sessionId,
    quiz_id: quizId,
    question_id: questionId,
    option_id: optionId,
    created_at: new Date().toISOString(),
  }))
  dbInsert('quiz_answers', rows)
}

export function saveResult(sessionId: string, quizId: string, resultId: string) {
  dbInsert('quiz_results', {
    session_id: sessionId,
    quiz_id: quizId,
    result_id: resultId,
    created_at: new Date().toISOString(),
  })
}

export async function captureEmail(
  sessionId: string,
  quizId: string,
  email: string,
  resultId: string,
  attr: Attribution,
) {
  await dbInsert('email_leads', {
    session_id: sessionId,
    quiz_id: quizId,
    email,
    result_id: resultId,
    attribution: attr,
    created_at: new Date().toISOString(),
  })
}

export function genSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
