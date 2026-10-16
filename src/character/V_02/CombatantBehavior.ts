import { Defensive } from '.././behaviorCalculators/V_02/defensive.js'
import { Offensive } from '.././behaviorCalculators/V_02/offensive.js'
import { Dice } from '../../dice/Dice.js'
import { PlayerFightActions } from '../../encounters/fight/V_02/fightAction.js'

/**
 * Represents the combat behavior of a character
 */
export class CombatantBehavior {

  constructor() {
    const dice = new Dice()
    const defensive = new Defensive()
    const offensive = new Offensive()
  }

    /**
   * Executes the specified action for the given player during their turn.
   *
   * @param player - The player character performing the action.
   * @param action - The action to be executed by the player.
   */
  public executePlayerAction(
    action: PlayerFightActions<TPlayer>): void {
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
        this.heal(player, action.target)
        return
      case 'skipTurn':
        return
    }
  }

  public executeEnemyAction(action: PlayerFightActions<TEnemy>): void {
    switch (action.type) {
      case 'attack':
        this.attack(PlayerFightActions, action.target)
        return
      case 'offensiveSpell':
        this.castOffensiveSpell(PlayerFightActions, action.target)
        return
      case 'raiseArmor':
        this.raiseArmor()
        return
      case 'raiseEvasion':
        this.raiseEvasion()
        return
      case 'heal':
        this.heal(PlayerFightActions, action.target)
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
    <TCharacter>.armor += 1;
  }

  /**
   * Raises the character's evasion by 1.
   * Makes a character harder to hit by enemies.
   */
  public raiseEvasion(): void {
    // TODO: Reference the character's evasion property correctly before incrementing
    <TCharacter>.evasion += 1;
  }

  /**
   * Attacks the specified target character.
   * Performs an attack on the target character if the attack hits.
   *
   * @param target - the target to be attacked.
   */
  public attack(player: TPlayer, target: TEnemy): void {
    let dieResult: number[]
    const attackHit = offensive.checkIfHit(target)
    if (attackHit) {
      let dieToRoll = [1, (player.strength-9)/2]
      dieResult = dice.rollDice(1, dieToRoll)
      const totalDamage = offensive.calculateDamage(dieResult)
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
  public heal(player: TPlayer): void {
    const healAmount = new Defensive().calculateHealApplied(player)
    // TODO: insert character reference for the healing target
  }

    /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    const damageToTake = new Defensive().calculateDamageTaken(damage)
    this.takeDamage(damageToTake)
  }

  /**
   * lowers the current hit points of the character by the specified damage amount.
   *
   * @param damage - The amount of damage to apply to the character.
   */
  private takeDamage(damage: number): void {
    this.currentHitPoints -= damage
    if (this.currentHitPoints < 0) {
      this.currentHitPoints = 0
    }
  }

}