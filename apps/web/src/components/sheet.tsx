'use client'
import { useState } from 'react'

import OrganizationForm from '@/app/(apps)/org/organization-form'

import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export default function CreateSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="w-full">
            Testar sheet
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create organization</SheetTitle>
          </SheetHeader>

          <div className="py-4">
            <OrganizationForm />
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button className="w-full" onClick={() => setOpen(false)}>
                Sair
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
