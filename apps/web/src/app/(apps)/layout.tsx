import { redirect } from 'next/navigation'

import { isAuthenticate } from '@/auth/auth'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticate()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto w-full max-w-[1200px]">
        {children}
        {sheet}
      </main>
    </div>
  )
}
