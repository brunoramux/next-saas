import { Header } from '@/components/header/header'
import CreateSheet from '@/components/sheet'

import OrganizationForm from './organization-form'

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <Header />
      <h1 className="text-2xl font-bold">Create organization</h1>

      <OrganizationForm />
      <CreateSheet />
    </div>
  )
}
