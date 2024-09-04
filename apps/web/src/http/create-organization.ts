import { api } from './api-client'

interface createOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}
type createOrganizationResponse = void

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: createOrganizationRequest): Promise<createOrganizationResponse> {
  await api.post('organizations', {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
