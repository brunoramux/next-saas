'use client'

import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

export default function BreadcrumbComponent() {
  const pathname = usePathname()
  const paths = pathname.split('/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {paths.map((path) =>
          path !== '' && path !== 'org' && path !== 'project' ? (
            <>
              <BreadcrumbItem>{path}</BreadcrumbItem>
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
