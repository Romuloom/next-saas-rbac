import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadResquestError } from './routes/auth/_errors/bad-request-error.js'
import { UnauthorizedError } from './routes/auth/_errors/unauthorized-error.js'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadResquestError) {
    return replay.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return replay.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  return replay.status(500).send({ message: 'Internal server error.' })
}
