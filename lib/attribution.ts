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
}

export function getStoredAttribution(): Attribution {
  if (typeof sessionStorage === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem('mnb_attr')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function buildAppStoreUrl(baseUrl: string, attr: Attribution): string {
  const url = new URL(baseUrl)
  if (attr.campaign) url.searchParams.set('campaign', attr.campaign)
  if (attr.creator) url.searchParams.set('pt', attr.creator)
  if (attr.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign)
  if (attr.utm_source) url.searchParams.set('utm_source', attr.utm_source)
  if (attr.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium)
  return url.toString()
}
