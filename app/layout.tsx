import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'My Next Book — Find Your Next Read',
    template: '%s | My Next Book',
  },
  description:
    'React to a few things. We read your emotional patterns and find the exact book for how you want to feel right now. Takes two minutes.',
  keywords: [
    'what book should i read next',
    'book recommendation quiz',
    'book personality quiz',
    'reading slump quiz',
    'what genre should i read',
    'personalized book recommendations',
    'book quiz',
  ],
  openGraph: {
    title: 'My Next Book — Find Your Next Read',
    description:
      'React to a few things. We read your emotional patterns and find the exact book for how you want to feel right now.',
    siteName: 'My Next Book',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Next Book — Find Your Next Read',
    description:
      'React to a few things. We read your emotional patterns and find the exact book for how you want to feel.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
