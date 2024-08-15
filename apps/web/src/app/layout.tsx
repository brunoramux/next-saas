import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS with Next and Node',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  )
}
