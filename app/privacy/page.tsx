import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — My Next Book',
  description: 'How My Next Book collects, uses, and protects your data.',
}

const s: Record<string, React.CSSProperties> = {
  page:    { minHeight: '100vh', background: '#0B0A12', color: '#FFFFFF' },
  wrap:    { maxWidth: 640, margin: '0 auto', padding: '64px 24px' },
  h1:      { fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 },
  updated: { color: '#A097C0', fontSize: 13, marginBottom: 40 },
  section: { marginBottom: 36 },
  h2:      { fontSize: 18, fontWeight: 700, color: '#B69CFF', marginBottom: 10 },
  p:       { fontSize: 15, color: '#DDD4F8', lineHeight: 1.7 },
  back:    { display: 'inline-block', marginTop: 32, color: '#B69CFF', fontSize: 15, fontWeight: 600 },
}

export default function PrivacyPage() {
  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.updated}>Last updated: June 2026</p>

        <div style={s.section}>
          <h2 style={s.h2}>1. Information We Collect</h2>
          <p style={s.p}>
            When you take the My Next Book quiz, we collect your reading identity quiz answers,
            book ratings and interactions, your email address (if you choose to provide it), and
            anonymous usage analytics to understand how people use the quiz.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>2. How We Use It</h2>
          <p style={s.p}>
            Your quiz answers power the personalised book playlists and recommendations you
            receive. Your interactions help us improve those recommendations over time. If you
            provide your email, we use it only to send your results — nothing else.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>3. Data Sharing</h2>
          <p style={s.p}>
            We do not sell your data. We use Supabase to store your quiz responses and results,
            PostHog for anonymous product analytics, and RevenueCat to manage in-app
            subscriptions. Each of these services is contractually obligated to protect your data.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>4. Subscriptions</h2>
          <p style={s.p}>
            In-app subscription data is managed by Apple and Google. We do not store or have
            access to your payment information. Subscription billing, renewal, and cancellation
            are handled entirely through your device&apos;s app store account.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>5. Data Retention</h2>
          <p style={s.p}>
            Your taste profile, playlists, and reading identity data are retained for as long
            as your subscription remains active, plus 90 days after cancellation. After that
            window, your data is permanently deleted.
          </p>
        </div>

        <div style={s.section}>
          <h2 style={s.h2}>6. Contact</h2>
          <p style={s.p}>
            Questions about your data, or want it deleted sooner? Email us at{' '}
            <a href="mailto:support@mynextbook.me" style={{ color: '#B69CFF', textDecoration: 'underline' }}>
              support@mynextbook.me
            </a>
            . We respond within 48 hours.
          </p>
        </div>

        <a href="/" style={s.back}>← Back to quizzes</a>
      </div>
    </main>
  )
}
