import { NextRequest, NextResponse } from 'next/server'
import { dbInsertServer, dbSelect } from '@/lib/supabase'

// POST /api/quiz-token — store quiz result + vector, return a short token
// GET  /api/quiz-token?token=xxx — retrieve stored data by token
//
// The app reads ?token= from the deep link on first launch, fetches here,
// and gets the full quiz_vector + result_id without needing URL-safe JSON.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { result_id, archetype_name, quiz_id, quiz_vector, attribution, dominant_signals, avoided_signals, quiz_responses, identity_summary, schema_version } = body

    if (!result_id || !quiz_id) {
      return NextResponse.json({ error: 'missing fields' }, { status: 400 })
    }

    // Short alphanumeric token — 8 chars is enough for this volume
    const token = Math.random().toString(36).slice(2, 10)
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await dbInsertServer('quiz_tokens', {
      token,
      result_id,
      archetype_name: archetype_name ?? '',
      quiz_id,
      quiz_vector: quiz_vector ?? null,
      attribution: attribution ?? {},
      dominant_signals: dominant_signals ?? null,
      avoided_signals: avoided_signals ?? null,
      quiz_responses: quiz_responses ?? null,
      identity_summary: identity_summary ?? null,
      schema_version: schema_version ?? '1.0',
      expires_at,
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({ token })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token || !/^[a-z0-9]{6,12}$/.test(token)) {
    return NextResponse.json({ error: 'invalid token' }, { status: 400 })
  }

  try {
    const row = await dbSelect('quiz_tokens', token)
    if (!row) return NextResponse.json({ error: 'not found' }, { status: 404 })

    // Check expiry
    if (row.expires_at && new Date(row.expires_at as string) < new Date()) {
      return NextResponse.json({ error: 'expired' }, { status: 410 })
    }

    return NextResponse.json({
      result_id: row.result_id,
      archetype_name: row.archetype_name,
      quiz_id: row.quiz_id,
      quiz_vector: row.quiz_vector,
      attribution: row.attribution,
      dominant_signals: row.dominant_signals ?? null,
      avoided_signals: row.avoided_signals ?? null,
      quiz_responses: row.quiz_responses ?? null,
      identity_summary: row.identity_summary ?? null,
      schema_version: row.schema_version ?? '1.0',
    }, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
