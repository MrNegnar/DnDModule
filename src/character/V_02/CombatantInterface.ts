export interface CombatantInterface {
  getSpeed(): number
  getArmor(): number
  getEvasion(): number
  getStrengthModifier(): number
  getDexterityModifier(): number
  getIntelligenceModifier(): number
  getWisdomModifier(): number
  takeDamage(_amount: number): void
  isAlive(): boolean
  raiseEvasion(): void
  raiseArmor(): void
}