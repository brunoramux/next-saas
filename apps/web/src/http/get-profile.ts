import { api } from './api-client'

interface getProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const result = await api.get('profile').json<getProfileResponse>()

  return result
}
