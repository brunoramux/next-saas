import { Header } from '@/components/header/header'

export default async function Home() {
  return (
    <div className="py-4">
      <Header />

      <h1 className="text-2xl font-bold">Home</h1>
    </div>
  )
}
