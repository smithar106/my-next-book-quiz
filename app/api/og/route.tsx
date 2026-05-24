import { ImageResponse } from 'next/og'
import { getResultContent } from '@/lib/resultContent'

export const runtime = 'edge'

const ARCHETYPE_EMOJI: Record<string, string> = {
  // App archetypes
  dark_cerebral:                   '🖤',
  momentum:                        '⚡',
  literary_escapist:               '🌙',
  emotional_realist:               '💧',
  speculative_thinker:             '🔭',
  quiet_intellectual:              '📐',
  chaos:                           '🌀',
  atmospheric_explorer:            '🌫️',
  // Quiz-specific archetypes
  emotional:                       '💔',
  cozy:                            '☕',
  dark:                            '🕯️',
  fast:                            '⚡',
  romance:                         '🌸',
  escapist:                        '🌌',
  thinker:                         '🧠',
  thriller:                        '🔦',
  fantasy:                         '🗺️',
  slump_short:                     '📖',
  slump_comfort:                   '🌿',
  literary:                        '✍️',
  mystery:                         '🔍',
  memoir:                          '📝',
}

const ARCHETYPE_COLOR: Record<string, { accent: string; glow: string }> = {
  // App archetypes
  dark_cerebral:                   { accent: '#9090C8', glow: 'rgba(144,144,200,0.28)' },
  momentum:                        { accent: '#80D8D0', glow: 'rgba(128,216,208,0.28)' },
  literary_escapist:               { accent: '#C8B0FF', glow: 'rgba(200,176,255,0.28)' },
  emotional_realist:               { accent: '#F0A0C8', glow: 'rgba(240,160,200,0.28)' },
  speculative_thinker:             { accent: '#80D890', glow: 'rgba(128,216,144,0.28)' },
  quiet_intellectual:              { accent: '#F0C060', glow: 'rgba(240,192,96,0.28)' },
  chaos:                           { accent: '#C8B0FF', glow: 'rgba(200,176,255,0.28)' },
  atmospheric_explorer:            { accent: '#A0B8D8', glow: 'rgba(160,184,216,0.28)' },
  // Quiz-specific archetypes
  emotional:                       { accent: '#F0A0C8', glow: 'rgba(240,160,200,0.25)' },
  cozy:                            { accent: '#FFD090', glow: 'rgba(255,208,144,0.25)' },
  dark:                            { accent: '#9090C8', glow: 'rgba(144,144,200,0.25)' },
  fast:                            { accent: '#80D8D0', glow: 'rgba(128,216,208,0.25)' },
  romance:                         { accent: '#F0A0C8', glow: 'rgba(240,160,200,0.25)' },
  escapist:                        { accent: '#C8B0FF', glow: 'rgba(200,176,255,0.25)' },
  thinker:                         { accent: '#F0C060', glow: 'rgba(240,192,96,0.25)' },
  thriller:                        { accent: '#FF9090', glow: 'rgba(255,144,144,0.25)' },
  fantasy:                         { accent: '#C8B0FF', glow: 'rgba(200,176,255,0.25)' },
  slump_short:                     { accent: '#80D8D0', glow: 'rgba(128,216,208,0.25)' },
  slump_comfort:                   { accent: '#80D890', glow: 'rgba(128,216,144,0.25)' },
  literary:                        { accent: '#F0C060', glow: 'rgba(240,192,96,0.25)' },
  mystery:                         { accent: '#9090C8', glow: 'rgba(144,144,200,0.25)' },
  memoir:                          { accent: '#FFD090', glow: 'rgba(255,208,144,0.25)' },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const resultId = searchParams.get('result') ?? 'emotional'
  const quizTitle = searchParams.get('quiz') ?? 'My Next Book Quiz'
  const format = searchParams.get('format') ?? 'og'

  const content = getResultContent(resultId)
  const emoji = ARCHETYPE_EMOJI[resultId] ?? '📚'
  const colors = ARCHETYPE_COLOR[resultId] ?? { accent: '#C8B0FF', glow: 'rgba(200,176,255,0.25)' }

  const archetypeName = content?.archetypeName ?? 'Your Reader Type'
  const subtitle = content?.archetypeSubtitle ?? 'Find your next perfect read.'

  if (format === 'story') {
    return new ImageResponse(
      (
        <div style={{
          width: '1080px',
          height: '1920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0B18',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}>
          {/* Top glow */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '900px',
            background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 65%)`,
          }} />

          {/* Bottom glow */}
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '600px',
            background: `radial-gradient(ellipse, ${colors.glow.replace('0.25', '0.10')} 0%, transparent 70%)`,
          }} />

          {/* Main content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '0 80px',
            textAlign: 'center',
          }}>
            {/* Label */}
            <div style={{
              display: 'flex',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '4px',
              color: colors.accent,
              textTransform: 'uppercase',
              marginBottom: '60px',
              opacity: 0.8,
            }}>
              MY READING IDENTITY
            </div>

            {/* Emoji */}
            <div style={{
              fontSize: '140px',
              lineHeight: 1,
              marginBottom: '48px',
              filter: `drop-shadow(0 0 40px ${colors.accent}66)`,
            }}>
              {emoji}
            </div>

            {/* "I'm" label */}
            <div style={{
              fontSize: '36px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '16px',
              letterSpacing: '1px',
            }}>
              I'm
            </div>

            {/* Archetype name */}
            <div style={{
              fontSize: archetypeName.length > 22 ? '68px' : '80px',
              fontWeight: 900,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              marginBottom: '36px',
            }}>
              {archetypeName}
            </div>

            {/* Accent line */}
            <div style={{
              width: '80px',
              height: '3px',
              background: colors.accent,
              borderRadius: '2px',
              marginBottom: '36px',
              opacity: 0.7,
            }} />

            {/* Subtitle */}
            <div style={{
              fontSize: '30px',
              fontWeight: 500,
              color: colors.accent,
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '760px',
              opacity: 0.9,
            }}>
              {subtitle}
            </div>
          </div>

          {/* Bottom branding */}
          <div style={{
            position: 'absolute',
            bottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              display: 'flex',
              background: `${colors.accent}1A`,
              border: `1.5px solid ${colors.accent}44`,
              borderRadius: '100px',
              padding: '16px 40px',
              fontSize: '24px',
              fontWeight: 700,
              color: colors.accent,
            }}>
              Find yours → quiz.mynextbook.me
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '1px',
            }}>
              My Next Book
            </div>
          </div>
        </div>
      ),
      { width: 1080, height: 1920 }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#12101E',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 70%)`,
        }} />

        {/* Border card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1.5px solid ${colors.accent}44`,
          borderRadius: '32px',
          padding: '52px 72px',
          width: '960px',
          background: 'rgba(255,255,255,0.03)',
          position: 'relative',
        }}>
          {/* Top label */}
          <div style={{
            display: 'flex',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2px',
            color: colors.accent,
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            MY NEXT BOOK · {quizTitle.toUpperCase()}
          </div>

          {/* Emoji */}
          <div style={{ fontSize: '80px', marginBottom: '24px', lineHeight: 1 }}>
            {emoji}
          </div>

          {/* Archetype name */}
          <div style={{
            fontSize: '52px',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            marginBottom: '16px',
          }}>
            {archetypeName}
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: '20px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '640px',
          }}>
            {subtitle}
          </div>

          {/* Bottom CTA pill */}
          <div style={{
            display: 'flex',
            marginTop: '36px',
            background: `${colors.accent}22`,
            border: `1px solid ${colors.accent}55`,
            borderRadius: '100px',
            padding: '10px 24px',
            fontSize: '15px',
            fontWeight: 700,
            color: colors.accent,
          }}>
            Find your reader type → quiz.mynextbook.me
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
