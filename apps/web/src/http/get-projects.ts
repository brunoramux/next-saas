import { api } from './api-client'

interface getProjectsResponse {
  projects: {
    description: string
    slug: string
    id: string
    name: string
    avatarUrl: string
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(org: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<getProjectsResponse>()

  return result
}
