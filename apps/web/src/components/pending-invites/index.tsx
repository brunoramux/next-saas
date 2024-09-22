import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'

import { getPendingInvites } from '@/http/get-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
dayjs.extend(relativeTime)

export async function PendingInvites() {
  const { invites } = await getPendingInvites()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          {invites.length !== 0 ? (
            <>
              <UserPlus2 className="size-4" fill="red" />
              {'  '}
              <span className="w-3 rounded-full bg-neutral-700 text-xs font-medium text-muted-foreground">
                {invites.length}
              </span>
            </>
          ) : (
            <UserPlus2 className="size-4" />
          )}
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending Invites ({invites.length})
        </span>
        {invites.map((invite) => (
          <div className="space-y-2" key={invite.id}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                {invite.author?.name}
              </span>{' '}
              invited you to join{' '}
              <span className="font-medium text-foreground">
                {invite.organization.name}
              </span>{' '}
              <span>{dayjs(invite.createdAt).fromNow()}</span>
            </p>
            <div className="flex gap-1">
              <Button size="xs" variant="outline">
                <Check className="mr-1.5 size-3" />
                Accept
              </Button>
              <Button
                size="xs"
                variant="ghost"
                className="text-muted-foreground"
              >
                <X className="mr-1.5 size-3" />
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
