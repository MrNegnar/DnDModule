import type { FightEncounterHandler } from './FightEncounterHandler.js'
import type { Player } from '../../player/player.js'
import type { PlayerFightAction, ChoosePlayerAction } from './fightAction.js'
import type { Enemy } from '../../enemy/Enemy.js'
import { Character } from '../../character/Character.js'

export interface FightEncounterHandlerInterface {

  setupFight(): void
  startFight(): void
  performAction(action: PlayerFightAction): void
  getFightMembers(): readonly Character[]
}
