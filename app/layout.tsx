import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Next Book — Find Your Perfect Read',
  description: 'Take a quick quiz to find your next perfect book and download My Next Book.',
  openGraph: {
    title: 'My Next Book — Find Your Perfect Read',
    description: 'Take a quick quiz to find your next perfect book.',
    siteName: 'My Next Book',
  },
  twitter: { card: 'summary_large_image' },
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
