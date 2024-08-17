import { RoleExt } from '@saas/auth'

import { api } from './api-client'

interface getMembershipResponse {
  membership: {
    id: string
    role: RoleExt
    userId: string
    organizationId: string
  }
}

export async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<getMembershipResponse>()

  return result
}
