import type { ChoosePlayerAction } from '../fightAction.js'
import { Character } from '../../../character/Character.js'

export interface FightEncounterHandlerInterface {
  goThroughFullFight(_choosePlayerAction: ChoosePlayerAction): void
  getFightMembers(): readonly Character[]
}
