import type { CombatantInterface } from "../../../character/V_02/CombatantInterface.js";

export type PlayerFightActions<TPlayer extends CombatantInterface, TEnemy extends CombatantInterface> =
  { type: 'attack'; target: TEnemy } |
  { type: 'offensiveSpell'; target: TEnemy } |
  { type: 'raiseArmor' } |
  { type: 'raiseEvasion' } |
  { type: 'heal'; target: TPlayer } |
  { type: 'skipTurn' }

export type ChoosePlayerAction<TPlayer extends CombatantInterface, TEnemy extends CombatantInterface> = (
  _player: TPlayer,
  _livingAllies: TPlayer[],
  _livingOpponents: TEnemy[]
) => PlayerFightActions<TPlayer, TEnemy>
