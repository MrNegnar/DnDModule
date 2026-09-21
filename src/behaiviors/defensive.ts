export class Defensive {
  calculateDamageTaken(damage: number): number {
    // Example implementation: reduce damage by a fixed amount (e.g., armor)
    const damageTaken = Math.max(0, attackPower - 2); // Assuming 2 is the armor value
    return damageTaken;
  }
}