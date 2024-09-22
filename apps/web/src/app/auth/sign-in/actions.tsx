'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
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
  // previousState: unknown,
  data: FormData,
) {
  // validação de dados do formulário com Zod e Typescript
  const result = signInSchema.safeParse(Object.fromEntries(data))

  // Retorna erros de validação do Zod
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data
  // await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    const { token } = await signInWithEmail({
      email,
      password,
    })
    // Seta o token nos Cookies usando next/headers
    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 20,
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        cookies().delete('inviteId')
      } catch {}
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      // pega mensagem que retorna do back-end
      const { message } = await error.response.json()

      // Retorna mensagem para ser usada no front-end
      return { success: false, message, errors: null }
    }
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  redirect('/')
}
