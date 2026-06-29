import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — My Next Book',
  description: 'Terms of Service for My Next Book.',
}

const s: Record<string, React.CSSProperties> = {
  page:    { minHeight: '100vh', background: '#0B0A12', color: '#FFFFFF' },
  wrap:    { maxWidth: 640, margin: '0 auto', padding: '64px 24px' },
  h1:      { fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 40 },
  section: { marginBottom: 36 },
  h2:      { fontSize: 18, fontWeight: 700, color: '#B69CFF', marginBottom: 10 },
  p:       { fontSize: 15, color: '#DDD4F8', lineHeight: 1.7 },
  back:    { display: 'inline-block', marginTop: 32, color: '#B69CFF', fontSize: 15, fontWeight: 600 },
}

export default function TermsPage() {
  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.h1}>Terms of Service</h1>

        <div style={s.section}>
          <h2 style={s.h2}>1. Acceptance</h2>
          <p style={s.p}>
            By using the My Next Book web quiz or iOS application, you agree to these Terms of
            Service. If you do not agree, please stop using the service.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>2. Description</h2>
          <p style={s.p}>
            My Next Book is an AI-powered book discovery app for iOS. The web quiz at
            quiz.mynextbook.me is a conversion funnel that identifies your reading identity and
            recommends books you may enjoy. The full app builds personalised 5-book playlists
            that evolve with your taste.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>3. Eligibility</h2>
          <p style={s.p}>
            You must be 13 years or older to use My Next Book. By using the service, you
            represent that you meet this age requirement.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>4. Subscriptions</h2>
          <p style={s.p}>
            The My Next Book iOS app offers a 14-day free trial, followed by an auto-renewing
            subscription at $4.99/month or $29.99/year, billed through the App Store. You may
            cancel your subscription at any time in your iOS Settings under{' '}
            <em>Apple ID &gt; Subscriptions</em>. Cancellation takes effect at the end of the
            current billing period. We do not offer refunds for partial subscription periods.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>5. Intellectual Property</h2>
          <p style={s.p}>
            All reading archetypes, playlist logic, recommendation algorithms, quiz content,
            and associated branding are the intellectual property of Red Derby Ventures LLC.
            You may not reproduce, redistribute, or reverse-engineer any part of the service
            without written permission.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>6. Disclaimer</h2>
          <p style={s.p}>
            Book recommendations provided by My Next Book are for entertainment and discovery
            purposes. Availability, pricing, and edition details for recommended books are not
            guaranteed. We encourage you to verify details with retailers before purchasing.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>7. Governing Law</h2>
          <p style={s.p}>
            These Terms of Service are governed by the laws of Ontario, Canada. Any disputes
            arising from the use of My Next Book shall be resolved under the jurisdiction of
            Ontario courts.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>8. Contact</h2>
          <p style={s.p}>
            For questions about these terms, or anything else, reach us at{' '}
            <a href="mailto:support@mynextbook.me" style={{ color: '#B69CFF', textDecoration: 'underline' }}>
              support@mynextbook.me
            </a>
            .
          </p>
        </div>

        <a href="/" style={s.back}>← Back to quizzes</a>
      </div>
    </main>
  )
}
