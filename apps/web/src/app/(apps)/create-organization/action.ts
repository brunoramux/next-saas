'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'

const organizationSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include a valid organization name.' }),
  domain: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (value) {
          const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
          return domainRegex.test(value)
        }
        return true
      },
      { message: 'Invalid domain name.' },
    ),
  shouldAttachUsersByDomain: z
    .union([z.literal('on'), z.literal('off'), z.boolean()])
    .transform((value) => value === true || value === 'on')
    .default(false),
})

export async function createOrganizationAction(
  // previousState: unknown,
  data: FormData,
) {
  // validação de dados do formulário com Zod e Typescript
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  // Retorna erros de validação do Zod
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data
  // await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
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

  return {
    success: true,
    message: 'Succesfully saved the organization.',
    errors: null,
  }
}
