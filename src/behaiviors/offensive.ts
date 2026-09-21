import Dice from "../dice/Dice";
import Character from "../character/Character";
export class Offensive {

  /**
   * Checks if the attack hits based on a random chance.
   *
   * @returns true if the attack hits, false otherwise.
   */
  checkIfHit() {
    return Dice.roll(1, 20) > 10; // Example: hit if roll is greater than 10
  }

  /**
   * Calculates the total damage from an array of individual damage values.
   *
   * @param damage - An array of individual damage values.
   * @returns The total damage calculated from the array.
   */
  private calculateDamage(damage: Array<number>): number {
    let totalDamage = 0;
    for (const dmg of damage) {
      totalDamage += dmg;
    }
    return totalDamage;
  }
  
  /**
   * Performs an attack on the target character with the specified damage.
   * 
   * @param target - The target character to attack.
   * @param damage - The amount of damage to inflict on the target.
   */
  attack(target: Character, damage: number) {
    target.defend(damage);
  }
}
