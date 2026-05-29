import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const getResend = () => new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAIL = 'smithar106@gmail.com'
const FROM_EMAIL = 'My Next Book <quiz@mynextbook.me>'

// Simple in-memory IP rate limiter — acceptable for a single-instance Railway deploy.
// Allows max 5 submissions per IP per hour.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const ipSubmissions = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipSubmissions.get(ip)
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  try {
    const { email, archetypeName, archetypeSubtitle, microcopy, similarBooks, quizTitle } = await req.json()
    if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })

    const booksHtml = similarBooks?.map((b: { title: string; author: string; note: string }) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(212,188,255,0.12)">
          <p style="margin:0 0 2px;font-weight:700;font-size:15px;color:#ffffff">${b.title}</p>
          <p style="margin:0 0 4px;font-size:13px;color:#A097C0">${b.author}</p>
          <p style="margin:0;font-size:13px;color:#D4BCFF;font-style:italic">${b.note}</p>
        </td>
      </tr>
    `).join('') ?? ''

    // Send result to user
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your reading identity: ${archetypeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#1C1830;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1C1830;padding:40px 20px">
            <tr><td align="center">
              <table width="100%" style="max-width:520px" cellpadding="0" cellspacing="0">

                <!-- Header -->
                <tr><td style="padding-bottom:32px;text-align:center">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:800;letter-spacing:2px;color:#D4BCFF;text-transform:uppercase">MY NEXT BOOK</p>
                  <p style="margin:0;font-size:12px;color:#A097C0">Your Reading DNA</p>
                </td></tr>

                <!-- Result card -->
                <tr><td style="background:linear-gradient(160deg,rgba(200,176,255,0.12) 0%,rgba(18,16,30,0.9) 100%);border:1.5px solid rgba(200,176,255,0.35);border-radius:24px;padding:36px 28px;text-align:center;margin-bottom:24px">
                  <p style="font-size:10px;font-weight:800;letter-spacing:2px;color:#D4BCFF;text-transform:uppercase;margin:0 0 20px">YOUR READER TYPE</p>
                  <h1 style="margin:0 0 10px;font-size:32px;font-weight:900;letter-spacing:-1px;line-height:1.1;color:#ffffff">${archetypeName}</h1>
                  <p style="margin:0 0 20px;font-size:15px;font-weight:700;color:#D4BCFF;line-height:1.4">${archetypeSubtitle}</p>
                  <p style="margin:0;font-size:15px;color:#DDD4F8;line-height:1.65;font-style:italic">${microcopy}</p>
                </td></tr>

                <!-- Books -->
                <tr><td style="padding-top:24px">
                  <p style="margin:0 0 16px;font-size:10px;font-weight:800;letter-spacing:2px;color:#D4BCFF;text-transform:uppercase">Readers like you obsess over</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${booksHtml}
                  </table>
                </td></tr>

                <!-- CTA -->
                <tr><td style="padding-top:32px;text-align:center">
                  <a href="https://apps.apple.com/us/app/my-next-book-what-to-read/id6763831526" style="display:inline-block;background:#B89AFF;color:#120F1C;font-size:16px;font-weight:800;padding:16px 40px;border-radius:14px;text-decoration:none">
                    Download My Next Book →
                  </a>
                  <p style="margin:12px 0 0;font-size:12px;color:#A097C0">Free · 7-day Pro trial · No credit card</p>
                </td></tr>

                <!-- Footer -->
                <tr><td style="padding-top:40px;text-align:center;border-top:1px solid rgba(212,188,255,0.12);margin-top:32px">
                  <p style="margin:0;font-size:12px;color:#A097C0">You took the ${quizTitle} on My Next Book Quiz.<br>
                  <a href="https://quiz.mynextbook.me" style="color:#D4BCFF">quiz.mynextbook.me</a></p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    })

    // Notify owner
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New quiz result: ${archetypeName}`,
      html: `
        <p style="font-family:sans-serif;font-size:15px">
          New signup on My Next Book Quiz:<br><br>
          <strong>Email:</strong> ${email}<br>
          <strong>Reading identity:</strong> ${archetypeName}<br>
          <strong>Quiz:</strong> ${quizTitle}<br>
        </p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('send-result error', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
