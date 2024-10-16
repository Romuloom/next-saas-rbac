import { FastifyInstance } from 'fastify'

import { UnauthorizedError } from '../routes/auth/_errors/unauthorized-error.js'

export async function auth(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
}
