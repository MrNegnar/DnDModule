import { Dice } from '../../../dice/Dice.js'
import { CombatantInterface } from '../../V_02/CombatantInterface.js'

/**
 * Represents the offensive behavior of a character, including attack and damage calculation.
 */
export class Offensive {
  /**
   * Checks if the attack hits based on a random chance.
   *
   * @param attacker the character who is performing the attack.
   * @param target the target character to be checked if hit.
   * @returns true if the attack hits, false otherwise.
   */
  public checkIfHit(attacker: CombatantInterface, target: CombatantInterface) {
    const dice = new Dice()
    return dice.rollDice(1, 20)[0] > 10 + target.getEvasion() - attacker.getDexterityModifier()
  }

  /**
   * Calculates the damage for an attack based on the attacker's attributes and dice rolls.
   *
   * @param attacker The character who will do the attack.
   * @returns The calculated attack damage.
   */
  public calculateAttackDamage(attacker: CombatantInterface): number[] {
    const dice = new Dice()
    const damageRoll = dice.rollDice(1, 4)
    if (attacker.getStrengthModifier() < 0) {
      return [...damageRoll]
    }
    return [...damageRoll, attacker.getStrengthModifier()]
  }

  /**
   * Calculates the total damage from an array of individual damage values.
   *
   * @param damage - An array of individual damage values.
   * @returns The total damage calculated from the array.
   */
  public calculateDamage(damage: number[]): number {
    let totalDamage = 0
    for (const dmg of damage) {
      totalDamage += dmg
    }
    return totalDamage
  }
}
