'use client'

import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

export default function BreadcrumbComponent() {
  const pathname = usePathname()
  const paths = pathname.split('/')

  return (
    <Breadcrumb className="mt-[-12px]">
      <BreadcrumbList>
        <BreadcrumbItem className="text-[10px] text-muted-foreground">
          Home
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {paths.map((path) =>
          path !== '' && path !== 'org' && path !== 'project' ? (
            <>
              <BreadcrumbItem className="text-[10px] text-muted-foreground">
                {path}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <></>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
