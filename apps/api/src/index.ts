import {defineAbilityFor} from "@saas/auth";
import { log } from "console";

const ability = defineAbilityFor({role:'MEMBER', id:'user-id'})

console.log(ability.can('get', 'Billing'));
