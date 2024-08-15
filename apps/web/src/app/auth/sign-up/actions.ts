'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z.string().email({
      message: 'Please, provide a valid e-mail address.',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must have at least six digits.' }),
    password_confirmation: z.string(),
  })
  // Refine: verificar se campos password e password_confirmation contém os mesmos dados
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password and password confirmation must be equals.',
    path: ['password_confirmation'],
  })

export async function signUpAction(
  // previousState: unknown,
  data: FormData,
) {
  // validação de dados do formulário com Zod e Typescript
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  // Retorna erros de validação do Zod
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = result.data
  // await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    await signUp({
      name,
      email,
      password,
    })
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
