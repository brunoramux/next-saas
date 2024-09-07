export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center py-4">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
