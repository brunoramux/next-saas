import { Header } from '@/components/header/header'

export default async function Home() {
  return (
    <div className="py-4">
      <Header />

      <h1 className="pt-6 text-2xl font-bold">
        Select an Organization to manage or create a new one.
      </h1>
    </div>
  )
}
