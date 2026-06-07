import { dbInsert } from './supabase'
import type { Attribution } from '@/types/quiz'

export type EventName =
  | 'page_view'
  | 'quiz_started'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'result_viewed'
  | 'quiz_result_viewed'
  | 'email_submitted'
  | 'app_store_clicked'
  | 'quiz_app_cta_tapped'
  | 'sticky_cta_clicked'
  | 'share_clicked'
  | 'save_card_clicked'
  | 'email_form_shown'
  | 'email_form_skipped'
  | 'quiz_handoff_success'
  | 'quiz_handoff_failed'

const QUEUE_KEY = 'mnb_event_queue'

interface QueuedEvent {
  table: string
  data: Record<string, unknown>
}

function enqueue(event: QueuedEvent) {
  if (typeof localStorage === 'undefined') return
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    const queue: QueuedEvent[] = raw ? JSON.parse(raw) : []
    queue.push(event)
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {}
}

async function flushQueue() {
  if (typeof localStorage === 'undefined') return
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    if (!raw) return
    const queue: QueuedEvent[] = JSON.parse(raw)
    if (!queue.length) return
    localStorage.removeItem(QUEUE_KEY)
    await Promise.all(queue.map(e => dbInsert(e.table, e.data)))
  } catch {}
}

// Flush on visibility change — catches events that fired just before App Store navigation
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') flushQueue()
  })
}

export function trackEvent(
  sessionId: string,
  event: EventName,
  quizId: string,
  properties?: Record<string, unknown>,
) {
  const data = {
    session_id: sessionId,
    quiz_id: quizId,
    event_name: event,
    properties: properties ?? {},
    created_at: new Date().toISOString(),
  }
  enqueue({ table: 'funnel_events', data })
  // Also attempt immediate flush — queue is the safety net for navigation
  dbInsert('funnel_events', data)
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
