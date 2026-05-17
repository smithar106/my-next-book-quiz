'use client'

import { useState, useEffect, useRef } from 'react'
import { getQuiz, computeResult } from '@/lib/quizzes'
import { parseAttribution, storeAttribution, getStoredAttribution, buildAppStoreUrl } from '@/lib/attribution'
import {
  trackEvent, createSession, saveAnswers, saveResult, captureEmail, genSessionId,
} from '@/lib/tracking'
import type { Attribution } from '@/types/quiz'

const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/app/apple-store/id6743767654'

type Phase = 'landing' | 'quiz' | 'result'

interface Props {
  slug: string
  rawParams: Record<string, string>
}

export function QuizClient({ slug, rawParams }: Props) {
  const config = getQuiz(slug)
  const [phase, setPhase] = useState<Phase>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const sessionId = useRef(genSessionId())
  const attr = useRef<Attribution>({})

  useEffect(() => {
    if (!config) return
    const params = new URLSearchParams(rawParams as Record<string, string>)
    const parsed = parseAttribution(params)
    const stored = getStoredAttribution()
    attr.current = { ...stored, ...parsed }
    storeAttribution(attr.current)
    trackEvent(sessionId.current, 'page_view', config.id, { quiz_id: config.id, ...attr.current })
  }, [config, rawParams])

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
    trackEvent(sessionId.current, 'quiz_question_answered', config!.id, {
      question_id: questionId, option_id: optionId, question_index: currentQ,
    })
    setTimeout(() => {
      if (currentQ < config!.questions.length - 1) {
        setCurrentQ((q) => q + 1)
      } else {
        finishQuiz(next)
      }
    }, 240)
  }

  function finishQuiz(finalAnswers: Record<string, string>) {
    const result = computeResult(config!, finalAnswers)
    if (result) {
      saveAnswers(sessionId.current, config!.id, finalAnswers)
      saveResult(sessionId.current, config!.id, result.id)
      trackEvent(sessionId.current, 'quiz_completed', config!.id, { result_id: result.id })
      trackEvent(sessionId.current, 'result_viewed', config!.id, { result_id: result.id })
    }
    setPhase('result')
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email || emailLoading) return
    setEmailLoading(true)
    const result = computeResult(config!, answers)
    if (result) {
      await captureEmail(sessionId.current, config!.id, email, result.id, attr.current)
      trackEvent(sessionId.current, 'email_submitted', config!.id, { result_id: result.id })
    }
    setEmailSent(true)
    setEmailLoading(false)
  }

  function handleAppStoreClick() {
    trackEvent(sessionId.current, 'app_store_clicked', config!.id, { source: 'result_cta' })
    window.open(buildAppStoreUrl(APP_STORE_URL, attr.current), '_blank', 'noopener')
  }

  const result = phase === 'result' ? computeResult(config, answers) : null
  const question = config.questions[currentQ]
  const progress = (currentQ / config.questions.length) * 100

  if (phase === 'landing') {
    return (
      <main style={s.page}>
        <Nav right={<a href={APP_STORE_URL} style={s.navCta}>Download Free</a>} />
        <div style={s.landingInner}>
          <div style={s.badge}>BOOK QUIZ</div>
          <h1 style={s.h1}>{config.hook}</h1>
          <p style={s.subtitle}>{config.description}</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={s.pill}>📖 {config.questions.length} quick questions</span>
            <span style={s.pill}>⚡ 2 minutes</span>
            <span style={s.pill}>🎯 Personalized results</span>
          </div>
          <button onClick={startQuiz} style={s.primaryBtn}>Start the quiz →</button>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 16 }}>Free · No sign-up required</p>
        </div>
      </main>
    )
  }

  if (phase === 'quiz' && question) {
    return (
      <main style={s.page}>
        <Nav right={<span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{currentQ + 1} / {config.questions.length}</span>} />
        <div style={{ maxWidth: 560, margin: '100px auto 0', padding: '0 20px 60px' }}>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${progress}%` }} />
          </div>
          <p style={s.quizLabel}>{config.title}</p>
          <h2 style={s.questionText}>{question.text}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => selectOption(question.id, opt.id)}
                style={{ ...s.optionBtn, ...(answers[question.id] === opt.id ? s.optionBtnSelected : {}) }}
              >
                <span style={s.optionDot} />
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (phase === 'result' && result) {
    return (
      <main style={s.page}>
        <Nav right={<a href={APP_STORE_URL} style={s.navCta}>Download Free</a>} />
        <div style={{ maxWidth: 560, margin: '100px auto 0', padding: '0 20px 80px' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 24 }}>Your result from {config.title}</p>

          {/* Result card */}
          <div style={s.resultCard}>
            <span style={{ fontSize: 52, marginBottom: 16, display: 'block' }}>{result.emoji}</span>
            <h1 style={s.resultTitle}>{result.title}</h1>
            <p style={{ color: 'var(--purple)', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>{result.tagline}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65, textAlign: 'left' }}>{result.description}</p>
          </div>

          {/* Reading directions */}
          <div style={s.card}>
            <p style={s.cardLabel}>Your reading directions</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.readingDirections.map((dir, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--purple)', fontWeight: 800, marginTop: 1 }}>✦</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.5 }}>{dir}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* App CTA */}
          <div style={s.appCta}>
            <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, lineHeight: 1.3 }}>
              Get your personalized book recommendations in My Next Book
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
              {result.whyAppHelps}
            </p>
            <button onClick={handleAppStoreClick} style={s.downloadBtn}>
              <AppleSvg />
              Download My Next Book — Free
            </button>
            <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 12 }}>Free to start · 7-day Pro trial</p>
          </div>

          {/* Email capture */}
          {!emailSent ? (
            <div style={s.card}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Get your result by email</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>Save your reading personality for later — optional.</p>
              <form onSubmit={submitEmail} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" required style={s.emailInput}
                />
                <button type="submit" disabled={emailLoading} style={s.emailBtn}>
                  {emailLoading ? '...' : 'Send →'}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ ...s.card, textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--purple)' }}>✓ Saved! Now go download the app.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="/" style={{ color: 'var(--text-dim)', fontSize: 13 }}>Take another quiz →</a>
          </div>
        </div>
      </main>
    )
  }

  return null
}

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
    background: 'rgba(11,10,18,0.92)', backdropFilter: 'blur(14px)',
    borderBottom: '1px solid var(--border)',
  },
  navLogo: { fontSize: 16, fontWeight: 900, letterSpacing: '-0.4px', color: 'var(--text)' },
  navCta: {
    background: 'var(--purple-btn)', color: '#120F1C',
    padding: '9px 18px', borderRadius: 100, fontSize: 13, fontWeight: 800,
  },
  landingInner: {
    maxWidth: 520, margin: '120px auto 0', padding: '0 20px 80px', textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(182,156,255,0.12)', border: '1px solid rgba(182,156,255,0.32)',
    color: 'var(--purple)', fontSize: 11, fontWeight: 800, letterSpacing: '1.5px',
    padding: '6px 14px', borderRadius: 100, marginBottom: 24, textTransform: 'uppercase',
  },
  h1: { fontSize: 'clamp(36px,8vw,60px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20 },
  subtitle: { color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.6, marginBottom: 28 },
  pill: {
    background: 'rgba(182,156,255,0.08)', border: '1px solid rgba(182,156,255,0.20)',
    color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 100,
  },
  primaryBtn: {
    background: 'var(--purple-btn)', color: '#120F1C', fontSize: 17, fontWeight: 800,
    padding: '16px 40px', borderRadius: 14, display: 'inline-block', marginTop: 8, cursor: 'pointer',
  },
  progressBar: { height: 4, background: 'var(--surface2)', borderRadius: 4, marginBottom: 32, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--purple)', borderRadius: 4, transition: 'width 0.3s ease' },
  quizLabel: { color: 'var(--purple)', fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 24 },
  questionText: { fontSize: 'clamp(22px,4vw,30px)', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.25, marginBottom: 28 },
  optionBtn: {
    width: '100%', background: 'var(--surface)', border: '1.5px solid var(--border)',
    borderRadius: 16, padding: '18px 20px', textAlign: 'left', fontSize: 16, fontWeight: 600,
    color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
  },
  optionBtnSelected: { borderColor: 'var(--purple)', background: 'rgba(182,156,255,0.08)' },
  optionDot: {
    width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(182,156,255,0.4)',
    flexShrink: 0, display: 'block',
  },
  resultCard: {
    background: 'linear-gradient(135deg, rgba(182,156,255,0.12) 0%, rgba(123,95,212,0.08) 100%)',
    border: '1.5px solid rgba(182,156,255,0.35)', borderRadius: 24,
    padding: '32px 28px', marginBottom: 20, textAlign: 'center',
  },
  resultTitle: { fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 10 },
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 20, padding: '24px', marginBottom: 20,
  },
  cardLabel: {
    color: 'var(--purple)', fontSize: 11, fontWeight: 800,
    letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16,
  },
  appCta: {
    background: 'var(--surface2)', border: '1.5px solid rgba(182,156,255,0.30)',
    borderRadius: 24, padding: '28px 24px', marginBottom: 20,
  },
  downloadBtn: {
    width: '100%', background: 'var(--purple-btn)', color: '#120F1C',
    fontSize: 16, fontWeight: 800, padding: '17px 24px', borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', border: 'none',
  },
  emailInput: {
    flex: 1, minWidth: 180, background: 'var(--bg2)', border: '1px solid var(--border-strong)',
    borderRadius: 10, padding: '12px 16px', fontSize: 14, color: 'var(--text)', outline: 'none',
  },
  emailBtn: {
    background: 'rgba(182,156,255,0.18)', border: '1px solid rgba(182,156,255,0.40)',
    color: 'var(--text)', fontSize: 14, fontWeight: 700, padding: '12px 20px',
    borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap',
  },
}
