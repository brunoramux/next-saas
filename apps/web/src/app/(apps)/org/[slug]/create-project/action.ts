'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include a valid organization name.' }),
  description: z.string(),
})

export async function createProjectAction(
  // previousState: unknown,
  data: FormData,
) {
  // validação de dados do formulário com Zod e Typescript
  const result = projectSchema.safeParse(Object.fromEntries(data))

  // Retorna erros de validação do Zod
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { description, name } = result.data
  // await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    await createProject({ name, description, org: getCurrentOrg()! })
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

  return {
    success: true,
    message: 'Succesfully saved the project.',
    errors: null,
  }
}
