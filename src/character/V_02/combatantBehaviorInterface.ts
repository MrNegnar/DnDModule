export interface combatantBehaviorInterface {
  getName(): string
  getMaxHitPoints(): number
  getCurrentHitPoints(): number
  getSpeed(): number
  getIsAlive(): boolean
}
