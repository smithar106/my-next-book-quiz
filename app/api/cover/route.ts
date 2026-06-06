import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter, getClientIp } from '@/lib/rateLimiter'

// Server-side cover proxy — resolves book covers by ISBN.
// Tries OL book API first, falls back to Google Books CDN thumbnail.
// Cache-Control: 1 year — covers don't change.
// Railway env var: GOOGLE_BOOKS_KEY

const GB_KEY = process.env.GOOGLE_BOOKS_KEY || ''

// 60 requests per minute per IP — generous for legitimate use, stops abuse
const isRateLimited = createRateLimiter(60, 60 * 1000)

async function fetchOlCover(isbn: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      { next: { revalidate: 86400 * 30 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const key = `ISBN:${isbn}`
    const cover = data[key]?.cover
    const url: string | undefined = cover?.large || cover?.medium || cover?.small
    if (!url) return null
    // Validate it's a real image (not the 9-byte "not found" placeholder).
    // OL often omits content-length, so only use it as a disqualifier when
    // it IS present and clearly too small — never fail on missing header.
    const check = await fetch(url, { method: 'HEAD' })
    const ct = check.headers.get('content-type') || ''
    const clHeader = check.headers.get('content-length')
    const cl = clHeader !== null ? parseInt(clHeader, 10) : null
    if (!ct.startsWith('image/jpeg')) return null
    if (cl !== null && cl < 1000) return null
    return url
  } catch {
    return null
  }
}

async function fetchGbCover(isbn: string): Promise<string | null> {
  if (!GB_KEY) return null
  try {
    const params = new URLSearchParams({ q: `isbn:${isbn}`, key: GB_KEY, maxResults: '1', fields: 'items(volumeInfo(imageLinks))' })
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`)
    if (!res.ok) return null
    const data = await res.json()
    const links = data?.items?.[0]?.volumeInfo?.imageLinks
    const url: string | undefined = links?.thumbnail || links?.smallThumbnail
    return url ? url.replace('http://', 'https://').replace('&edge=curl', '') : null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  const raw = req.nextUrl.searchParams.get('isbn')
  // Strip dashes/spaces so "978-0-385-53304-0" is accepted
  const isbn = raw ? raw.replace(/[-\s]/g, '') : ''
  if (!isbn || !/^\d{10,13}$/.test(isbn)) {
    return new NextResponse(null, { status: 400 })
  }

  const url = (await fetchOlCover(isbn)) || (await fetchGbCover(isbn))

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  // Proxy image bytes directly — 200 response ensures Cache-Control is honoured by
  // browsers and CDNs (302 redirects strip/ignore Cache-Control headers).
  const imageRes = await fetch(url)
  if (!imageRes.ok) return new NextResponse(null, { status: 404 })
  const buffer = await imageRes.arrayBuffer()
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
