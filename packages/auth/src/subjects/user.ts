import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('menage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('User'),
])
export type UserSubject = z.infer<typeof userSubject>
