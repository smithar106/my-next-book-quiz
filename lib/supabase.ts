// Supabase REST API helpers — no supabase-js client, no localStorage issues

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
// Service key only available server-side — used for quiz_tokens table reads
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ''

export async function dbInsert(table: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return
  if (typeof window === 'undefined') return
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(data),
    })
  } catch {
    // never block user flow
  }
}

// Server-side only — used by /api/quiz-token route with service key
export async function dbInsertServer(table: string, data: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY
  if (!url || !key) return
  await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(data),
  })
}

export async function dbSelect(table: string, token: string): Promise<Record<string, unknown> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY
  if (!url || !key) return null
  const res = await fetch(`${url}/rest/v1/${table}?token=eq.${encodeURIComponent(token)}&limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
    },
  })
  if (!res.ok) return null
  const rows = await res.json()
  return rows?.[0] ?? null
}
