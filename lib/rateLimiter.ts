// In-memory IP rate limiter — acceptable for single-instance Railway deployments.
// Resets on container restart; no persistence needed for this traffic level.

interface Window {
  count: number
  windowStart: number
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const windows = new Map<string, Window>()

  return function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = windows.get(ip)
    if (!entry || now - entry.windowStart > windowMs) {
      windows.set(ip, { count: 1, windowStart: now })
      return false
    }
    if (entry.count >= maxRequests) return true
    entry.count++
    return false
  }
}

export function getClientIp(req: { headers: { get(name: string): string | null } }): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
