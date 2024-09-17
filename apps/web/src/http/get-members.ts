import type { Role } from '@saas/auth/src/roles'

import { api } from './api-client'

interface getMembersResponse {
  members: {
    name: string | null
    id: string
    avatarUrl: string | null
    role: Role
    userId: string
    email: string
  }[]
}

export async function getMembers(orgSlug: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const result = await api
    .get(`organizations/${orgSlug}/members`)
    .json<getMembersResponse>()

  return result
}
