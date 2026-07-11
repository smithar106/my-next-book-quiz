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
            For readers who feel books, not just finish them
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-1px' }}>
            The books you love<br /><span style={{ color: '#B69CFF' }}>aren&apos;t random.</span>
          </h1>
          <p style={{ color: '#999', fontSize: 16, lineHeight: 1.65, maxWidth: 380, margin: '0 auto' }}>
            Finished a book and had no idea what to read next? Lost an hour scrolling reviews and still guessed wrong?
          </p>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.55, maxWidth: 360, margin: '0 auto' }}>
            Goodreads gives you averages. BookTok gives you trends. We find the book matched to <em>how you actually want to feel</em> right now — in two minutes, no thinking required.
          </p>
        </div>

        {/* Quiz list */}
        <QuizList />

        {/* What you get */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
          {[
            { step: '①', label: 'Take the quiz', sub: 'React to emotional cues — 2 min' },
            { step: '②', label: 'Discover your type', sub: '8 reader archetypes + preview picks' },
            { step: '③', label: 'Get a 5-book playlist', sub: 'Matched to how you feel, not a list' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(182,156,255,0.06)',
              border: '1px solid rgba(182,156,255,0.12)',
              borderRadius: 14,
              padding: '16px 14px',
              flex: '1 1 120px',
              minWidth: 130, maxWidth: 150,
              textAlign: 'center',
            }}>
              <p style={{ color: '#B69CFF', fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{item.step}</p>
              <p style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.label}</p>
              <p style={{ color: '#666', fontSize: 11, lineHeight: 1.5 }}>{item.sub}</p>
            </div>
          ))}
        </div>

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
