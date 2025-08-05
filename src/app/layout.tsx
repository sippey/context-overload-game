import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Token Overload',
  description: 'Overload the AI system with tokens to trigger a system crash',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}