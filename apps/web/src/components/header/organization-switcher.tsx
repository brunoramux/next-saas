import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const currentOrgSlug = cookies().get('org')?.value
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (organization) => organization.slug === currentOrgSlug,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[200px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="mr-1 size-6">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate">
              {currentOrganization.name} - {currentOrganization.role}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="dize-4 ml-auto text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[270px]"
        align="end"
        alignOffset={-75}
        sideOffset={10}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="mb-1 ml-1 text-sm">
            Organizations
          </DropdownMenuLabel>
          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="mr-2 size-6">
                    {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">
                    {organization.name} - {organization.role}
                  </span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <PlusCircle className="mr-2 size-6" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
