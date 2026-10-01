import { Player } from "../../character/Player.js";
import { Enemy } from "../../character/Enemy.js";
import { Character } from "../../character/Character.js";

/**
 * Handles the logic for managing fight encounters in the game.
 */
export class fightEncounterHandler {
  
  public playerFighters: Player[] = [];
  public enemyFighters: Enemy[] = [];
  public fightParticipants: Character[] = [];
  private currentTurnIndex: number = 0;

  /**
   * Initializes the fight encounter handler by combining players and enemies into the fight members list.
   *
   * @param playerFighters - An array of player characters participating in the fight.
   * @param enemyFighters - An array of enemy characters participating in the fight.
   */
  constructor(playerFighters: Player[], enemyFighters: Enemy[]) {
    this.playerFighters = playerFighters;
    this.enemyFighters = enemyFighters;
    this.fightParticipants = [...playerFighters, ...enemyFighters];
  }

  /**
   * Gets the list of all fight members, including both players and enemies.
   *
   * @returns an array of all fight members in the encounter.
   */
  public getFightMembers(): Character[] {
    return this.fightParticipants;
  }

  /**
   * Gets the list of living team members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the player's or enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose allies are being retrieved. (used to determine the team they belong to)
   * @returns List of team members that are alive
   */
  public getLivingAllies(currentCharacter: Character): Character[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.playerFighters.filter(playerFighter => playerFighter.getIsAlive());
    } else {
      return this.enemyFighters.filter(enemyFighter => enemyFighter.getIsAlive());
    }
    }

  /**
   * Gets the list of living enemy members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose opponents are being retrieved. (used to determine the team they belong to)
   * @returns List of enemy members that are alive
   */
  public getLivingOpponents(currentCharacter: Character): Character[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.enemyFighters.filter(enemyFighter => enemyFighter.getIsAlive());
    } else {
      return this.playerFighters.filter(playerFighter => playerFighter.getIsAlive());
    }
  }

  /**
   * Starts the fight encounter by initializing the fight participants and determining the fight order.
   */
  public startFight() {
    this.setFightOrder();
    this.startTurn();
  }

  /**
   * Determines the order in which players and enemies will take their turns in the fight encounter.
   */
  private setFightOrder() {
    this.fightParticipants.sort((a, b) => b.getSpeed() - a.getSpeed());
  }

  /**
   * Starts a new turn for each fight participant in the encounter until one side is defeated.
   */
  private startTurn() {
    do {
      for (let i = 0; i < this.fightParticipants.length; i++) {
      const currentParticipant = this.fightParticipants[i];
      if (currentParticipant.getIsAlive() === false) {
        continue;
      }
      console.log(`It's ${currentParticipant.getName()}'s turn.`);
      if (currentParticipant instanceof Player) {
        this.handlePlayerTurn(currentParticipant); 
      } else {
        this.handleEnemyTurn(currentParticipant);
      }
    }
    } while (this.playerFighters.some(player => player.getIsAlive()) && this.enemyFighters.some(enemy => enemy.getIsAlive()));
    console.log("The fight has ended.");
  }

  /**
   * Handles the logic for a player's turn during the fight encounter.
   *
   * @param player - The player character whose turn is being handled.
   */
  private handlePlayerTurn(player: Player) {
        const target = this.enemyFighters.find((member) => member.getIsAlive());
        if (target) {
          player.attack(target); 
        }
  }

  /**
   * Handles the logic for an enemy's turn during the fight encounter.
   *
   * @param enemy the current enemy which action will be choosen.
   */
  private handleEnemyTurn(enemy: Enemy) {
    const target = this.playerFighters.find((member) => member.getIsAlive());
    if (target) {
      enemy.attack(target);
    }
  }
}
