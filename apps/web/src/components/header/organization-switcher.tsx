import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select organization</span>
        <ChevronsUpDown className="dize-4 ml-auto text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px]"
        align="end"
        alignOffset={-16}
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="mb-1 ml-1 text-sm">
            Organizations
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Avatar className="mr-2 size-6">
              <AvatarImage src="https://github.com/rocketseat.png" />
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">Rocketseat</span>
          </DropdownMenuItem>
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
