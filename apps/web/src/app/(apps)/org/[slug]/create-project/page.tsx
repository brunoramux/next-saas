import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'
import { Header } from '@/components/header/header'

import CreateProjectForm from './create-project-form'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <Header />
      <CreateProjectForm />
    </div>
  )
}
