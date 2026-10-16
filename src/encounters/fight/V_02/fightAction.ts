

export type PlayerFightActions =
  { type: 'attack'; target: Enemy } |
  { type: 'offensiveSpell'; target: Enemy } |
  { type: 'raiseArmor' } |
  { type: 'raiseEvasion' } |
  { type: 'heal'; target: Player } |
  { type: 'skipTurn' }

export type ChoosePlayerAction = (
  _player: Player,
  _livingAllies: Player[],
  _livingOpponents: Enemy[]
) => PlayerFightActions