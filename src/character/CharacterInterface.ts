import type { Character } from './Character.js'

export interface CharacterInterface {

  getName(): string
  getMaxHitPoints(): number
  getCurrentHitPoints(): number
  getAttackPower(): number
  getArmorClass(): number
  getSpeed(): number
  getIsAlive(): boolean
}
