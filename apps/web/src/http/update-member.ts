import type { Role } from '@saas/auth/src/roles'

import { api } from './api-client'

interface updateMemberRequest {
  slug: string
  memberId: string
  role: Role
}

export async function updateMember({
  memberId,
  role,
  slug,
}: updateMemberRequest) {
  await api.put(`organizations/${slug}/members/${memberId}`, {
    json: {
      role,
    },
  })
}
