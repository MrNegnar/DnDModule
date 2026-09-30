import { Character } from "./Character.js";

/**
 * Represents a Enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {
  /**
   * Creates a new enemy character with the specified attributes.
   *
   * @param name - The name of the enemy character.
   * @param attackPower - The attack power of the enemy character.
   * @param attacksPerTurn - The number of attacks the enemy character can perform per turn.
   */
  constructor(name: string, attackPower: number, attacksPerTurn: number) {
    super(name, attackPower, attacksPerTurn);
  }
}