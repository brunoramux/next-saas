'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithEmail } from '@/http/sign-in-with-email'

const signInSchema = z.object({
  email: z.string().email({
    message: 'Please, provide a valid e-mail address.',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must have at least six digits.' }),
})

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData,
) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data
  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    const { token } = await signInWithEmail({
      email,
      password,
    })
    console.log(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
