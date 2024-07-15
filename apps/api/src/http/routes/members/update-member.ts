import { defineAbilityFor } from '@saas/auth'
import { userSchema } from '@saas/auth/src/models/user'
import { roleSchema } from '@saas/auth/src/roles'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['projects'],
          summary: 'Update a Member',
          security: [{ bearerAuth: [] }],
          body: z.object({
            role: roleSchema,
          }),
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { slug, memberId } = request.params
        const { role } = request.body
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authUser = userSchema.parse({
          id: userId,
          role: membership.role,
        })

        const { cannot } = defineAbilityFor(authUser)

        if (cannot('update', 'User')) {
          throw new UnauthorizedError(
            'You are not allowed to delete this project.',
          )
        }

        await prisma.member.update({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
          data: {
            role,
          },
        })

        return reply.status(204).send()
      },
    )
}
