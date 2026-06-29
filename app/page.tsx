import { QuizList } from '@/components/QuizList'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0B0A12', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
        
        {/* Icon */}
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(182,156,255,0.12)', border: '1px solid rgba(182,156,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
          📚
        </div>

        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ color: '#B69CFF', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            My Next Book
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-1px' }}>
            The books you love<br /><span style={{ color: '#B69CFF' }}>aren&apos;t random.</span>
          </h1>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.65, maxWidth: 360, margin: '0 auto' }}>
            Discover your reading identity. Get a personalised playlist of books you&apos;ll actually finish.
          </p>
        </div>

        {/* Quiz list */}
        <QuizList />

        {/* Legal */}
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#444' }}>
          <a href="/privacy" style={{ color: '#444', textDecoration: 'none' }}>Privacy</a>
          <a href="/terms" style={{ color: '#444', textDecoration: 'none' }}>Terms</a>
        </div>

        <p style={{ color: '#333', fontSize: 12 }}>© 2026 My Next Book · Red Derby Ventures LLC</p>
      </div>
    </main>
  )
}
