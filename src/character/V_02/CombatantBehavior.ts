import { Defensive } from '.././behaviorCalculators/defensive.js'
import { Offensive } from '.././behaviorCalculators/offensive.js'
import { Dice } from '../../dice/Dice.js'
import { PlayerFightActions<TPlayer, TEnemy> } from '../../encounters/fight/V_02/fightAction.js'

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
  public executeCharacterAction(action: PlayerFightActions<TPlayer, TEnemy>, player: TPlayer, target: TEnemy): void {
    switch (action.type) {
      case 'attack':
        this.attack(player, action.target)
        return
      case 'offensiveSpell':
        this.castOffensiveSpell(player, action.target)
        return
      case 'raiseArmor':
        this.raiseArmor()
        return
      case 'raiseEvasion':
        this.raiseEvasion()
        return
      case 'heal':
        this.heal()
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
  public attack(player: TPlayer, target: TEnemy): void {
    let dieResult: number[]
    const attackHit = new Offensive().checkIfHit(target)
    if (attackHit) {
      let dieToRoll = [1, (player.strength-9)/2]
      dieResult = new Dice().rollDice(dieToRoll)
      const totalDamage = new Offensive().calculateDamage(dieResult)
      target.defend(totalDamage)
    } else {
      return
    }
  }

  /**
   * Casts an offensive spell on the specified target character.
   */
  public castOffensiveSpell(player: TPlayer, target: TEnemy): void {
    let dieResult: number[]
    let playerIntelligenceModifier = (player.intelligence-9)/2

    dieResult = new Dice().rollDice(1, playerIntelligenceModifier)
    const totalDamage = new Offensive().calculateDamage(dieResult)
    target.defend(totalDamage)

    // TODO: Implement the logic for casting an offensive spell here
  }

  /**
   * Heals the character by the heal of current character's heal amount.
   */
  public heal(/* TODO: insert character and healing target reference*/): void {
    const healAmount = new Defensive().calculateHealTaken()
    // TODO: insert character reference for the healing target
  }

    /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    const damageToTake = new Defensive().calculateDamageTaken(damage, )
    .takeDamage(damageToTake)
  }

}