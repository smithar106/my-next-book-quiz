import { QuizList } from '@/components/QuizList'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(200,176,255,0.16)',
            border: '1px solid rgba(200,176,255,0.42)',
            color: 'var(--purple)',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '1.5px',
            padding: '6px 14px',
            borderRadius: 100,
            marginBottom: 24,
            textTransform: 'uppercase',
          }}>
            My Next Book
          </div>
          <h1 style={{ fontSize: 'clamp(32px,7vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
            Find your next<br /><span style={{ color: 'var(--purple)' }}>perfect read.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.6 }}>
            Take a quick quiz. Get personalized recommendations. Download the app.
          </p>
        </div>

        <QuizList />

        <div style={{ textAlign: 'center', marginTop: 56, color: 'var(--text-dim)', fontSize: 13 }}>
          © 2026 My Next Book
        </div>
      </div>
    </main>
  )
}
