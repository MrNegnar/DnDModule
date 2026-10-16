import { Defensive } from '.././behaviorCalculators/defensive.js'
import { Offensive } from '.././behaviorCalculators/offensive.js'
import { Dice } from '../../dice/Dice.js'

/**
 * Represents the combat behavior of a character
 */
export class CombatantBehavior {

    /**
   * Executes the specified action for the given player during their turn.
   *
   * @param player - The player character performing the action.
   * @param action - The action to be executed by the player.
   */
  private executePlayerAction(action: PlayerFightActions): void {
    switch (action.type) {
      case 'attack':
        player.attack(action.target)
        return
      case 'offensiveSpell':
        player.castOffensiveSpell(action.target)
        return
      case 'raiseArmor':
        player.raiseArmor()
        return
      case 'raiseEvasion':
        player.raiseEvasion()
        return
      case 'heal':
        player.heal(action.target)
        return
      case 'skipTurn':
        return
    }
  }

  /**
   * Raises the character's armor by 1.
   * Makes a character more resistant to incoming damage.
   */
  public raiseArmor(): void {
    // TODO: Reference the character's armor property correctly before incrementing
    armor += 1;
  }

  /**
   * Raises the character's evasion by 1.
   * Makes a character harder to hit by enemies.
   */
  public raiseEvasion(): void {
    // TODO: Reference the character's evasion property correctly before incrementing
    evasion += 1;
  }

  /**
   * Attacks the specified target character.
   * Performs an attack on the target character if the attack hits.
   *
   * @param target - the target to be attacked.
   */
  public attack(/* TODO: insert character and enemy reference*/): void {
    let dieResult: number[]
    const attackHit = new Offensive().checkIfHit()
    if (attackHit) {
      dieResult = new Dice().rollDice(/* TODO: insert character reference*/)
      const totalDamage = new Offensive().calculateDamage(dieResult)
      target.defend(totalDamage)
    } else {
      return
    }
  }

  /**
   * Casts an offensive spell on the specified target character.
   */
  public castOffensiveSpell(/* TODO: insert character and enemy reference*/): void {
    let dieResult: number[]
    dieResult = new Dice().rollDice(/* TODO: insert character reference*/)
    const totalDamage = new Offensive().calculateDamage(dieResult)
    target.defend(totalDamage)

    // TODO: Implement the logic for casting an offensive spell here
  }

    /**
   * Heals a target character by the heal of current character's heal amount.
   *
   * @param targetToHeal - The character to be healed.
   */
  public heal(/* TODO: insert character and healing target reference*/): void {
    if (targetToHeal.getIsAlive()) {
      targetToHeal.currentHitPoints += this.healAmount
      if (targetToHeal.currentHitPoints > targetToHeal.maxHitPoints) {
        targetToHeal.currentHitPoints = targetToHeal.maxHitPoints
      }
    }
  }

    /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    const damageToTake = new Defensive().calculateDamageTaken(damage, /* insert character reference */)
    this.takeDamage(damageToTake)
  }

}