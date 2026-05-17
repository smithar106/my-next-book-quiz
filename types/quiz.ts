export interface QuizOption {
  id: string
  text: string
  scores: Record<string, number>
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface QuizResult {
  id: string
  title: string
  emoji: string
  tagline: string
  description: string
  readingDirections: string[]
  whyAppHelps: string
}

export interface QuizConfig {
  id: string
  slug: string
  title: string
  hook: string
  description: string
  questions: QuizQuestion[]
  results: QuizResult[]
  resultLogic: (scores: Record<string, number>) => string
}

export interface Attribution {
  creator?: string
  campaign?: string
  source?: string
  platform?: string
  hook?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
}
