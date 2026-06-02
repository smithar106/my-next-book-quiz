import { notFound } from 'next/navigation'
import { getQuiz } from '@/lib/quizzes'
import { getResultContent } from '@/lib/resultContent'
import { QuizClient } from '@/components/QuizClient'
import type { Metadata } from 'next'

const SITE_URL = 'https://quiz.mynextbook.me'

interface Props {
  params: Promise<{ quiz: string }>
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { quiz: slug } = await params
  const sp = await searchParams
  const config = getQuiz(slug)
  if (!config) return {}

  const resultId = sp.result
  const content = resultId ? getResultContent(resultId) : null

  const title = content
    ? `You're a ${content.archetypeName} — My Next Book`
    : `${config.title} — My Next Book`
  const description = content
    ? content.archetypeSubtitle
    : config.hook
  const ogImageUrl = resultId
    ? `${SITE_URL}/api/og?result=${resultId}&quiz=${encodeURIComponent(config.title)}`
    : `${SITE_URL}/api/og?result=emotional&quiz=${encodeURIComponent(config.title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { quiz: slug } = await params
  const rawParams = await searchParams
  const config = getQuiz(slug)
  if (!config) notFound()
  return <QuizClient slug={slug} rawParams={rawParams} />
}

export function generateStaticParams() {
  return [
    { quiz: 'what-should-i-read-next' },
    { quiz: 'book-personality' },
    { quiz: 'booktok-recommendations' },
    { quiz: 'reading-slump' },
    { quiz: 'genre-match' },
    { quiz: 'reading-personality' },
  ]
}
