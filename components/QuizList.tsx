'use client'

import Link from 'next/link'

const QUIZ_META: Record<string, { emoji: string; color: string; title: string; hook: string }> = {
  'what-should-i-read-next': { emoji: '📚', color: '#B69CFF', title: 'What Should I Read Next?', hook: 'Find your next perfect book.' },
  'book-personality': { emoji: '✨', color: '#FF9B9B', title: 'Book Personality Quiz', hook: 'Find your reader personality.' },
  'booktok-recommendations': { emoji: '🎵', color: '#FF6B9B', title: 'BookTok Recommendation Quiz', hook: 'Find the BookTok book you\'ll actually love.' },
  'reading-slump': { emoji: '🌿', color: '#6BCFB0', title: 'Reading Slump Fixer', hook: 'Find the book that will get you out of a reading slump.' },
  'genre-match': { emoji: '🌙', color: '#FFB86C', title: 'Genre Match Quiz', hook: 'Find the genre that matches your current mood.' },
}

export function QuizList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {Object.entries(QUIZ_META).map(([slug, meta]) => (
        <QuizCard key={slug} slug={slug} meta={meta} />
      ))}
    </div>
  )
}

function QuizCard({ slug, meta }: { slug: string; meta: typeof QUIZ_META[string] }) {
  return (
    <Link href={`/${slug}`} style={{ display: 'block' }}>
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(182,156,255,0.4)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(182,156,255,0.14)' }}
      >
        <div style={{
          width: 52, height: 52,
          background: `${meta.color}18`,
          border: `1px solid ${meta.color}40`,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, flexShrink: 0,
        }}>
          {meta.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{meta.title}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{meta.hook}</div>
        </div>
        <div style={{ color: 'var(--text-dim)', fontSize: 18, flexShrink: 0 }}>→</div>
      </div>
    </Link>
  )
}
