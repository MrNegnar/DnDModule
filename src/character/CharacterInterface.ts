import type { Character } from './Character.js'

export interface CharacterInterface {

  getName(): string
  getMaxHitPoints(): number
  getCurrentHitPoints(): number
  getAttackPower(): number
  getArmorClass(): number
  getSpeed(): number
  getIsAlive(): boolean

  attack(target: Character): void
  heal(target: Character): void
  guard(target: Character): void
  skipTurn(): void
}
