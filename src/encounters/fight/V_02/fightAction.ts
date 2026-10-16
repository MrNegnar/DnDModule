export type PlayerFightActions<TPlayer, TEnemy> =
  { type: 'attack'; target: TEnemy } |
  { type: 'offensiveSpell'; target: TEnemy } |
  { type: 'raiseArmor' } |
  { type: 'raiseEvasion' } |
  { type: 'heal'; target: TPlayer } |
  { type: 'skipTurn' }

export type ChoosePlayerAction<TPlayer, TEnemy> = (
  _player: TPlayer,
  _livingAllies: TPlayer[],
  _livingOpponents: TEnemy[]
) => PlayerFightActions<TPlayer, TEnemy>
