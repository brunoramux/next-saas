import { api } from './api-client'

interface getOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    role: string
  }[]
}

export async function getOrganizations() {
  const result = await api.get('organizations').json<getOrganizationsResponse>()

  return result
}
