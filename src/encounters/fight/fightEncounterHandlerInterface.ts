import type { PlayerFightActions } from './fightAction.js'
import { Character } from '../../character/Character.js'


export interface FightEncounterHandlerInterface {

  setupFight(): void
  startFight(): void
  performAction(_action: PlayerFightActions): void
  getFightMembers(): readonly Character[]
}
