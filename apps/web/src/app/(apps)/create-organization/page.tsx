import { Header } from '@/components/header/header'

import OrganizationForm from './organization-form'

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <Header />

      <OrganizationForm />
    </div>
  )
}
