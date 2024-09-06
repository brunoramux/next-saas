import { api } from './api-client'

interface createProjectRequest {
  org: string
  name: string
  description: string
}
type createProjectResponse = void

export async function createProject({
  name,
  description,
  org,
}: createProjectRequest): Promise<createProjectResponse> {
  await api.post(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })
}
