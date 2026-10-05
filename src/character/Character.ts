import { Defensive } from "../behaviors/defensive.js";
import { Dice } from "../dice/Dice.js";
/**
 * Represents a character in the game with basic attributes like name and hit points.
 */
export abstract class Character {
  private name!: string;
  private maxHitPoints!: number;
  private currentHitPoints!: number;
  private isAlive: boolean;
  private attackPower: number;
  private numberOfAttacks: number;
  private speed: number;
  private armorClass: number;
  private healAmount: number;

  /**
   * Creates a new character with the specified name and hit points.
   *
   * @param name - The name of the character.
   * @param attackPower - The attack power of the character.
   * @param startHpNumberOfDice - The number of dice to roll for determining initial hit points.
   * @param startHpSidesPerDie - The number of sides on each die for determining initial hit points.
   */
  constructor(name: string, attackPower: number, startHpNumberOfDice: number, startHpSidesPerDie: number) {
    this.setName(name);
    this.setInitialHitPoints(startHpNumberOfDice, startHpSidesPerDie);
    this.attackPower = attackPower;
    this.numberOfAttacks = 1;
    this.isAlive = true;
    this.speed = 1;
    this.armorClass = 1;
    this.healAmount = 5;
  }

  /**
   * Gets the speed of the character.
   *
   * @returns the speed of the given character.
   */
  public getSpeed(): number {
    return this.speed;
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
   * Gets the armor class of the character.
   *
   * @returns the armor class of the given character.
   */
  public getArmorClass(): number {
    return this.armorClass;
  }

  /**
   * Checks if the character is alive based on current hit points.
   *
   * @returns true if the character is alive, false otherwise.
   */
  public getIsAlive(): boolean {
    if (this.currentHitPoints <= 0) {
      this.isAlive = false;
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
   * Setting the total amount of hp for a character when created.
   *
   * @param numberOfDice - The number of dice to roll for determining initial hit points.
   * @param sidesPerDie - The number of sides on each die.
   */
  private setInitialHitPoints(numberOfDice: number, sidesPerDie: number): void {
    const startingHitPoints: number[] =  new Dice().rollDice(numberOfDice, sidesPerDie); // Example: roll 4 six-sided dice to determine starting hit points
    let totalStartingHitPoints = 0;
    for (const healthPoints of startingHitPoints) {
      totalStartingHitPoints += healthPoints;
    }
    this.maxHitPoints = totalStartingHitPoints;
    this.currentHitPoints = this.maxHitPoints;
  }

  /**
   * adds hit points to the character's maximum hit points.
   *
   * @param addingHitPoints - The amount of hit points to add to the character's maximum hit points.
   */
  private setMaxHitPoints(addingHitPoints: number): void {
    this.maxHitPoints += addingHitPoints;
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
   * Heals a target character by the heal of current character's heal amount.
   *
   * @param targetToHeal - The character to be healed.
   */
  public heal(targetToHeal: Character): void {
    targetToHeal.currentHitPoints += this.healAmount;
    if (targetToHeal.currentHitPoints > targetToHeal.maxHitPoints) {
      targetToHeal.currentHitPoints = targetToHeal.maxHitPoints;
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
    let dieResult: number[];
    const attackHit = new Dice().checkIfAttackHit();
    if (attackHit) {
      dieResult = new Dice().rollDice(this.numberOfAttacks, this.attackPower);
      for (const die of dieResult) {
        totalDamage += die;
      }
      totalDamage = dieResult.reduce((sum, val) => sum + val, 0);
      target.defend(totalDamage);
    } else {
      console.log(`${this.getName()}'s attack missed.`);
    }
  }

  /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    console.log(`Incoming damage: ${damage}`);
    const damageToTake = new Defensive().calculateDamageTaken(damage, this.armorClass);
    console.log(`Damage to take after defense: ${damageToTake}`);
    this.takeDamage(damageToTake);
  }

  /**
   * Performs a guard action to raise the character's defense and lower the incoming damage.
   */
  public guard(): void {
    this.armorClass += 1;
  }
}
