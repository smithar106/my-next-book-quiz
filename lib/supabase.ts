// Supabase REST API helpers — no supabase-js client, no localStorage issues

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

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
