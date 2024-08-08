'use server'
import { signInWithEmail } from '@/http/sign-in-with-email'

export async function signInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))

  const { email, password } = Object.fromEntries(data)

  const result = await signInWithEmail({
    email: String(email),
    password: String(password),
  })

  console.log(result)
}
