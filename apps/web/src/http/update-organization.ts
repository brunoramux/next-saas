import { api } from './api-client'

interface updateOrganizationRequest {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}
type updateOrganizationResponse = void

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: updateOrganizationRequest): Promise<updateOrganizationResponse> {
  await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
