import { Player } from "../character/Player.js";
import { Enemy } from "../character/Enemy.js";
import { Character } from "../character/Character.js";

/**
 * Handles the logic for managing fight encounters in the game.
 */
export class FightEncounderHandler {
  
  public playerFighters: Player[] = [];
  public enemyFighters: Enemy[] = [];
  public fightParticipants: Character[] = [];
  private currentTurnIndex: number = 0;

  /**
   * Initializes the fight encounter handler by combining players and enemies into the fight members list.
   *
   * @param characterList - An array of characters (players and enemies) participating in a fight.
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
   * Starts the turn for the current participant in the fight encounter.
   * handles to much logic atm. is gonna get separeted into smaller methods for better readability and maintainability.
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
        const target = this.enemyFighters.find((member) => member.getIsAlive());
        if (target) {
          currentParticipant.attack(target); 
        } else {
          break;
        }
      } else {
        const target = this.playerFighters.find((member) => member.getIsAlive());
        if (target) {
          currentParticipant.attack(target);
        } else {
          break;
        }
      }
    }
    } while (this.playerFighters.some(player => player.getIsAlive()) && this.enemyFighters.some(enemy => enemy.getIsAlive()));
    console.log("The fight has ended.");

  }
}
