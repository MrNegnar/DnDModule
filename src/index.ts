export { Character } from './character/Character.js'
export { Player } from './character/Player.js'
export { Enemy } from './character/Enemy.js'
export { Dice } from './dice/Dice.js'
export { FightEncounterHandler } from './encounters/fight/FightEncounterHandler.js'
export type { ChoosePlayerAction, PlayerFightActions } from './encounters/fight/fightAction.js'

//the used interface for characters and fight encounter handlers
export type { CharacterInterface } from './character/CharacterInterface.js'
export type { FightEncounterHandlerInterface } from './encounters/fight/fightEncounterHandlerInterface.js'

// V_02 exports that differ from the base version

/*
the used interface for combatant and fight encounter handler
*/
export type { CombatantInterface } from './character/V_02/CombatantInterface.js'
export type { FightEncounterHandlerInterface as FightEncounterHandlerInterfaceV02 } from './encounters/fight/V_02/fightEncounterHandlerInterface.js'

/*
Combat behavior to be able to use the actions of play in fight.
*/
export { CombatantBehavior } from './character/V_02/CombatantBehavior.js'

/*
The fight itself.
*/
export { FightEncounterHandler as FightEncounterHandlerV02 } from './encounters/fight/V_02/fightEncounterHandler.js'

/*
Player actions in the fight.
*/
export type {
  ChoosePlayerAction as ChoosePlayerActionV02,
  PlayerFightActions as PlayerFightActionsV02,
} from './encounters/fight/V_02/fightAction.js'
