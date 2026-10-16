import { Dice } from '../../../dice/Dice.js'

/**
 * Represents the defensive behavior of a character, including damage mitigation.
 */
export class Defensive {
  /**
   * Calculates the amount of damage taken after applying defensive mitigation (e.g., armor).
   *
   * @param damage - The incoming damage before mitigation.
   * @param character - The character, going to use its armor to lower the incoming damage.
   * @returns The amount of damage actually taken after applying defensive mitigation.
   */
  calculateDamageTaken(damage: number, character: Character<TPlayer | TEnemy>): number {
    // Example implementation: reduce damage by a fixed amount (e.g., armor)
    const damageTaken = Math.max(0, damage - character.armor)
    return damageTaken
  }

  calculateHealApplied(character: Character<TPlayer | TEnemy>): number {
    const dice = new Dice()
    const healDice = dice.rollDice(character.wisdomModifier, 2)
    let healToApply = Number 
    for (let i = 0; i <healDice.length; i++) {
      healToApply += healDice[i]
    }
    return healToApply
  }
}
