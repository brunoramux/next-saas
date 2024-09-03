import './globals.css'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'SaaS with Next and Node',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
