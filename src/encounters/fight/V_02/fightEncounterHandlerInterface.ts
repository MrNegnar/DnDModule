import type { ChoosePlayerAction } from './fightAction.js'

export interface FightEncounterHandlerInterface<TPlayer, TEnemy> {
  goThroughFullFight(_choosePlayerAction: ChoosePlayerAction<TPlayer, TEnemy>): void
  getFightMembers(): readonly (TPlayer | TEnemy)[]
}
