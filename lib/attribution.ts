import type { Attribution } from '@/types/quiz'

const ATTR_KEYS: (keyof Attribution)[] = [
  'creator', 'campaign', 'source', 'platform', 'hook',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
]

export function parseAttribution(searchParams: URLSearchParams): Attribution {
  const attr: Attribution = {}
  for (const key of ATTR_KEYS) {
    const val = searchParams.get(key)
    if (val) attr[key] = val
  }
  return attr
}

export function storeAttribution(attr: Attribution) {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem('mnb_attr', JSON.stringify(attr))
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('mnb_attr', JSON.stringify(attr))
  }
}

export function getStoredAttribution(): Attribution {
  if (typeof sessionStorage === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem('mnb_attr')
    if (raw) return JSON.parse(raw)
    const ls = typeof localStorage !== 'undefined' ? localStorage.getItem('mnb_attr') : null
    return ls ? JSON.parse(ls) : {}
  } catch {
    return {}
  }
}

export function buildAppStoreUrl(
  baseUrl: string,
  attr: Attribution,
  extras?: { result_id?: string; archetype_name?: string; quiz_id?: string },
): string {
  const url = new URL(baseUrl)
  if (attr.campaign) url.searchParams.set('campaign', attr.campaign)
  if (attr.creator) url.searchParams.set('pt', attr.creator)
  if (attr.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign)
  if (attr.utm_source) url.searchParams.set('utm_source', attr.utm_source)
  if (attr.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium)
  if (extras?.result_id) url.searchParams.set('result_id', extras.result_id)
  if (extras?.archetype_name) url.searchParams.set('archetype_name', extras.archetype_name)
  if (extras?.quiz_id) url.searchParams.set('quiz_id', extras.quiz_id)
  return url.toString()
}

export function persistResult(resultId: string, archetypeName: string, quizId: string) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('mnb_last_result', JSON.stringify({
    result_id: resultId,
    archetype_name: archetypeName,
    quiz_id: quizId,
    saved_at: new Date().toISOString(),
  }))
}

export function getLastQuizResult(): { result_id: string; archetype_name: string; quiz_id: string; saved_at: string } | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem('mnb_last_result')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
