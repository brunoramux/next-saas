import { Header } from '@/components/header/header'

import CreateProjectForm from './create-project-form'

export default function CreateProject() {
  return (
    <div className="space-y-4">
      <Header />
      <CreateProjectForm />
    </div>
  )
}
