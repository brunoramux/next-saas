import { api } from './api-client'

interface signUpRequest {
  name: string
  email: string
  password: string
}
type signUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: signUpRequest): Promise<signUpResponse> {
  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
