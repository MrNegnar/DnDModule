import { Defensive } from '.././behaviorCalculators/V_02/defensive.js'
import { Offensive } from '.././behaviorCalculators/V_02/offensive.js'
import { Dice } from '../../dice/Dice.js'
import type { PlayerFightActions } from '../../encounters/fight/V_02/fightAction.js'
import type { CombatantInterface } from './CombatantInterface.js'

/**
 * Represents the combat behavior of a character
 */
export class CombatantBehavior {

  private dice
  private defensive
  private offensive

  /**
   * Initializes the combat behavior, including dice, defensive, and offensive calculators.
   */
  constructor() {
    this.dice = new Dice()
    this.defensive = new Defensive()
    this.offensive = new Offensive()
  }

  /**
   * Executes the specified action for the given player during their turn.
   *
   * @param player - The player character performing the action.
   * @param action - The action to be executed by the player.
   */
  public executePlayerAction(player: CombatantInterface, action: PlayerFightActions<CombatantInterface>): void {
    switch (action.type) {
      case 'attack':
        this.attack(player, action.target)
        return
      case 'offensiveSpell':
        this.castOffensiveSpell(player, action.target)
        return
      case 'raiseArmor':
        this.raiseArmor(player)
        return
      case 'raiseEvasion':
        this.raiseEvasion(player)
        return
      case 'heal':
        this.healing(player, action.target)
        return
      case 'skipTurn':
        return
    }
  }

  public executeEnemyAction(Enemy: CombatantInterface, action: PlayerFightActions<CombatantInterface>): void {
    switch (action.type) {
      case 'attack':
        this.attack(Enemy, action.target)
        return
      case 'offensiveSpell':
        this.castOffensiveSpell(Enemy, action.target)
        return
      case 'raiseArmor':
        this.raiseArmor(Enemy)
        return
      case 'raiseEvasion':
        this.raiseEvasion(Enemy)
        return
      case 'heal':
        this.healing(Enemy, action.target)
        return
      case 'skipTurn':
        return
    }
  }

  /**
   * Raises the character's armor by 1.
   * Makes a character more resistant to incoming damage.
   *
   * @param character - The character whose armor is being raised.
   */
  public raiseArmor(character: CombatantInterface): void {
    character.raiseArmor();
  }

  /**
   * Raises the character's evasion by 1.
   * Makes a character harder to hit by enemies.
   *
   * @param character - The character whose evasion is being raised.
   */
  public raiseEvasion(character: CombatantInterface): void {
    character.raiseEvasion();
  }

  /**
   * Attacks the specified target character.
   * Performs an attack on the target character if the attack hits.
   *
   * @param player - The character performing the attack.
   * @param target - The target character to be attacked.
   */
  public attack(player: CombatantInterface, target: CombatantInterface): void {
    const attackHit = this.offensive.checkIfHit(target)
    if (attackHit) {
      const damageRolls = this.offensive.calculateAttackDamage(player)
      const totalDamage = this.offensive.calculateDamage(damageRolls)
      this.defend(totalDamage, target)
    } else {
      return
    }
  }

  /**
   * Casts an offensive spell on the specified target character.
   *
   * @param player - The character casting the offensive spell.
   * @param target - The target character to be affected by the offensive spell.
   */
  public castOffensiveSpell(player: CombatantInterface, target: CombatantInterface): void {
    let dieResult: number[]
    dieResult = new Dice().rollDice(player.getIntelligenceModifier(), 4)
    const totalDamage = this.offensive.calculateDamage(dieResult)
    this.defend(totalDamage, target)

    // TODO: Implement the logic for casting an offensive spell here
  }

  /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   * @param character - The character whose defense is being applied.
   */
  public defend(damage: number, character: CombatantInterface): void {
    const damageToTake = this.defensive.calculateDamageTaken(damage, character)
    this.takeDamage(damageToTake, character)
  }

  /**
   * lowers the current hit points of the character by the specified damage amount.
   *
   * @param damage - The amount of damage to apply to the character.
   * @param character - The character who will take the damage.
   */
  private takeDamage(damage: number, character: CombatantInterface): void {
    character.takeDamage(damage)
  }

 /**
  * Heals the character by the heal of current character's heal amount.
  *
  * @param caster The character who will cast the heal
  * @param target - The character who will receive the healing.
  */
  public healing(caster: CombatantInterface, target: CombatantInterface): void {
    const healAmount = this.defensive.calculateHealApplied(caster)
    this.heal(target, healAmount)
    // TODO: insert character reference for the healing target
  }

  public heal(target: CombatantInterface, healAmount: int)

}