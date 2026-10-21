import type { ChoosePlayerAction } from './fightAction.js'
import type { CombatantInterface } from '../../../character/V_02/CombatantInterface.js'

export interface FightEncounterHandlerInterface<TPlayer extends CombatantInterface, TEnemy extends CombatantInterface> {
  goThroughFullFight(_choosePlayerAction: ChoosePlayerAction<TPlayer, TEnemy>): void
  getFightParticipants(): readonly (TPlayer | TEnemy)[]
}
