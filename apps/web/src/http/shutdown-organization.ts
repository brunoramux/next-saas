import { api } from './api-client'

interface shutdownOrganizationRequest {
  org: string
}

export async function shutdownOrganization({
  org,
}: shutdownOrganizationRequest) {
  await api.delete(`organizations/${org}`)
}
