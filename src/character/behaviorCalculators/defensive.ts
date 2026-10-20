import { CombatantInterface } from '../V_02/CombatantInterface'

/**
 * Represents the defensive behavior of a character, including damage mitigation.
 */
export class Defensive {
  /**
   * Calculates the amount of damage taken after applying defensive mitigation (e.g., armor).
   *
   * @param damage - The incoming damage before mitigation.
   * @param target - The character receiving the damage.
   * @returns The amount of damage actually taken after applying defensive mitigation.
   */
  calculateDamageTaken(damage: number, target: CombatantInterface): number {
    const damageTaken = Math.max(0, damage - target.getArmor())
    return damageTaken
  }
}
