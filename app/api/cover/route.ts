import { NextRequest, NextResponse } from 'next/server'

// Server-side cover proxy — resolves book covers by ISBN.
// Tries OL book API first, falls back to Google Books CDN thumbnail.
// Cache-Control: 1 year — covers don't change.

const GB_KEY = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_KEY || ''

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
    // Validate it's a real image (not the 9-byte "not found" text)
    const check = await fetch(url, { method: 'HEAD' })
    const ct = check.headers.get('content-type') || ''
    const cl = parseInt(check.headers.get('content-length') || '0', 10)
    if (!ct.startsWith('image/jpeg') || cl < 1000) return null
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
  const isbn = req.nextUrl.searchParams.get('isbn')
  if (!isbn || !/^\d{10,13}$/.test(isbn)) {
    return new NextResponse(null, { status: 400 })
  }

  const url = (await fetchOlCover(isbn)) || (await fetchGbCover(isbn))

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  // Redirect to the resolved URL with a long cache TTL
  return NextResponse.redirect(url, {
    status: 302,
    headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
  })
}
