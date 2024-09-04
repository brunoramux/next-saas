import { redirect } from 'next/navigation'

import { isAuthenticate } from '@/auth/auth'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticate()) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-[350]">{children}</div>
    </div>
  )
}
