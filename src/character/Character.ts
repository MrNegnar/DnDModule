import { Offensive } from "../behaiviors/offensive";
import { Defensive } from "../behaiviors/defensive";
import Dice from "../dice/Dice";
/**
 * Represents a character in the game with basic attributes like name and hit points.
 */
export abstract class Character {
  private name: string;
  private maxHitPoints: number;
  private currentHitPoints: number;
  private isAlive: boolean;
  private attacksPerTurn: number;
  private attackPower: number;

  /**
   * Creates a new character with the specified name and hit points.
   *
   * @param name - The name of the character.
   * @param maxHitPoints - The total number of hit points a character has.
   * @param attackPower - The attack power of the character.
   */
  constructor(name: string, maxHitPoints: number) {
    this.setName(name);
    this.setMaxHitPoints(maxHitPoints);
    this.currentHitPoints = maxHitPoints;
    this.attackPower = 10;
    this.attacksPerTurn = 1;
    this.isAlive = true;
  }

  /**
   * Gets the name of the character.
   *
   * @returns the name of the given character
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Gets the maximum hit points of the character.
   *
   * @returns the maximum hit points of the given character
   */
  public getMaxHitPoints(): number {
    return this.maxHitPoints;
  }

  /**
   * Gets the current hit points of the character.
   *
   * @returns the current hit points of the given character
   */
  public getCurrentHitPoints(): number {
    return this.currentHitPoints;
  }

  /**
   * Gets the attack power of the character.
   *
   * @returns the attack power of the given character.
   */
  public getAttackPower(): number {
    return this.attackPower;
  }

  /**
   * Checks if the character is alive based on current hit points.
   *
   * @returns true if the character is alive, false otherwise.
   */
  public getIsAlive(): boolean {
    if (this.currentHitPoints <= 0) {
      this.isAlive = false;
      console.log(`${this.name} has died.`);
    }
    return this.isAlive;
  }

  /**
   * Sets the name of the character.
   *
   * @param name - The new name of the character.
   */
  private setName(name: string): void {
    if (!name || name.trim() === "") {
      this.name = "Unknown";
    } else {
      this.name = name;
    }
  }

  /**
   * Sets the maximum hit points of the character.
   *
   * @param maxHitPoints - The new maximum hit points of the character.
   */
  private setMaxHitPoints(maxHitPoints: number): void {
    if (maxHitPoints <= 0) {
      throw new Error("Invalid maximum hit points");
    } else {
      this.maxHitPoints = maxHitPoints;
    }
  }

  /**
   * lowers the current hit points of the character by the specified damage amount.
   *
   * @param damage - The amount of damage to apply to the character.
   */
  private takeDamage(damage: number): void {
    this.currentHitPoints -= damage;
    this.getIsAlive();
  }

  /**
   * Heals the character by the specified amount.
   *
   * @param amount - The amount of hit points to restore to the character.
   */
  private heal(amount: number): void {
    this.currentHitPoints += amount;
    if (this.currentHitPoints > this.maxHitPoints) {
      this.currentHitPoints = this.maxHitPoints;
    }
  }

  /**
   * Attacks the specified target character.
   * Performs an attack on the target character if the attack hits.
   *
   * @param target - the target to be attacked.
   */
  public attack(target: Character): void {
    let totalDamage = 0;
    let dieResult = 0;
    if (Offensive.checkIfHit()) {
      dieResult = Dice.roll(this.attacksPerTurn, this.attackPower);
      totalDamage = Offensive.calculateDamage(dieResult);
      Offensive.attack(target, totalDamage);
    }
  }

  /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    let damageToTake = 0;
    damageToTake = Defensive.calculateDamageTaken(damage);
    this.takeDamage(damageToTake);
  }
}
