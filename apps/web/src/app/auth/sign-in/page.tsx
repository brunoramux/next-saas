import Image from 'next/image'
import Link from 'next/link'

import gitHubIcon from '@/assets/github.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Password</Label>
        <Input name="email" type="email" id="email" />

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in with e-mail
      </Button>

      <Separator />

      <Button variant="outline" type="submit" className="w-full">
        <Image src={gitHubIcon} className="mr-2 size-8 dark:invert" alt="" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
