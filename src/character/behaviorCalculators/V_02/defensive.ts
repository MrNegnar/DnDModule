import { Dice } from '../../../dice/Dice.js'
import { CombatantInterface } from '../../../character/V_02/CombatantInterface.js'

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
  calculateDamageTaken(damage: number, character: CombatantInterface): number {
    // Example implementation: reduce damage by a fixed amount (e.g., armor)
    const damageTaken = Math.max(0, damage - character.getArmor())
    return damageTaken
  }

  /**
   * Calculates the amount of healing applied to the character based on their wisdom modifier.
   *
   * @param caster - The character casting the healing spell.
   * @returns The amount of healing actually applied.
   */
  calculateHealApplied(caster: CombatantInterface): number {
    const dice = new Dice()
    const healDice = dice.rollDice(1, 4)
    let totalHeal = 0
    for (let i = 0; i < healDice.length; i++) {
      totalHeal += healDice[i]
    }
    const healfromCharacter = caster.getWisdomModifier()
    if (healfromCharacter < 0) {
      return totalHeal
    }
    return totalHeal + healfromCharacter
  }
}
