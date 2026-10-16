import { Defensive } from '.././behaviorCalculators/V_02/defensive.js'
import { Offensive } from '.././behaviorCalculators/V_02/offensive.js'
import { Dice } from '../../dice/Dice.js'
import { PlayerFightActions<TPlayer | TEnemy> } from '../../encounters/fight/V_02/fightAction.js'

/**
 * Represents the combat behavior of a character
 */
export class CombatantBehavior {

  const dice
  const defensive
  const offensive

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
  public executePlayerAction(player: TPlayer, action: PlayerFightActions<TPlayer>): void {
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
        this.healing(player, action.target)
        return
      case 'skipTurn':
        return
    }
  }

  public executeEnemyAction(Enemy: TEnemy, action: PlayerFightActions<TEnemy>): void {
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
        this.healing(PlayerFightActions, action.target)
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
    const attackHit = this.offensive.checkIfHit(target)
    if (attackHit) {
      let dieToRoll = 1 + player.strengthModifier
      dieResult = this.dice.rollDice(1, dieToRoll)
      const totalDamage = this.offensive.calculateDamage(dieResult)
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
    const totalDamage = this.offensive.calculateDamage(dieResult)
    target.defend(totalDamage, target)

    // TODO: Implement the logic for casting an offensive spell here
  }

    /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number, character: Character<TPlayer | TEnemy>): void {
    const damageToTake = this.defensive.calculateDamageTaken(damage, character)
    this.takeDamage(damageToTake, character)
  }

  /**
   * lowers the current hit points of the character by the specified damage amount.
   *
   * @param damage - The amount of damage to apply to the character.
   */
  private takeDamage(damage: number, character: Character<TPlayer | TEnemy>): void {
    character -= damage
    if (character.currentHitPoints < 0) {
      character.currentHitPoints = 0
    }
  }

  /**
  * Heals the character by the heal of current character's heal amount.
  *
  * @param caster The character who will cast the heal
  */
  public healing(caster: Character<TPlayer | TEnemy>, target: Character<TPlayer | TEnemy>): void {
    const healAmount = new Defensive().calculateHealApplied(caster)
    // TODO: insert character reference for the healing target
  }

}