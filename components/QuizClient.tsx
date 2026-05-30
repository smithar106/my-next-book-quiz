'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { getQuiz, computeResult } from '@/lib/quizzes'
import { getResultContent } from '@/lib/resultContent'
import { parseAttribution, storeAttribution, getStoredAttribution, buildAppStoreUrl, persistResult } from '@/lib/attribution'
import {
  trackEvent, createSession, saveAnswers, saveResult, captureEmail, genSessionId,
} from '@/lib/tracking'
import type { Attribution } from '@/types/quiz'

const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/us/app/my-next-book-what-to-read/id6763831526'

type Phase = 'landing' | 'quiz' | 'calculating' | 'result'

interface Props { slug: string; rawParams: Record<string, string> }

export function QuizClient({ slug, rawParams }: Props) {
  const config = getQuiz(slug)
  const [phase, setPhase] = useState<Phase>(rawParams.start === '1' ? 'quiz' : 'landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [stickyCta, setStickyCta] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const sessionId = useRef(genSessionId())
  const attr = useRef<Attribution>({})
  const cachedResult = useRef<ReturnType<typeof computeResult>>(null)
  const emailFormShownRef = useRef(false)

  useEffect(() => {
    if (!config) return
    const params = new URLSearchParams(rawParams as Record<string, string>)
    const parsed = parseAttribution(params)
    const stored = getStoredAttribution()
    attr.current = { ...stored, ...parsed }
    storeAttribution(attr.current)
    trackEvent(sessionId.current, 'page_view', config.id, { quiz_id: config.id, ...attr.current })
    if (rawParams.start === '1') {
      createSession(sessionId.current, config.id, attr.current)
      trackEvent(sessionId.current, 'quiz_started', config.id)
    }
  }, [config, rawParams])

  useEffect(() => {
    if (phase !== 'result') return
    const handleScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.35
      setStickyCta(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [phase])

  useEffect(() => {
    if (phase !== 'result' || emailSent || emailFormShownRef.current || !config) return
    emailFormShownRef.current = true
    const r = computeResult(config, answers)
    trackEvent(sessionId.current, 'email_form_shown', config.id, { archetype: r?.id })
  }, [phase, emailSent, config, answers])

  if (!config) return <div style={{ color: 'var(--text)', padding: 40 }}>Quiz not found.</div>

  function startQuiz() {
    setPhase('quiz')
    setCurrentQ(0)
    createSession(sessionId.current, config!.id, attr.current)
    trackEvent(sessionId.current, 'quiz_started', config!.id)
  }

  function selectOption(questionId: string, optionId: string) {
    const next = { ...answers, [questionId]: optionId }
    setAnswers(next)
    setSelectedOptionId(optionId)
    trackEvent(sessionId.current, 'quiz_question_answered', config!.id, {
      question_id: questionId, option_id: optionId, question_index: currentQ,
    })
    setTimeout(() => {
      setSelectedOptionId(null)
      if (currentQ < config!.questions.length - 1) {
        setCurrentQ((q) => q + 1)
      } else {
        finishQuiz(next)
      }
    }, 240)
  }

  function finishQuiz(finalAnswers: Record<string, string>) {
    const result = computeResult(config!, finalAnswers)
    cachedResult.current = result
    if (result) {
      saveAnswers(sessionId.current, config!.id, finalAnswers)
      saveResult(sessionId.current, config!.id, result.id)
      trackEvent(sessionId.current, 'quiz_completed', config!.id, { result_id: result.id })
      trackEvent(sessionId.current, 'result_viewed', config!.id, { result_id: result.id })
      const rc = getResultContent(result.id)
      persistResult(result.id, rc?.archetypeName ?? result.title, config!.id)
    }
    setPhase('calculating')
    setTimeout(() => setPhase('result'), 1800)
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email || emailLoading) return
    setEmailLoading(true)
    if (result) {
      const rc = getResultContent(result.id)
      await captureEmail(sessionId.current, config!.id, email, result.id, attr.current)
      trackEvent(sessionId.current, 'email_submitted', config!.id, { result_id: result.id })
      fetch('/api/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          archetypeName: rc?.archetypeName ?? result.title,
          archetypeSubtitle: rc?.archetypeSubtitle ?? result.tagline,
          microcopy: rc?.microcopy ?? result.description,
          similarBooks: rc?.similarBooks ?? [],
          quizTitle: config!.title,
        }),
      }).catch(() => {})
    }
    setEmailSent(true)
    setEmailLoading(false)
  }

  function handleAppStoreClick(source = 'result_cta') {
    const archetypeName = content?.archetypeName ?? result?.title ?? ''
    trackEvent(sessionId.current, 'app_store_clicked', config!.id, {
      source,
      result_id: result?.id,
      archetype_name: archetypeName,
      ...attr.current,
    })
    window.open(
      buildAppStoreUrl(APP_STORE_URL, attr.current, {
        result_id: result?.id,
        archetype_name: archetypeName,
        quiz_id: config!.id,
      }),
      '_blank', 'noopener',
    )
  }

  function handleStickyCtaClick() {
    const archetypeName = content?.archetypeName ?? result?.title ?? ''
    trackEvent(sessionId.current, 'sticky_cta_clicked', config!.id, {
      result_id: result?.id,
      archetype_name: archetypeName,
      ...attr.current,
    })
    window.open(
      buildAppStoreUrl(APP_STORE_URL, attr.current, {
        result_id: result?.id,
        archetype_name: archetypeName,
        quiz_id: config!.id,
      }),
      '_blank', 'noopener',
    )
  }

  const result = useMemo(
    () => (phase === 'result' || phase === 'calculating') ? (cachedResult.current ?? computeResult(config, answers)) : null,
    [phase, config, answers]
  )
  const content = result ? getResultContent(result.id) : null
  const question = config.questions[currentQ]
  const progress = ((currentQ + 1) / config.questions.length) * 100

  if (phase === 'landing') {
    return (
      <main style={s.page}>
        <Nav right={<button onClick={() => handleAppStoreClick('nav_cta')} style={{ ...s.navCta, border: 'none', cursor: 'pointer' }}>Open the app</button>} />
        <div style={s.landingInner}>
          <div style={s.badge}>Reading Identity</div>
          <h1 style={s.h1}>{config.hook}</h1>
          <p style={s.subtitle}>{config.description}</p>
          <button onClick={startQuiz} style={s.primaryBtn}>Discover who you are as a reader →</button>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 16 }}>Takes two minutes. Stays with you.</p>
          <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 8, fontStyle: 'italic' }}>For readers who feel books, not just finish them.</p>

          {/* Identity preview grid */}
          <div style={{ marginTop: 52, textAlign: 'left' }}>
            <p style={{ ...s.cardLabel, textAlign: 'center', marginBottom: 18 }}>YOUR RESULT MIGHT BE</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ARCHETYPE_PREVIEWS.map((a) => (
                <div key={a.name} style={{
                  background: `linear-gradient(135deg, ${a.from} 0%, ${a.to} 100%)`,
                  border: `1px solid ${a.border}`,
                  borderRadius: 16, padding: '16px 16px',
                }}>
                  <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{a.emoji}</span>
                  <p style={{ fontSize: 13, fontWeight: 800, color: a.color, lineHeight: 1.3 }}>{a.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What you discover */}
          <div style={{
            marginTop: 32,
            background: 'rgba(212,188,255,0.07)',
            border: '1px solid rgba(212,188,255,0.18)',
            borderRadius: 20, padding: '22px 20px',
            textAlign: 'left',
          }}>
            <p style={{ ...s.cardLabel, marginBottom: 14 }}>WHAT YOU DISCOVER</p>
            {[
              'The emotional patterns behind your reading taste',
              'Books that match how you actually want to feel',
              'A precise name for the kind of reader you already are',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 2 ? 10 : 0 }}>
                <span style={{ color: 'var(--purple)', fontWeight: 800, fontSize: 13, marginTop: 1 }}>✦</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (phase === 'quiz' && question) {
    return (
      <main style={s.page}>
        <Nav right={null} />
        <div style={{ maxWidth: 560, margin: '100px auto 0', padding: '0 20px 60px' }}>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${progress}%` }} />
          </div>
          <p style={s.quizLabel}>Question {currentQ + 1} of {config.questions.length}</p>
          <p style={s.quizTagline}>{getProgressTagline(currentQ, config.questions.length)}</p>
          <h2 style={s.questionText}>{question.text}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => selectOption(question.id, opt.id)}
                  style={{ ...s.optionBtn, ...(isSelected ? s.optionBtnSelected : {}) }}
                >
                  <span style={{
                    ...s.optionDot,
                    ...(isSelected ? {
                      background: 'var(--purple)', border: '2px solid var(--purple)',
                    } : {}),
                  }} />
                  {opt.text}
                </button>
              )
            })}
          </div>
        </div>
      </main>
    )
  }

  if (phase === 'calculating') {
    return <CalculatingScreen />
  }

  if (phase === 'result' && result) {
    const ctaCopy = content?.ctaCopy ?? 'Build My Reading Feed'
    return (
      <main style={s.page}>
        <Nav right={<button onClick={() => handleAppStoreClick('nav_cta')} style={{ ...s.navCta, border: 'none', cursor: 'pointer' }}>Open the app</button>} />

        <div style={{ maxWidth: 580, margin: '0 auto 0', padding: '120px 20px 120px' }}>
          {/* Hero result card */}
          <ResultHeroCard result={result} content={content} />

          {/* Microcopy */}
          {content?.microcopy && (
            <p style={s.microcopy}>{content.microcopy}</p>
          )}

          {/* Moodboard */}
          {content?.moodTiles && content.moodTiles.length > 0 && (
            <MoodBoard tiles={content.moodTiles} />
          )}

          {/* Reading directions */}
          <div style={s.card}>
            <p style={s.cardLabel}>Books that call to you</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {result.readingDirections.map((dir, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--purple)', fontWeight: 800, marginTop: 2, flexShrink: 0 }}>✦</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.55 }}>{dir}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Similar books */}
          {content?.similarBooks && <SimilarBooksSection books={content.similarBooks} archetypeId={result.id} />}

          {/* App CTA — primary action at emotional peak */}
          <AppCtaSection
            result={result}
            content={content}
            ctaCopy={ctaCopy}
            onCtaClick={() => handleAppStoreClick('result_main_cta')}
          />

          {/* Continuation features */}
          {content?.continuationFeatures && (
            <ReadingContinuationSection features={content.continuationFeatures} />
          )}

          {/* Share */}
          {content && result && (
            <ShareResultButton
              archetypeName={content.archetypeName}
              resultId={result.id}
              sessionId={sessionId.current}
              quizId={config!.id}
            />
          )}

          {/* Email — secondary capture after primary CTA */}
          {!emailSent ? (
            <div style={s.card}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Keep your reading identity</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
                Your archetype, the books that call to it, and what your reading taste reveals — sent to your inbox.
              </p>
              <form onSubmit={submitEmail} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" required style={s.emailInput}
                />
                <button type="submit" disabled={emailLoading} style={s.emailBtn}>
                  {emailLoading ? '...' : 'Save →'}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ ...s.card, textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--purple)' }}>✓ On its way. Your reading identity, preserved.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 8 }}>
                Open the app and your identity is already waiting. Every book you encounter deepens it.
              </p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a
              href="/"
              style={{ color: 'var(--text-dim)', fontSize: 13 }}
              onClick={() => {
                if (!emailSent) {
                  trackEvent(sessionId.current, 'email_form_skipped', config!.id, { archetype: result?.id })
                }
              }}
            >Take another quiz →</a>
          </div>
        </div>

        {/* Sticky CTA */}
        <StickyCTA
          visible={stickyCta}
          ctaCopy={ctaCopy}
          onClick={handleStickyCtaClick}
        />
      </main>
    )
  }

  return null
}

// ─── Calculating Screen ──────────────────────────────────────────────────────

function CalculatingScreen() {
  const [label, setLabel] = useState('Reading your answers...')
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Fade out current label, swap text, fade back in
    const timer = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        setLabel('Something is taking shape...')
        setOpacity(1)
      }, 300)
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}>
      {/* Breathing dot */}
      <div style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: 'var(--purple)',
        animation: 'pulse 1.6s ease-in-out infinite',
      }} />
      <p style={{
        color: 'var(--text-muted)',
        fontSize: 17,
        fontWeight: 500,
        letterSpacing: '0.1px',
        transition: 'opacity 0.3s ease',
        opacity,
      }}>{label}</p>
    </main>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ResultHeroCard({ result, content }: {
  result: NonNullable<ReturnType<typeof computeResult>>
  content: ReturnType<typeof getResultContent>
}) {
  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(200,176,255,0.14) 0%, rgba(100,80,180,0.08) 60%, rgba(18,16,30,0) 100%)',
      border: '1.5px solid rgba(200,176,255,0.38)',
      borderRadius: 28, padding: '36px 28px 32px', marginBottom: 16, textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 300, height: 200,
        background: 'radial-gradient(ellipse, rgba(200,176,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <span style={{ fontSize: 56, display: 'block', marginBottom: 20 }}>{result.emoji}</span>
      {content ? (
        <>
          <h1 style={{ fontSize: 'clamp(26px,5vw,38px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 10 }}>
            {content.archetypeName}
          </h1>
          <p style={{ color: 'var(--purple)', fontWeight: 700, fontSize: 15, marginBottom: 20, lineHeight: 1.4 }}>
            {content.archetypeSubtitle}
          </p>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: 'clamp(26px,5vw,38px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 10 }}>
            {result.title}
          </h1>
          <p style={{ color: 'var(--purple)', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>{result.tagline}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65, textAlign: 'left' }}>
            {result.description}
          </p>
        </>
      )}
    </div>
  )
}

function MoodBoard({ tiles }: { tiles: import('@/lib/resultContent').MoodTile[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ ...s.cardLabel, marginBottom: 12 }}>YOUR READING TEXTURE</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map((tile, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${tile.from} 0%, ${tile.to} 100%)`,
            border: `1px solid ${tile.borderColor}`,
            borderRadius: 18, padding: '20px 18px',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            {tile.icon && (
              <span style={{ fontSize: 16, color: tile.subColor, lineHeight: 1, marginBottom: 2 }}>
                {tile.icon}
              </span>
            )}
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', color: tile.textColor, lineHeight: 1 }}>
              {tile.word}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: tile.subColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {tile.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SIMILAR_SECTION_HEADERS: Record<string, string> = {
  dark_cerebral:        'BOOKS THAT LEAVE DAMAGE BEHIND',
  momentum:             'BOOKS THAT WON\'T LET YOU STOP',
  literary_escapist:    'WORLDS WORTH DISAPPEARING INTO',
  emotional_realist:    'BOOKS THAT GET IT EXACTLY RIGHT',
  speculative_thinker:  'BOOKS THAT CHANGE HOW YOU SEE',
  quiet_intellectual:   'BOOKS WORTH READING SLOWLY',
  chaos:                'BOOKS THAT BREAK THEIR OWN RULES',
  atmospheric_explorer: 'BOOKS YOU\'LL FEEL FOR DAYS',
}

const BOOK_ROLE_LABELS: [string, string, string] = [
  'YOUR ESCAPE',
  'YOUR OBSESSION',
  'YOUR GUT PUNCH',
]

const BOOK_ROLE_LABELS_BY_ARCHETYPE: Record<string, [string, string, string]> = {
  dark_cerebral:        ['YOUR DESCENT',       'YOUR OBSESSION',   'YOUR GUT PUNCH'],
  momentum:             ['YOUR ON-RAMP',        'YOUR OBSESSION',   'YOUR GUT PUNCH'],
  literary_escapist:    ['YOUR DISAPPEARANCE',  'YOUR OBSESSION',   'YOUR GUT PUNCH'],
  emotional_realist:    ['YOUR MIRROR',         'YOUR OBSESSION',   'YOUR GUT PUNCH'],
  speculative_thinker:  ['YOUR GATEWAY',        'YOUR OBSESSION',   'YOUR AWAKENING'],
  quiet_intellectual:   ['YOUR RE-ENTRY',       'YOUR DEEP READ',   'YOUR GUT PUNCH'],
  chaos:                ['YOUR DISRUPTION',     'YOUR SPIRAL',      'YOUR GUT PUNCH'],
  atmospheric_explorer: ['YOUR IMMERSION',      'YOUR OBSESSION',   'YOUR GUT PUNCH'],
}

function SimilarBooksSection({ books, archetypeId }: { books: import('@/lib/resultContent').SimilarBook[]; archetypeId: string }) {
  const sectionHeader = SIMILAR_SECTION_HEADERS[archetypeId] ?? 'BOOKS THAT STAY WITH READERS LIKE YOU'
  const roleLabels = BOOK_ROLE_LABELS_BY_ARCHETYPE[archetypeId] ?? BOOK_ROLE_LABELS

  return (
    <div style={{ ...s.card, marginBottom: 20 }}>
      <p style={s.cardLabel}>{sectionHeader}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {books.map((book, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 36, height: 52, borderRadius: 6, flexShrink: 0,
              background: `hsl(${250 + i * 30}, 40%, 22%)`,
              border: '1px solid rgba(200,176,255,0.18)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>
              <span>📖</span>
              {(book.coverUrl || book.isbn) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl || `/api/cover?isbn=${book.isbn}`}
                  alt={book.title}
                  width={36}
                  height={52}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    if (book.isbn && img.src !== `/api/cover?isbn=${book.isbn}`) {
                      img.src = `/api/cover?isbn=${book.isbn}`
                    } else {
                      img.style.display = 'none'
                    }
                  }}
                />
              )}
            </div>
            <div>
              {i < 3 && (
                <p style={{ fontSize: 9, fontWeight: 800, color: 'var(--purple)', letterSpacing: '0.7px', marginBottom: 4 }}>
                  {roleLabels[i]}
                </p>
              )}
              <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>{book.title}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: 12, marginBottom: 4 }}>{book.author}</p>
              <p style={{ color: 'var(--purple)', fontSize: 12, fontStyle: 'italic' }}>{book.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppCtaSection({ result, content, ctaCopy, onCtaClick }: {
  result: NonNullable<ReturnType<typeof computeResult>>
  content: ReturnType<typeof getResultContent>
  ctaCopy: string
  onCtaClick: () => void
}) {
  return (
    <div style={{
      background: 'linear-gradient(160deg, var(--surface2) 0%, rgba(32,28,52,0.8) 100%)',
      border: '1.5px solid rgba(200,176,255,0.38)',
      borderRadius: 24, padding: '28px 24px', marginBottom: 20,
    }}>
      <p style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, lineHeight: 1.25, letterSpacing: '-0.5px' }}>
        The app that keeps reading you.
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
        {result.whyAppHelps}
      </p>
      <button onClick={onCtaClick} style={s.downloadBtn}>
        <AppleSvg />
        {ctaCopy}
      </button>
      <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
        Free to explore · 14 days to go deep · No commitment
      </p>
    </div>
  )
}

function ReadingContinuationSection({ features }: { features: string[] }) {
  return (
    <div style={{ ...s.card, marginBottom: 20 }}>
      <p style={s.cardLabel}>How the app reads you</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--purple)', fontSize: 13, marginTop: 1, flexShrink: 0 }}>✦</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ShareResultButton({ archetypeName, resultId, sessionId, quizId }: { archetypeName: string; resultId: string; sessionId: string; quizId: string }) {
  const [copied, setCopied] = useState(false)
  const [cardSaving, setCardSaving] = useState(false)

  async function handleSaveCard() {
    trackEvent(sessionId, 'save_card_clicked', quizId, {
      result_id: resultId,
      archetype_name: archetypeName,
    })
    // iOS Safari can't do programmatic blob downloads — open in new tab for long-press save
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isIOS) {
      const base = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
      window.open(`${base}/api/og?result=${encodeURIComponent(resultId)}&format=story`, '_blank')
      return
    }
    setCardSaving(true)
    try {
      const base = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
      const imageUrl = `${base}/api/og?result=${encodeURIComponent(resultId)}&format=story`
      // Fetch the image as a blob so we can trigger a real download
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = `my-reading-identity-${resultId}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)
    } catch {
      // Fallback: open in new tab so user can long-press to save (iOS Safari)
      const base = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
      window.open(`${base}/api/og?result=${encodeURIComponent(resultId)}&format=story`, '_blank', 'noopener')
    } finally {
      setCardSaving(false)
    }
  }

  async function handleShare() {
    trackEvent(sessionId, 'share_clicked', quizId, {
      result_id: resultId,
      archetype_name: archetypeName,
    })
    const base = typeof window !== 'undefined' ? window.location.href.split('?')[0] : ''
    const url = `${base}?result=${resultId}`
    const updatedShareText = `I got "${archetypeName}" on My Next Book — find out your reading identity:`
    const fullText = `${updatedShareText} ${url}`
    if (navigator.share) {
      try {
        await navigator.share({ title: `My reading identity: "${archetypeName}"`, text: updatedShareText, url })
        return
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  return (
    <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Primary: save the story card */}
      <button onClick={handleSaveCard} disabled={cardSaving} style={{
        width: '100%',
        background: 'rgba(200,176,255,0.14)',
        border: '1.5px solid rgba(200,176,255,0.40)',
        borderRadius: 14, padding: '17px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        color: 'var(--text)', fontSize: 15, fontWeight: 800, cursor: cardSaving ? 'wait' : 'pointer',
        opacity: cardSaving ? 0.7 : 1,
      }}>
        <span style={{ fontSize: 17 }}>{cardSaving ? '⏳' : '⬇'}</span>
        {cardSaving ? 'Saving...' : 'Save my result card'}
      </button>
      <p style={{ color: 'var(--text-dim)', fontSize: 12, textAlign: 'center', margin: '-4px 0 0', fontStyle: 'italic' }}>
        Post to TikTok, Instagram, or Stories
      </p>

      {/* Secondary: share the link */}
      <button onClick={handleShare} style={{
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 14, padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      }}>
        <span style={{ fontSize: 15 }}>{copied ? '✓' : '↗'}</span>
        {copied ? 'Link copied!' : 'Share the quiz link'}
      </button>
    </div>
  )
}

function StickyCTA({ visible, ctaCopy, onClick }: { visible: boolean; ctaCopy: string; onClick: () => void }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      padding: '12px 20px 20px',
      background: 'linear-gradient(to top, rgba(18,16,30,0.98) 60%, transparent)',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <button onClick={onClick} style={{
          ...s.downloadBtn,
          boxShadow: '0 4px 32px rgba(169,138,255,0.35)',
        }}>
          <AppleSvg />
          {ctaCopy}
        </button>
      </div>
    </div>
  )
}

function getProgressTagline(index: number, total: number): string {
  const pct = index / total
  if (pct < 0.25) return 'Reading your emotional instincts...'
  if (pct < 0.5) return 'Something is taking shape...'
  if (pct < 0.75) return 'The portrait is forming...'
  return 'Almost complete...'
}

const ARCHETYPE_PREVIEWS = [
  { name: 'Dark Cerebral Reader', emoji: '🖤', from: '#141824', to: '#0C1018', color: '#9090C8', border: 'rgba(144,144,200,0.22)' },
  { name: 'Momentum Reader', emoji: '⚡', from: '#0E1E22', to: '#081418', color: '#80D8D0', border: 'rgba(128,216,208,0.22)' },
  { name: 'Literary Escapist', emoji: '🌙', from: '#1E1638', to: '#120F22', color: '#C8B0FF', border: 'rgba(200,176,255,0.22)' },
  { name: 'Emotional Realist', emoji: '💧', from: '#221228', to: '#130A18', color: '#F0A0C8', border: 'rgba(240,160,200,0.22)' },
  { name: 'Speculative Thinker', emoji: '🔭', from: '#0E1E14', to: '#08140C', color: '#80D890', border: 'rgba(128,216,144,0.22)' },
  { name: 'Quiet Intellectual', emoji: '📐', from: '#1E1808', to: '#130F04', color: '#F0C060', border: 'rgba(240,192,96,0.22)' },
  { name: 'Chaos Reader', emoji: '🌀', from: '#1E1638', to: '#120F22', color: '#C8B0FF', border: 'rgba(200,176,255,0.22)' },
  { name: 'Atmospheric Explorer', emoji: '🌫️', from: '#141824', to: '#0C1018', color: '#9090C8', border: 'rgba(144,144,200,0.22)' },
]

function Nav({ right }: { right: React.ReactNode }) {
  return (
    <nav style={s.nav}>
      <span style={s.navLogo}>My Next Book</span>
      {right}
    </nav>
  )
}

function AppleSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 24px',
    background: 'rgba(18,16,30,0.94)', backdropFilter: 'blur(14px)',
    borderBottom: '1px solid var(--border)',
  },
  navLogo: { fontSize: 16, fontWeight: 900, letterSpacing: '-0.4px', color: 'var(--text)' },
  navCta: {
    background: 'var(--purple-btn)', color: '#120F1C',
    padding: '9px 18px', borderRadius: 100, fontSize: 13, fontWeight: 800,
  },
  landingInner: { maxWidth: 520, margin: '0 auto 0', padding: '120px 20px 80px', textAlign: 'center' },
  badge: {
    display: 'inline-block',
    background: 'rgba(200,176,255,0.16)', border: '1px solid rgba(200,176,255,0.42)',
    color: 'var(--purple)', fontSize: 11, fontWeight: 800, letterSpacing: '1.5px',
    padding: '6px 14px', borderRadius: 100, marginBottom: 24, textTransform: 'uppercase',
  },
  h1: { fontSize: 'clamp(36px,8vw,60px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20 },
  subtitle: { color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.6, marginBottom: 28 },
  primaryBtn: {
    background: 'var(--purple-btn)', color: '#120F1C', fontSize: 17, fontWeight: 800,
    padding: '16px 40px', borderRadius: 14, display: 'inline-block', marginTop: 8, cursor: 'pointer',
  },
  progressBar: { height: 4, background: 'var(--surface2)', borderRadius: 4, marginBottom: 32, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--purple)', borderRadius: 4, transition: 'width 0.3s ease' },
  quizLabel: { color: 'var(--text)', fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 4 },
  quizTagline: { color: 'var(--text-muted)', fontSize: 15, fontWeight: 500, marginBottom: 28 },
  questionText: { fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.25, marginBottom: 28 },
  optionBtn: {
    width: '100%', background: 'var(--surface)', border: '1.5px solid var(--border)',
    borderRadius: 16, padding: '18px 20px', textAlign: 'left', fontSize: 16, fontWeight: 600,
    color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
    transition: 'border-color 0.15s, background 0.15s',
  },
  optionBtnSelected: { border: '1.5px solid var(--purple)', background: 'rgba(200,176,255,0.10)' },
  optionDot: {
    width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(200,176,255,0.55)',
    flexShrink: 0, display: 'block', transition: 'background 0.15s, border-color 0.15s',
  },
  microcopy: {
    color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, fontStyle: 'italic',
    textAlign: 'center', padding: '4px 8px 20px', letterSpacing: '0.1px',
  },
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 20, padding: '24px', marginBottom: 20,
  },
  cardLabel: {
    color: 'var(--purple)', fontSize: 10, fontWeight: 800,
    letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16,
  },
  downloadBtn: {
    width: '100%', background: 'var(--purple-btn)', color: '#120F1C',
    fontSize: 16, fontWeight: 800, padding: '17px 24px', borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    cursor: 'pointer', border: 'none',
  },
  emailInput: {
    flex: 1, minWidth: 180, background: 'var(--bg2)', border: '1px solid var(--border-strong)',
    borderRadius: 10, padding: '12px 16px', fontSize: 14, color: 'var(--text)', outline: 'none',
  },
  emailBtn: {
    background: 'rgba(200,176,255,0.22)', border: '1px solid rgba(200,176,255,0.50)',
    color: 'var(--text)', fontSize: 14, fontWeight: 700, padding: '12px 20px',
    borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap',
  },
}
