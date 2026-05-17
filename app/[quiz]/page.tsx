import { notFound } from 'next/navigation'
import { getQuiz } from '@/lib/quizzes'
import { QuizClient } from '@/components/QuizClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ quiz: string }>
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quiz: slug } = await params
  const config = getQuiz(slug)
  if (!config) return {}
  return {
    title: `${config.title} — My Next Book`,
    description: config.hook,
    openGraph: { title: `${config.title} — My Next Book`, description: config.hook },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { quiz: slug } = await params
  const rawParams = await searchParams
  const config = getQuiz(slug)
  if (!config) notFound()

  // Pass only serializable data — client imports quizzes directly
  return <QuizClient slug={slug} rawParams={rawParams} />
}

export function generateStaticParams() {
  return [
    { quiz: 'what-should-i-read-next' },
    { quiz: 'book-personality' },
    { quiz: 'booktok-recommendations' },
    { quiz: 'reading-slump' },
    { quiz: 'genre-match' },
  ]
}
