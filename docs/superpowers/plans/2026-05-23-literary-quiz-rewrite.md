# Literary Quiz Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the quiz from a startup recommendation funnel into a psychologically intelligent literary reflection experience — users should feel "this app understands the emotional patterns behind what I read," not "this app recommends books."

**Architecture:** All copy and question content lives in `lib/quizzes.ts` and `lib/resultContent.ts`. The UI shell in `components/QuizClient.tsx` needs targeted language/label updates but its structure stays intact. `app/page.tsx` gets a new hero. No new files needed. Analytics, attribution, and App Store redirect are untouched.

**Tech Stack:** Next.js 15, TypeScript, inline CSS-in-JS styles, Resend (email), Supabase (analytics)

---

## File Map

| File | What changes |
|---|---|
| `app/page.tsx` | Hero: badge label, headline, subhead, CTA copy |
| `components/QuizClient.tsx` | Landing: badge, pills, CTA button, preview section labels + names; Quiz: progress taglines; Result: section labels, CTA section headline, email capture copy |
| `lib/quizzes.ts` | All 6 quiz `hook`, `description`, all questions text + options, all result `tagline` + `description` + `readingDirections` + `whyAppHelps` — for WHAT_NEXT and BOOK_PERSONALITY (the two primary literary quizzes). BOOKTOK/READING_SLUMP/GENRE_MATCH/READING_PERSONALITY hooks get lighter updates. |
| `lib/resultContent.ts` | All 8 identity `archetypeSubtitle`, `microcopy`, `shareText`, `ctaCopy`, `continuationFeatures` strings |

---

## Task 1: Hero page + landing shell copy

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/QuizClient.tsx:150-206` (landing phase)

- [ ] **Step 1: Update `app/page.tsx` hero**

Replace the full file content:

```tsx
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
            Reading Identity
          </div>
          <h1 style={{ fontSize: 'clamp(32px,7vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
            The books you love<br /><span style={{ color: 'var(--purple)' }}>aren't random.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.6 }}>
            Answer a few questions and discover the emotional patterns behind your reading taste.
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
```

- [ ] **Step 2: Update the landing phase in `components/QuizClient.tsx`**

Replace lines 150–206 (the `if (phase === 'landing')` block):

```tsx
  if (phase === 'landing') {
    return (
      <main style={s.page}>
        <Nav right={<a href={APP_STORE_URL} style={s.navCta}>Download Free</a>} />
        <div style={s.landingInner}>
          <div style={s.badge}>Reading Identity</div>
          <h1 style={s.h1}>{config.hook}</h1>
          <p style={s.subtitle}>{config.description}</p>
          <button onClick={startQuiz} style={s.primaryBtn}>Find my reading identity →</button>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 16 }}>Free · No sign-up required</p>
          <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 8, fontStyle: 'italic' }}>Built for readers who care how books feel.</p>

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
```

- [ ] **Step 3: Commit**

```bash
cd ~/my-next-book-quiz
git add app/page.tsx components/QuizClient.tsx
git commit -m "feat: literary landing — badge, CTA, preview section labels"
```

---

## Task 2: Quiz phase copy (progress taglines + question/result section labels)

**Files:**
- Modify: `components/QuizClient.tsx:577-583` (getProgressTagline)
- Modify: `components/QuizClient.tsx:242-340` (result phase section labels)

- [ ] **Step 1: Replace `getProgressTagline` (line 577)**

```tsx
function getProgressTagline(index: number, total: number): string {
  const pct = index / total
  if (pct < 0.25) return 'Mapping your emotional instincts...'
  if (pct < 0.5) return 'Getting more precise...'
  if (pct < 0.75) return 'The pattern is forming...'
  return 'Almost there...'
}
```

- [ ] **Step 2: Update result section labels in `components/QuizClient.tsx`**

Change `"Your reading directions"` → `"Books that call to you"` (line ~264):
```tsx
<p style={s.cardLabel}>Books that call to you</p>
```

Change `"Readers like you obsess over"` → `"Books that stay with readers like you"` (in `SimilarBooksSection`, line ~424):
```tsx
<p style={s.cardLabel}>Books that stay with readers like you</p>
```

Change `"Inside My Next Book"` → `"How the app reads you"` (in `ReadingContinuationSection`, line ~494):
```tsx
<p style={s.cardLabel}>How the app reads you</p>
```

- [ ] **Step 3: Update `AppCtaSection` headline and sub copy (line ~474)**

Replace:
```tsx
<p style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, lineHeight: 1.25, letterSpacing: '-0.5px' }}>
  Your feed, tuned to exactly this.
</p>
<p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
  {result.whyAppHelps}
</p>
```

With:
```tsx
<p style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, lineHeight: 1.25, letterSpacing: '-0.5px' }}>
  The app that keeps reading you.
</p>
<p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
  {result.whyAppHelps}
</p>
```

- [ ] **Step 4: Update email capture copy (line ~305)**

Replace:
```tsx
<p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Get your full reading identity breakdown</p>
<p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
  Your reader type, the books that match it, and what it says about how you read — delivered to your inbox.
</p>
```

With:
```tsx
<p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Save your result</p>
<p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
  Get your reading identity, the books that match it, and what your taste reveals — sent to your inbox.
</p>
```

- [ ] **Step 5: Commit**

```bash
cd ~/my-next-book-quiz
git add components/QuizClient.tsx
git commit -m "feat: literary quiz copy — progress taglines, result section labels, CTA section"
```

---

## Task 3: Rewrite WHAT_NEXT quiz — hook, description, questions, results

**Files:**
- Modify: `lib/quizzes.ts:6-152` (WHAT_NEXT config)

This is the primary quiz. Full rewrite of hook, description, all 6 questions with new emotionally observant options, and all 8 result taglines/descriptions/readingDirections/whyAppHelps.

- [ ] **Step 1: Replace WHAT_NEXT questions and metadata (lines 6–152)**

Replace the entire WHAT_NEXT const with:

```ts
const WHAT_NEXT: QuizConfig = {
  id: 'what-should-i-read-next',
  slug: 'what-should-i-read-next',
  title: 'What Should I Read Next?',
  hook: 'The books you love aren\'t random.',
  description: 'Answer a few questions and discover the emotional patterns behind your reading taste.',
  questions: [
    {
      id: 'feel',
      text: 'What do you want your next book to feel like?',
      options: [
        { id: 'a', text: 'Impossible to put down', scores: { momentum: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'Emotionally devastating', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'c', text: 'Quietly haunting', scores: { atmospheric_explorer: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'Intellectually sharp', scores: { dark_cerebral: 2, quiet_intellectual: 2 } },
        { id: 'e', text: 'Strange and unforgettable', scores: { chaos: 3, speculative_thinker: 1 } },
        { id: 'f', text: 'Emotionally dangerous', scores: { dark_cerebral: 3, emotional_realist: 1 } },
      ],
    },
    {
      id: 'ruiner',
      text: 'What usually ruins a book for you?',
      options: [
        { id: 'a', text: 'Predictable emotions', scores: { chaos: 2, dark_cerebral: 1 } },
        { id: 'b', text: 'Flat characters', scores: { emotional_realist: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'Weak prose', scores: { quiet_intellectual: 3, dark_cerebral: 1 } },
        { id: 'd', text: 'Emotional shallowness', scores: { emotional_realist: 2, atmospheric_explorer: 2 } },
        { id: 'e', text: 'Slow pacing', scores: { momentum: 3 } },
        { id: 'f', text: 'No emotional tension', scores: { dark_cerebral: 2, emotional_realist: 1 } },
      ],
    },
    {
      id: 'lingers',
      text: 'What kind of book do you think about days later?',
      options: [
        { id: 'a', text: 'Emotionally painful books', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'Big-idea fiction', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'Psychological character studies', scores: { dark_cerebral: 2, quiet_intellectual: 2 } },
        { id: 'd', text: 'Books with beautiful prose', scores: { quiet_intellectual: 3, atmospheric_explorer: 1 } },
        { id: 'e', text: 'Strange speculative fiction', scores: { chaos: 2, speculative_thinker: 2 } },
        { id: 'f', text: 'Stories that feel emotionally true', scores: { emotional_realist: 2, literary_escapist: 2 } },
      ],
    },
    {
      id: 'satisfaction',
      text: 'What kind of reading experience feels most satisfying?',
      options: [
        { id: 'a', text: 'Feeling emotionally destroyed', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'Feeling intellectually expanded', scores: { speculative_thinker: 2, quiet_intellectual: 2 } },
        { id: 'c', text: 'Escaping completely', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'd', text: 'Becoming obsessed', scores: { momentum: 2, dark_cerebral: 2 } },
        { id: 'e', text: 'Sitting with ambiguity', scores: { quiet_intellectual: 2, chaos: 2 } },
        { id: 'f', text: 'Feeling emotionally seen', scores: { emotional_realist: 3 } },
      ],
    },
    {
      id: 'protagonist',
      text: 'What kind of protagonist do you keep returning to?',
      options: [
        { id: 'a', text: 'Emotionally isolated', scores: { dark_cerebral: 2, atmospheric_explorer: 2 } },
        { id: 'b', text: 'Morally conflicted', scores: { dark_cerebral: 2, chaos: 2 } },
        { id: 'c', text: 'Brilliant but unstable', scores: { dark_cerebral: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'Quiet observers', scores: { quiet_intellectual: 3, atmospheric_explorer: 1 } },
        { id: 'e', text: 'Outsiders', scores: { emotional_realist: 2, chaos: 2 } },
        { id: 'f', text: 'Emotionally repressed characters', scores: { atmospheric_explorer: 2, emotional_realist: 2 } },
      ],
    },
    {
      id: 'ending',
      text: 'What kind of ending feels most honest to you?',
      options: [
        { id: 'a', text: 'The kind that destroys me emotionally', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'A shocking twist I never saw coming', scores: { momentum: 2, chaos: 2 } },
        { id: 'c', text: 'Open-ended — I want to keep thinking about it', scores: { quiet_intellectual: 2, speculative_thinker: 2 } },
        { id: 'd', text: 'Lingering mood — more feeling than resolution', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'e', text: 'No resolution — life is ambiguous', scores: { chaos: 2, quiet_intellectual: 2 } },
        { id: 'f', text: 'Earned and emotionally true', scores: { emotional_realist: 3 } },
      ],
    },
  ],
  results: [
    {
      id: 'dark_cerebral',
      title: 'Dark Cerebral Reader',
      emoji: '🖤',
      tagline: 'You gravitate toward books that feel emotionally dangerous but intellectually precise.',
      description: 'You don\'t read for comfort. You read for books that disturb you in productive ways — dark enough to stay with you, precise enough to trust.',
      readingDirections: [
        'Literary fiction with psychological depth and a dark undercurrent',
        'Novels where intelligence and emotional intensity are inseparable',
        'Stories that make you uncomfortable in ways you can\'t stop thinking about',
      ],
      whyAppHelps: 'My Next Book observes the emotional patterns behind every book you save or skip — learning exactly where your cerebral-dark threshold lives.',
    },
    {
      id: 'momentum',
      title: 'Momentum Reader',
      emoji: '⚡',
      tagline: 'You read to be pulled forward. The best books make you miss your stop.',
      description: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
      readingDirections: [
        'Propulsive fiction that earns its pace',
        'Thrillers where the tension never loosens',
        'Stories that make the outside world disappear',
      ],
      whyAppHelps: 'My Next Book learns how fast you need a story to move — and keeps that instinct sharp with every swipe.',
    },
    {
      id: 'literary_escapist',
      title: 'Literary Escapist',
      emoji: '🌙',
      tagline: 'You read to disappear into worlds so fully realized they feel more real than your own.',
      description: 'Atmosphere is everything. The right sentence can pull you somewhere else entirely — and the best books never fully let you return.',
      readingDirections: [
        'Immersive fiction where place becomes a character',
        'Atmospheric literary novels with a world you can vanish into',
        'Historical fiction where the past feels more vivid than the present',
      ],
      whyAppHelps: 'My Next Book tracks the atmospheric and immersive qualities you respond to — so your feed is always somewhere to disappear into.',
    },
    {
      id: 'emotional_realist',
      title: 'Emotional Realist',
      emoji: '💧',
      tagline: 'You read to feel understood. The books that stay with you get human experience exactly right.',
      description: 'You read for the quietly devastating moments. The grief that isn\'t dramatic. The love that doesn\'t resolve. Books that get the texture of life right.',
      readingDirections: [
        'Contemporary fiction with raw emotional honesty',
        'Character studies that find the extraordinary in ordinary pain',
        'Family drama that doesn\'t look away from what\'s difficult',
      ],
      whyAppHelps: 'My Next Book observes your preference for emotional truth — and surfaces fiction that earns that kind of feeling.',
    },
    {
      id: 'speculative_thinker',
      title: 'Speculative Thinker',
      emoji: '🔭',
      tagline: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
      description: 'You prefer books that use invented worlds to say true things. The best speculative fiction makes you see the real world differently — and you can\'t unsee it.',
      readingDirections: [
        'Speculative fiction that extrapolates ideas to their unsettling conclusions',
        'Sci-fi that uses the future to illuminate what we\'re already doing',
        'Stories that build entire systems of meaning from a single premise',
      ],
      whyAppHelps: 'My Next Book tracks your appetite for idea-driven, assumption-challenging fiction — and sharpens it with every book you respond to.',
    },
    {
      id: 'quiet_intellectual',
      title: 'Quiet Intellectual',
      emoji: '📐',
      tagline: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
      description: 'You return to sentences. You notice construction. You prefer books that reward full attention — ones that reveal more the second time you read them.',
      readingDirections: [
        'Dense literary fiction that assumes an attentive reader',
        'Prose-driven novels where every sentence is doing work',
        'Essays that demand and return the effort you give them',
      ],
      whyAppHelps: 'My Next Book notes every signal that you prefer depth over pace — and filters your feed accordingly.',
    },
    {
      id: 'chaos',
      title: 'Chaos Reader',
      emoji: '🌀',
      tagline: 'You read to be surprised. Predictability is the only thing that can lose you.',
      description: 'You want books that break their own rules. Stories that shift beneath your feet. Endings that arrive somewhere you couldn\'t have predicted — and that feel truer for it.',
      readingDirections: [
        'Experimental fiction that dismantles expectations as it goes',
        'Surreal narratives that resist easy interpretation',
        'Genre-bending novels that are impossible to categorize',
      ],
      whyAppHelps: 'My Next Book learns your appetite for the unexpected — and keeps your feed from ever becoming predictable.',
    },
    {
      id: 'atmospheric_explorer',
      title: 'Atmospheric Explorer',
      emoji: '🌫️',
      tagline: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
      description: 'A specific texture of light. A sense of cold. A tone you can\'t fully name. The books that stay with you longest aren\'t the ones with the best plots — they\'re the ones with the most distinctive feeling.',
      readingDirections: [
        'Atmospheric fiction where mood accumulates slowly and stays',
        'Gothic novels where setting and dread are inseparable',
        'Slow literary fiction where feeling is the primary event',
      ],
      whyAppHelps: 'My Next Book observes the atmospheric qualities you respond to — and builds a feed around how books make you feel, not just what they\'re about.',
    },
  ],
  resultLogic: (scores) => {
    const keys = ['dark_cerebral', 'momentum', 'literary_escapist', 'emotional_realist', 'speculative_thinker', 'quiet_intellectual', 'chaos', 'atmospheric_explorer'] as const
    return keys.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/my-next-book-quiz && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing unrelated errors).

- [ ] **Step 3: Commit**

```bash
cd ~/my-next-book-quiz
git add lib/quizzes.ts
git commit -m "feat: rewrite WHAT_NEXT quiz — literary questions, emotionally precise results"
```

---

## Task 4: Rewrite BOOK_PERSONALITY quiz — questions, results

**Files:**
- Modify: `lib/quizzes.ts:154-300` (BOOK_PERSONALITY config)

- [ ] **Step 1: Replace BOOK_PERSONALITY questions and hook/description (lines 154-300)**

Replace the BOOK_PERSONALITY const (from `const BOOK_PERSONALITY: QuizConfig = {` to the closing `}`):

```ts
const BOOK_PERSONALITY: QuizConfig = {
  id: 'book-personality',
  slug: 'book-personality',
  title: 'Book Personality Quiz',
  hook: 'Your taste says more about you than you think.',
  description: 'Discover the emotional and intellectual instincts shaping what you read.',
  questions: [
    {
      id: 'bp-q1',
      text: 'What kind of emotional experience are you secretly searching for?',
      options: [
        { id: 'a', text: 'To be completely transported', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'b', text: 'To feel something I can\'t feel elsewhere', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'c', text: 'To have my assumptions taken apart', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'To be unable to stop reading', scores: { momentum: 3, chaos: 1 } },
      ],
    },
    {
      id: 'bp-q2',
      text: 'What kind of book lingers in your head afterward?',
      options: [
        { id: 'a', text: 'One that left emotional residue I couldn\'t shake', scores: { atmospheric_explorer: 3, emotional_realist: 1 } },
        { id: 'b', text: 'One that made me see the world differently', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'One that made me feel deeply understood', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'One that disturbed me in a specific, precise way', scores: { dark_cerebral: 3, quiet_intellectual: 1 } },
      ],
    },
    {
      id: 'bp-q3',
      text: 'You put a book down and never go back when:',
      options: [
        { id: 'a', text: 'The atmosphere never materializes', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'b', text: 'Nothing about it surprises me', scores: { chaos: 3, momentum: 1 } },
        { id: 'c', text: 'I don\'t feel anything for the characters', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'The prose feels unambitious', scores: { quiet_intellectual: 3, dark_cerebral: 1 } },
      ],
    },
    {
      id: 'bp-q4',
      text: 'A book becomes unforgettable when:',
      options: [
        { id: 'a', text: 'It altered something in how I see the world', scores: { speculative_thinker: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'A mood from it stayed with me for days', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'c', text: 'I recognized myself somewhere I didn\'t expect to', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'It ended somewhere I never could have predicted', scores: { chaos: 3, momentum: 1 } },
      ],
    },
    {
      id: 'bp-q5',
      text: 'What do you want your next book to leave you with?',
      options: [
        { id: 'a', text: 'A specific emotional texture I can\'t name', scores: { atmospheric_explorer: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'The satisfaction of a story that couldn\'t stop', scores: { momentum: 3 } },
        { id: 'c', text: 'Something I\'m still thinking about a week later', scores: { quiet_intellectual: 2, speculative_thinker: 2 } },
        { id: 'd', text: 'The feeling of being emotionally wrecked', scores: { emotional_realist: 2, dark_cerebral: 2 } },
      ],
    },
    {
      id: 'bp-q6',
      text: 'What kind of ending feels most honest to you?',
      options: [
        { id: 'a', text: 'Emotionally devastating — I want to feel wrecked', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'Ambiguous — life doesn\'t resolve neatly', scores: { chaos: 2, quiet_intellectual: 2 } },
        { id: 'c', text: 'Lingering — a mood rather than a conclusion', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'd', text: 'Something I never saw coming', scores: { chaos: 2, momentum: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'dark_cerebral',
      title: 'Dark Cerebral Reader',
      emoji: '🖤',
      tagline: 'You gravitate toward books that feel emotionally dangerous but intellectually precise.',
      description: 'You don\'t read for comfort. You read for books that disturb you in productive ways — dark enough to stay with you, precise enough to trust.',
      readingDirections: [
        'Literary fiction with psychological depth and a dark undercurrent',
        'Novels where intelligence and emotional intensity are inseparable',
        'Stories that make you uncomfortable in ways you can\'t stop thinking about',
      ],
      whyAppHelps: 'My Next Book observes the emotional patterns behind every book you save or skip — learning exactly where your cerebral-dark threshold lives.',
    },
    {
      id: 'momentum',
      title: 'Momentum Reader',
      emoji: '⚡',
      tagline: 'You read to be pulled forward. The best books make you miss your stop.',
      description: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
      readingDirections: [
        'Propulsive fiction that earns its pace',
        'Thrillers where the tension never loosens',
        'Stories that make the outside world disappear',
      ],
      whyAppHelps: 'My Next Book learns how fast you need a story to move — and keeps that instinct sharp with every swipe.',
    },
    {
      id: 'literary_escapist',
      title: 'Literary Escapist',
      emoji: '🌙',
      tagline: 'You read to disappear into worlds so fully realized they feel more real than your own.',
      description: 'Atmosphere is everything. The right sentence can pull you somewhere else entirely — and the best books never fully let you return.',
      readingDirections: [
        'Immersive fiction where place becomes a character',
        'Atmospheric literary novels with a world you can vanish into',
        'Historical fiction where the past feels more vivid than the present',
      ],
      whyAppHelps: 'My Next Book tracks the atmospheric and immersive qualities you respond to — so your feed is always somewhere to disappear into.',
    },
    {
      id: 'emotional_realist',
      title: 'Emotional Realist',
      emoji: '💧',
      tagline: 'You read to feel understood. The books that stay with you get human experience exactly right.',
      description: 'You read for the quietly devastating moments. The grief that isn\'t dramatic. The love that doesn\'t resolve. Books that get the texture of life right.',
      readingDirections: [
        'Contemporary fiction with raw emotional honesty',
        'Character studies that find the extraordinary in ordinary pain',
        'Family drama that doesn\'t look away from what\'s difficult',
      ],
      whyAppHelps: 'My Next Book observes your preference for emotional truth — and surfaces fiction that earns that kind of feeling.',
    },
    {
      id: 'speculative_thinker',
      title: 'Speculative Thinker',
      emoji: '🔭',
      tagline: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
      description: 'You prefer books that use invented worlds to say true things. The best speculative fiction makes you see the real world differently — and you can\'t unsee it.',
      readingDirections: [
        'Speculative fiction that extrapolates ideas to their unsettling conclusions',
        'Sci-fi that uses the future to illuminate what we\'re already doing',
        'Stories that build entire systems of meaning from a single premise',
      ],
      whyAppHelps: 'My Next Book tracks your appetite for idea-driven, assumption-challenging fiction — and sharpens it with every book you respond to.',
    },
    {
      id: 'quiet_intellectual',
      title: 'Quiet Intellectual',
      emoji: '📐',
      tagline: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
      description: 'You return to sentences. You notice construction. You prefer books that reward full attention — ones that reveal more the second time you read them.',
      readingDirections: [
        'Dense literary fiction that assumes an attentive reader',
        'Prose-driven novels where every sentence is doing work',
        'Essays that demand and return the effort you give them',
      ],
      whyAppHelps: 'My Next Book notes every signal that you prefer depth over pace — and filters your feed accordingly.',
    },
    {
      id: 'chaos',
      title: 'Chaos Reader',
      emoji: '🌀',
      tagline: 'You read to be surprised. Predictability is the only thing that can lose you.',
      description: 'You want books that break their own rules. Stories that shift beneath your feet. Endings that arrive somewhere you couldn\'t have predicted — and that feel truer for it.',
      readingDirections: [
        'Experimental fiction that dismantles expectations as it goes',
        'Surreal narratives that resist easy interpretation',
        'Genre-bending novels that are impossible to categorize',
      ],
      whyAppHelps: 'My Next Book learns your appetite for the unexpected — and keeps your feed from ever becoming predictable.',
    },
    {
      id: 'atmospheric_explorer',
      title: 'Atmospheric Explorer',
      emoji: '🌫️',
      tagline: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
      description: 'A specific texture of light. A sense of cold. A tone you can\'t fully name. The books that stay with you longest aren\'t the ones with the best plots — they\'re the ones with the most distinctive feeling.',
      readingDirections: [
        'Atmospheric fiction where mood accumulates slowly and stays',
        'Gothic novels where setting and dread are inseparable',
        'Slow literary fiction where feeling is the primary event',
      ],
      whyAppHelps: 'My Next Book observes the atmospheric qualities you respond to — and builds a feed around how books make you feel, not just what they\'re about.',
    },
  ],
  resultLogic: (scores) => {
    const keys = ['dark_cerebral', 'momentum', 'literary_escapist', 'emotional_realist', 'speculative_thinker', 'quiet_intellectual', 'chaos', 'atmospheric_explorer'] as const
    return keys.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/my-next-book-quiz
git add lib/quizzes.ts
git commit -m "feat: rewrite BOOK_PERSONALITY quiz — emotionally observant questions and results"
```

---

## Task 5: Rewrite `resultContent.ts` — all 8 identity subtitles, microcopy, shareText, ctaCopy, continuationFeatures

**Files:**
- Modify: `lib/resultContent.ts:77-end` (RESULT_CONTENT record)

No structural changes — only the string values inside each identity block.

- [ ] **Step 1: Replace all string values in RESULT_CONTENT**

Replace the entire `RESULT_CONTENT` record (from `const RESULT_CONTENT: Record<string, ResultContent> = {` to closing `}`) — keeping all keys, moodTiles, and similarBooks exactly as-is, only updating the text fields:

For `dark_cerebral`:
```ts
archetypeName: 'The Dark Cerebral Reader',
archetypeSubtitle: 'You read to feel intellectually alive — dark enough to stay with you, precise enough to trust.',
microcopy: 'You don\'t read for comfort. You read for books that disturb you in productive ways.',
shareText: 'I got "The Dark Cerebral Reader" on My Next Book 📚 Apparently I only want books that disturb me in intellectually precise ways. What does your reading taste reveal?',
ctaCopy: 'Find books that disturb me correctly',
continuationFeatures: [
  'My Next Book tracks the emotional intensity patterns behind what you save — learning your exact cerebral-dark threshold.',
  'Every book you respond to sharpens the map of your reading taste across 14 emotional dimensions.',
  'Your reading identity deepens as you use it — the app observes, interprets, and reflects back who you\'re becoming as a reader.',
  'The more you interact, the more precisely it reads you.',
],
```

For `momentum`:
```ts
archetypeName: 'The Momentum Reader',
archetypeSubtitle: 'You read to be pulled forward. The best books make you miss your stop.',
microcopy: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
shareText: 'I got "The Momentum Reader" on My Next Book 📚 Apparently I only want books that make me miss my stop. What does your reading taste reveal?',
ctaCopy: 'Find books I can\'t put down',
continuationFeatures: [
  'My Next Book tracks your pacing instincts — and filters out books that lose momentum before they find it.',
  'Every time you dismiss a slow opener, the app notes it and adjusts.',
  'Your reading taste deepens as you use it — the app builds a map of how fast you need things to move.',
  'The more you interact, the more precisely it reads you.',
],
```

For `literary_escapist`:
```ts
archetypeName: 'The Literary Escapist',
archetypeSubtitle: 'You read to disappear into worlds so fully realized they feel more real than your own.',
microcopy: 'Atmosphere is everything. The right sentence can transport you somewhere you\'ve never been.',
shareText: 'I got "The Literary Escapist" on My Next Book 📚 Apparently I just want to disappear into beautifully realized worlds. What does your reading taste reveal?',
ctaCopy: 'Find my next world to vanish into',
continuationFeatures: [
  'My Next Book tracks the atmospheric and immersive qualities you respond to — building a map of what makes a world feel real to you.',
  'Every book you save or skip reveals more about the kind of place you want to disappear into.',
  'Your reading identity deepens as you use it — the app learns what kind of world you\'re searching for.',
  'The more you interact, the more precisely it reads you.',
],
```

For `emotional_realist`:
```ts
archetypeName: 'The Emotional Realist',
archetypeSubtitle: 'You read to feel understood. The books that stay with you get human experience exactly right.',
microcopy: 'You read for the quietly devastating moments. The books that earn your feelings.',
shareText: 'I got "The Emotional Realist" on My Next Book 📚 Apparently I only love books that get human experience exactly right. What does your reading taste reveal?',
ctaCopy: 'Find books that earn my tears',
continuationFeatures: [
  'My Next Book tracks your sensitivity to emotional truth — learning what kinds of human experience you respond to most.',
  'Every book you save or skip reveals more about the emotional register you\'re looking for.',
  'Your reading identity deepens as you use it — the app observes the patterns in what moves you.',
  'The more you interact, the more precisely it reads you.',
],
```

For `speculative_thinker`:
```ts
archetypeName: 'The Speculative Thinker',
archetypeSubtitle: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
microcopy: 'You prefer books that use invented worlds to say true things. The best ones make you see everything differently.',
shareText: 'I got "The Speculative Thinker" on My Next Book 📚 Apparently I only want books that challenge my assumptions. What does your reading taste reveal?',
ctaCopy: 'Find books that reframe everything',
continuationFeatures: [
  'My Next Book tracks your appetite for idea-driven fiction — learning what kinds of premises and premises change how you think.',
  'Every book you respond to sharpens the map of your intellectual instincts.',
  'Your reading identity deepens as you use it — the app learns which speculative ideas genuinely move you.',
  'The more you interact, the more precisely it reads you.',
],
```

For `quiet_intellectual`:
```ts
archetypeName: 'The Quiet Intellectual',
archetypeSubtitle: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
microcopy: 'You return to sentences. You notice construction. You prefer books that reward full attention.',
shareText: 'I got "The Quiet Intellectual" on My Next Book 📚 Apparently I only want books that reward the attention I give them. What does your reading taste reveal?',
ctaCopy: 'Find books that reward slow reading',
continuationFeatures: [
  'My Next Book tracks your preference for depth and deliberate prose — learning what level of density you find rewarding vs. exhausting.',
  'Every book you save or skip reveals more about where your intellectual attention naturally settles.',
  'Your reading identity deepens as you use it — the app builds a map of the kind of precision you look for.',
  'The more you interact, the more precisely it reads you.',
],
```

For `chaos`:
```ts
archetypeName: 'The Chaos Reader',
archetypeSubtitle: 'You read to be surprised. Predictability is the only thing that can lose you.',
microcopy: 'You want books that break their own rules. Stories that shift beneath you and end somewhere true.',
shareText: 'I got "The Chaos Reader" on My Next Book 📚 Apparently I only want books that break their own rules. What does your reading taste reveal?',
ctaCopy: 'Find books that break the rules',
continuationFeatures: [
  'My Next Book tracks your response to the unexpected — learning what kinds of structural surprises feel thrilling vs. cheap.',
  'Every book you dismiss for being predictable refines the map of your appetite for chaos.',
  'Your reading identity deepens as you use it — the app learns what "surprising" actually means to you.',
  'The more you interact, the more precisely it reads you.',
],
```

For `atmospheric_explorer`:
```ts
archetypeName: 'The Atmospheric Explorer',
archetypeSubtitle: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
microcopy: 'A specific texture of light. A tone you can\'t fully name. You read for emotional residue, not resolution.',
shareText: 'I got "The Atmospheric Explorer" on My Next Book 📚 Apparently I only want books that leave a mood that lingers. What does your reading taste reveal?',
ctaCopy: 'Find books that leave a feeling',
continuationFeatures: [
  'My Next Book tracks the atmospheric qualities you respond to — building a map of what kind of feeling you\'re chasing.',
  'Every book you save or skip reveals more about the specific emotional texture you\'re searching for.',
  'Your reading identity deepens as you use it — the app learns to distinguish mood from plot for you.',
  'The more you interact, the more precisely it reads you.',
],
```

- [ ] **Step 2: Apply all changes to `lib/resultContent.ts`**

Open `lib/resultContent.ts`. For each of the 8 keys, replace only these fields: `archetypeName`, `archetypeSubtitle`, `microcopy`, `shareText`, `ctaCopy`, `continuationFeatures`. Leave `moodTiles` and `similarBooks` unchanged.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd ~/my-next-book-quiz && npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 4: Commit**

```bash
cd ~/my-next-book-quiz
git add lib/resultContent.ts
git commit -m "feat: literary result content — emotionally precise subtitles, microcopy, share text, continuation features"
```

---

## Task 6: Update secondary quizzes (BOOKTOK, READING_SLUMP, GENRE_MATCH, READING_PERSONALITY) hooks + descriptions

**Files:**
- Modify: `lib/quizzes.ts` — hook and description only for the 4 secondary quizzes

- [ ] **Step 1: Find and update each secondary quiz hook/description**

In `lib/quizzes.ts`, locate the 4 secondary quiz consts and update only their `hook` and `description` fields:

**BOOKTOK** (slug: `booktok-recommendations`):
```ts
hook: 'You don\'t just want viral books. You want the ones that will actually stay with you.',
description: 'Cut through the noise. Find the BookTok book that matches how you actually read.',
```

**READING_SLUMP** (slug: `reading-slump`):
```ts
hook: 'The right book is the one that remembers what reading feels like.',
description: 'Answer a few questions. Get out of your slump with a book that matches your exact emotional state right now.',
```

**GENRE_MATCH** (slug: `genre-match`):
```ts
hook: 'Genre is just a starting point.',
description: 'Discover which emotional territory you\'re actually drawn to — and the books that live there.',
```

**READING_PERSONALITY** (slug: `reading-personality`):
```ts
hook: 'You don\'t read for plot alone.',
description: 'Discover the emotional and intellectual patterns behind your reading taste.',
```

- [ ] **Step 2: Commit**

```bash
cd ~/my-next-book-quiz
git add lib/quizzes.ts
git commit -m "feat: update secondary quiz hooks and descriptions to literary tone"
```

---

## Task 7: Deploy and verify

- [ ] **Step 1: Push to Railway**

```bash
cd ~/my-next-book-quiz && git push origin main
```

- [ ] **Step 2: Open quiz in browser after ~2 min deploy**

Visit `https://quiz.mynextbook.me/what-should-i-read-next` and verify:
- Landing shows "The books you love aren't random." + "Find my reading identity →" CTA
- Questions feel emotionally observant (not genre-picker)
- Result hero: identity name + subtitle line only (no duplicate body text)
- Mood tiles render
- "Books that call to you" section label
- "Books that stay with readers like you" section label
- Share button says "Share my reading identity"
- Email capture says "Save your result"

- [ ] **Step 3: Spot-check all 8 results**

Visit each result by appending `?result=dark_cerebral`, `?result=momentum`, etc. to the quiz URL and confirming the result page renders without errors.

---

## Spec Coverage Check

| Spec requirement | Task covering it |
|---|---|
| Hero redesign — no "BOOK QUIZ" badge, no "30 seconds" pill | Task 1 |
| CTA → "Find my reading identity →" | Task 1 |
| "WHAT YOU GET" → "WHAT YOU DISCOVER" with literary framing | Task 1 |
| Progress taglines feel like pattern-recognition, not a game | Task 2 |
| Section labels literary, not startup | Task 2 |
| AppCtaSection headline literary | Task 2 |
| Email capture copy — not "breakdown", not "personalized" | Task 2 |
| Questions emotionally observant | Tasks 3–4 |
| No genre-picker questions | Tasks 3–4 |
| Results feel eerily specific and self-recognizing | Tasks 3–4 |
| whyAppHelps — no "Reading DNA", no "personalization engine" | Tasks 3–4 |
| Result subtitles emotionally loaded | Task 5 |
| microcopy feels like a mirror, not a system | Task 5 |
| shareText optimized for "this app exposed me" energy | Task 5 |
| continuationFeatures — no AI/algorithm language | Task 5 |
| Secondary quizzes aligned in tone | Task 6 |
| Deploy and verify | Task 7 |
