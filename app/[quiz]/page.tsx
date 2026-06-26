import { notFound } from 'next/navigation'
import { getQuiz } from '@/lib/quizzes'
import { QuizClient } from '@/components/QuizClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ quiz: string }>
  searchParams: Promise<Record<string, string>>
}

const QUIZ_META: Record<string, { title: string; description: string }> = {
  'what-should-i-read-next': {
    title: 'What Should I Read Next? — Book Quiz',
    description:
      'Not sure what to read next? React to a few things and we\'ll find the exact book for how you want to feel right now. Takes two minutes.',
  },
  'book-personality': {
    title: 'What\'s Your Book Personality? — Reading Identity Quiz',
    description:
      'Discover your reading identity. React to a few emotional cues and find out exactly what kind of reader you are — and what you should read next.',
  },
  'booktok-recommendations': {
    title: 'BookTok Recommendations — Find Your Next Read',
    description:
      'Beyond the algorithm. Find books that match how you actually want to feel — not just what\'s trending. Takes two minutes.',
  },
  'reading-slump': {
    title: 'Reading Slump Quiz — Find the Book That Breaks It',
    description:
      'Stuck in a reading slump? React to a few things and we\'ll find the exact book to pull you out. Takes two minutes, no thinking required.',
  },
  'genre-match': {
    title: 'What Genre Should I Read? — Genre Match Quiz',
    description:
      'Stop guessing. React to a few emotional cues and find the genre — and the exact book — that matches how you want to feel right now.',
  },
  'reading-personality': {
    title: 'Reading Personality Quiz — Discover Your Reader Type',
    description:
      'Find out what kind of reader you actually are. Two minutes, gut reactions only. Your reading identity is more specific than you think.',
  },
}

export async function generateMetadata(
  { params }: { params: Promise<{ quiz: string }> }
): Promise<Metadata> {
  const { quiz } = await params
  const meta = QUIZ_META[quiz]
  if (!meta) {
    return {
      title: 'Book Quiz — My Next Book',
      description: 'Find your next perfect read in two minutes.',
    }
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: 'My Next Book',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
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
