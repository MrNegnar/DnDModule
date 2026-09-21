/**
 * Represents a character in the game with basic attributes like name and hit points.
 */
export abstract class Character {

  public name: string;
  public maxHitPoints: number;
  public currentHitPoints: number;

  /**
   * Creates a new character with the specified name and hit points.
   *
   * @param name - The name of the character.
   * @param maxHitPoints - The total number of hitpoint a character have in total.
   * @param currentHitPoints - The number of hitpoints a character have currenty.
   */
  constructor(name: string, maxHitPoints: number, currentHitPoints: number) {
    this.setName(name);
    this.setMaxHitPoints(maxHitPoints);
    this.setCurrentHitPoints(currentHitPoints);
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
   * Sets the name of the character.
   *
   * @param name - The new name of the character.
   */
  private setName(name: string): void {
    if (!name || name.trim() === "") {
      throw new Error("Unknown");
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
  private takeDamge(damage: number): void {
    this.currentHitPoints -= damage;
    if (this.currentHitPoints < 0) {
      console.log("You be dead!");
      this.currentHitPoints = 0;
    }
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

}