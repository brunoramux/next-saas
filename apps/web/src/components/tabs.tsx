import { ability, getCurrentOrg } from '@/auth/auth'

import BreadcrumbComponent from './breadcrumb'
import { NavLink } from './nav-link'
import { Button } from './ui/button'

export default async function Tabs() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')
  const canGetBilling = permissions?.can('get', 'Billing')

  const currentOrg = getCurrentOrg()
  return (
    <>
      <div className="border-b py-0 pt-10">
        <nav className="max-auto flex max-w-[1200px] items-center gap-2">
          {canGetProjects && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="data-[current=true]: rounded-none border border-transparent text-muted-foreground hover:rounded-md data-[current=true]:border-b-input data-[current=true]:border-b-neutral-50 data-[current=true]:text-foreground"
            >
              <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
            </Button>
          )}
          {canGetMembers && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-none border border-transparent text-muted-foreground hover:rounded-md data-[current=true]:border-input data-[current=true]:text-foreground"
            >
              <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
            </Button>
          )}
          {(canUpdateOrganization || canGetBilling) && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-none border border-transparent text-muted-foreground hover:rounded-md data-[current=true]:border-input data-[current=true]:text-foreground"
            >
              <NavLink href={`/org/${currentOrg}/settings`}>
                Settings & Billing
              </NavLink>
            </Button>
          )}
        </nav>
      </div>
      <div className="pb-4 pt-4">
        <BreadcrumbComponent />
      </div>
    </>
  )
}
