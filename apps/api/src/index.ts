import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })
const ability2 = defineAbilityFor({ role: 'MEMBER' })

const userCanInvite = ability.can('invite', 'User')
const userCanDelete = ability.can('delete', 'User')
const userCanDelete2 = ability2.cannot('delete', 'User')
const teste = ability.cannot('delete', 'User')

console.log(userCanInvite)
console.log(userCanDelete)
console.log(teste)
console.log(userCanDelete2)
