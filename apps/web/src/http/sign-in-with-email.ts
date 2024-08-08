import { api } from './api-client'

interface signInWithEmailRequest {
  email: string
  password: string
}
interface signInWithEmailResponse {
  token: string
}

export async function signInWithEmail({
  email,
  password,
}: signInWithEmailRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<signInWithEmailResponse>()

  return result
}
