import { api } from './api-client'

interface getOrganizationsRequest {
  org: string
}

interface getOrganizationResponse {
  organization: {
    id: string
    slug: string
    name: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization({ org }: getOrganizationsRequest) {
  const result = await api
    .get(`organizations/${org}`)
    .json<getOrganizationResponse>()

  return result
}
