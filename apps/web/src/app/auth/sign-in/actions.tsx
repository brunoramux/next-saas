'use server'

import { signInWithEmail } from '@/http/sign-in-with-email'

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData,
) {
  console.log(Object.fromEntries(data))

  const { email, password } = Object.fromEntries(data)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = await signInWithEmail({
    email: String(email),
    password: String(password),
  })

  return 'Sucesso'
}
