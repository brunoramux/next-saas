'use server'

/* Esta action é utilizada pelo componente organization-form para Criar ou Alterar uma Organização */

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include a valid organization name.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            /* REGEX para verificar domínio */
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            return domainRegex.test(value)
          }
          return true
        },
        { message: 'Invalid domain name.' },
      ),
    shouldAttachUsersByDomain: z
      /* Checkbox pode retornar 'ON' e 'OFF'. Necessários tratamento transformando para 'True' ou 'False' para salavar no banco */
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    /* Se Ckeckbox marcado então o campo domínio deve estar preenchido */
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }
      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

/* Exportar type do Schema para ser usado no componente organization-form */
export type OrganizationSchema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  /* validação de dados do formulário com Zod e Typescript */
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  /*   Retorna erros de validação do Zod */
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  // if (!currentOrg) {
  //   return {
  //     success: false,
  //     message: 'Organization not found.',
  //     errors: null,
  //   }
  // }

  const { name, domain, shouldAttachUsersByDomain } = result.data
  // await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    /* Resetar a chamada HTTP get-organizations para que a página atualize automaticamente após criar a organização */
    /* Tag criada na criação da chamada HTTP */
    revalidateTag('organizations')
  } catch (error) {
    if (error instanceof HTTPError) {
      /* pega mensagem que retorna do back-end */
      const { message } = await error.response.json()

      /* Retorna mensagem para ser usada no front-end */
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

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = getCurrentOrg()
  /* validação de dados do formulário com Zod e Typescript */
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  /* Retorna erros de validação do Zod */
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
    await updateOrganization({
      org: currentOrg!,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    /* Resetar a chamada HTTP get-organizations para que a página atualize automaticamente após atualizar dados */
    /* Tag criada na criação da chamada HTTP */
    revalidateTag('organizations')
  } catch (error) {
    if (error instanceof HTTPError) {
      /* pega mensagem que retorna do back-end */
      const { message } = await error.response.json()

      /* Retorna mensagem para ser usada no front-end */
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
