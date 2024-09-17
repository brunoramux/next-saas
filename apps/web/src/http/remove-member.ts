import { api } from './api-client'

export async function removeMember(orgSlug: string, memberId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const result = await api.delete(
    `organizations/${orgSlug}/members/${memberId}`,
  )

  return result
}
