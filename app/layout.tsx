import type { Metadata } from 'next'
import './globals.css'
import { LocaleProvider } from '@/context/LocaleContext'

export const metadata: Metadata = {
  title: 'Chaabi — Unlock the Code',
  description: 'The magical coding adventure for kids. Learn HTML, CSS, JavaScript, React and Next.js through quests, earn keys, and become a real developer!',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-deep antialiased">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
