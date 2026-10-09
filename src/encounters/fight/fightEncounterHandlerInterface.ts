import type { FightEncounterHandler } from './fightEncounterHandler.js'
import type { Player } from '../../player/player.js'
import type { PlayerFightAction } from '../../player/PlayerFightAction.js'
import type { Enemy } from '../../enemy/Enemy.js'

export interface FightEncounterHandlerInterface {

  setupFight(player: Player, enemy: Enemy): void
  startFight(): void
  performAction(action: PlayerFightAction): void
  getFightMembers(): readonly Character[]
}
