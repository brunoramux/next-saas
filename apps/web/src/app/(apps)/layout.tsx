import { redirect } from 'next/navigation'

import { isAuthenticate } from '@/auth/auth'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticate()) {
    redirect('/auth/sign-in')
  }
  return <>{children}</>
}
