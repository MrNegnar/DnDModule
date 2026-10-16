import { CombatantBehavior } from '../../../character/V_02/CombatantBehavior.js'
import type { ChoosePlayerAction, PlayerFightActions } from './fightAction.js'
import type { FightEncounterHandlerInterface } from './fightEncounterHandlerInterface.js'

interface FightParticipant {
  getSpeed(): number
  isAlive(): boolean
}
/**
 * Handles the logic for managing fight encounters in the game.
 */
export class FightEncounterHandler<TPlayer extends FightParticipant, TEnemy extends FightParticipant> implements FightEncounterHandlerInterface<TPlayer, TEnemy> {
  private playerFighters: TPlayer[] = []
  private enemyFighters: TEnemy[] = []
  private fightParticipants: (TPlayer | TEnemy)[] = []

  /**
   * Initializes the fight encounter handler by combining players and enemies into the fight members list.
   *
   * @param playerFighters - An array of player characters participating in the fight.
   * @param enemyFighters - An array of enemy characters participating in the fight.
   */
  constructor(playerFighters: TPlayer[], enemyFighters: TEnemy[]) {
    this.playerFighters = playerFighters
    this.enemyFighters = enemyFighters
    this.fightParticipants = [...playerFighters, ...enemyFighters]
  }

  /**
   * Gets the list of all fight members, including both players and enemies.
   *
   * @returns an array of all fight members in the encounter.
   */
  public getFightMembers(): readonly (TPlayer | TEnemy)[] {
    return [...this.fightParticipants]
  }

  /**
   * Gets the list of living team members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the player's or enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose allies are being retrieved. (used to determine the team they belong to)
   * @returns List of team members that are alive
   */
  public getLivingAllies(currentCharacter: TPlayer | TEnemy): (TPlayer | TEnemy)[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.playerFighters.filter((playerFighter) => playerFighter.isAlive())
    } else if (this.enemyFighters.includes(currentCharacter)) {
      return this.enemyFighters.filter((enemyFighter) => enemyFighter.isAlive())
    } else {
      throw new Error('Character does not belong to any team in this encounter.')
    }
  }

  /**
   * Gets the list of living enemy members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose opponents are being retrieved. (used to determine the team they belong to)
   * @returns List of enemy members that are alive
   */
  public getLivingOpponents(currentCharacter: TPlayer | TEnemy): (TPlayer | TEnemy)[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.enemyFighters.filter((enemyFighter) => enemyFighter.isAlive())
    } else if (this.enemyFighters.includes(currentCharacter)) {
      return this.playerFighters.filter((playerFighter) => playerFighter.isAlive())
    } else {
      throw new Error('Character does not belong to any team in this encounter.')
    }
  }

  /**
   * Goes through the full fight encounter by setting up the initial fight order and starting the fight sequence.
   * 
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  public goThroughFullFight(choosePlayerAction) {
    this.setFightOrder()
    this.startFight(choosePlayerAction)
  }

  /**
   * Starts the fight encounter by initiating the turn-based sequence of actions for each participant.
   *
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  private startFight(choosePlayerAction: ChoosePlayerAction<TPlayer, TEnemy>) {
    this.goThroughTurns(choosePlayerAction)
  }

  /**
   * Determines the order in which players and enemies will take their turns in the fight encounter.
   */
  private setFightOrder() {
    this.fightParticipants.sort((a, b) => b.getSpeed() - a.getSpeed())
  }

  /**
   * Starts a new turn for each fight participant in the encounter until one side has no living participants.
   *
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  private goThroughTurns(choosePlayerAction: ChoosePlayerAction<TPlayer, TEnemy>) {
    while (this.shouldFightContinue()) {
      for (let i = 0; i < this.fightParticipants.length; i++) {
        if (!this.shouldFightContinue()) {
          break
        }
        const currentParticipant = this.fightParticipants[i]
        if (currentParticipant.isAlive() === false) {
          continue
        }
        if (this.playerFighters.includes(currentParticipant)) {
          this.handlePlayerTurn(currentParticipant, choosePlayerAction)
        } else {
          this.handleEnemyTurn(currentParticipant)
        }
      }
    }
    this.endFight()
  }

  /**
   * Handles the logic for a player's turn during the fight encounter.
   *
   * @param player - The player character whose turn is being handled.
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  private handlePlayerTurn(player: TPlayer, choosePlayerAction: ChoosePlayerAction<TPlayer, TEnemy>) {
    const livingAllies = this.playerFighters.filter((member) => member.isAlive())
    const livingOpponents = this.enemyFighters.filter((member) => member.isAlive())
    const action = choosePlayerAction(player, livingAllies, livingOpponents)
    const target = this.enemyFighters.find((member) => member.isAlive())
    if (target) {
      CombatantBehavior.executePlayerAction(action, player, target)
    }
  }

  /**
   * Handles the logic for an enemy's turn during the fight encounter.
   *
   * @param currentEnemy the current enemy which action will be choosen.
   */
  private handleEnemyTurn(currentEnemy: TEnemy) {
    const target = this.playerFighters.find((member) => member.isAlive())
    if (target) {
      CombatantBehavior.executeEnemyAction(currentEnemy, target)
    }
  }

  /**
   * Checks if the fight is still ongoing based on the alive status of player and enemy fighters.
   *
   * @returns boolean - True if both player and enemy fighters are still alive, indicating the fight is ongoing; otherwise, false.
   */
  private shouldFightContinue(): boolean {
    return (
      this.playerFighters.some((player) => player.isAlive()) &&
      this.enemyFighters.some((enemy) => enemy.isAlive())
    )
  }
  /**
   * Handles the logic for ending the fight encounter.
   */
  private endFight() {
    if (this.playerFighters.some((player) => player.isAlive())) {
      console.log('Player won the fight!')
    } else {
      console.log('Enemy won the fight!')
    }
  }
}
