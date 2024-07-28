import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { User, userSchema } from './models/user'
import { permisions } from './permissions'
import { projectSubject} from './subjects/project'
import { z } from 'zod'
import { organizationSubject } from './subjects/organizations'
import { inviteSubject } from './subjects/invite'
import { billingSubject } from './subjects/billing'
import { userSubject } from './subjects/user'

const AppAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])


type AppAbilities = z.infer<typeof AppAbilitiesSchema>


export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permisions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }
  permisions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
        return subject.__typename
    },
  })

  return ability
}
