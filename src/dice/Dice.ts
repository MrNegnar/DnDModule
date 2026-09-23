/**
 * Represents a dice rolling utility for generating random dice results.
 */
export class Dice {

  /**
   * Rolls the specified number of dice with the given number of sides.
   *
   * @param quantity - The number of die to roll.
   * @param sides - The number of sides on each die.
   * @returns An array containing the results of each die roll.
   */
  public rollDice(quantity: number, sides: number): number[] {
    const diceResults: number[] = [];
    for (let i = 0; i < quantity; i++) {
      diceResults.push(Math.floor(Math.random() * sides) + 1);
    }
    return diceResults;
  }

  /**
   * Generates a random number representing the number of dice to roll, up to the specified maximum.
   *
   * @param maximum - The maximum number of dice that can be rolled.
   * @returns A random number between 1 and the specified maximum, representing the number of dice to roll.
   */
  public howMManyDice (maximum: number): number {
    return Math.floor(Math.random() * maximum) + 1;
  }
}
