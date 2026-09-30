import { Player } from "../character/Player.js";
import { Enemy } from "../character/Enemy.js";
import { Character } from "../character/Character.js";

/**
 * Handles the logic for managing fight encounters in the game.
 */
export class FightEncounderHandler {
  
  public fightParticipants: (Player | Enemy)[] = [];
  private currentTurnIndex: number = 0;

  /**
   * Initializes the fight encounter handler by combining players and enemies into the fight members list.
   *
   * @param player the player character participating in the fight.
   * @param enemy the enemy character participating in the fight.
   */
  constructor(private player: Character, private enemy: Character) {
  }

  /**
   * Gets the list of all fight members, including both players and enemies.
   *
   * @returns an array of all fight members in the encounter.
   */
  public getFightMembers(): (Player | Enemy)[] {
    return this.fightParticipants;
  }

  /**
   * Starts the fight encounter by initializing the fight participants and determining the fight order.
   */
  public startFight() {
    this.fightParticipants = [this.player as Player, this.enemy as Enemy];
    this.setFightOrder();
    this.startTurn(this.fightParticipants);
  }

  /**
   * Determines the order in which players and enemies will take their turns in the fight encounter.
   */
  private setFightOrder() {
    this.fightParticipants.sort((a, b) => b.getAttacksPerTurn() - a.getAttacksPerTurn());
  }

  /**
   * Starts the turn for the current participant in the fight encounter.
   *
   * @param fightParticipants The array of fight participants for the current turn.
   */
  private startTurn(fightParticipants: (Player | Enemy)[]) {
    do {
      for (let i = 0; i < fightParticipants.length; i++) {
      const currentParticipant = fightParticipants[i];
      if (currentParticipant.getIsAlive() === false) {
        continue;
      }
      console.log(`It's ${currentParticipant.getName()}'s turn.`);
      if (currentParticipant instanceof Player) {
        currentParticipant.attack(this.enemy as Enemy);
      } else {
        currentParticipant.attack(this.player as Player);
      }
    }
    } while (this.player.getIsAlive() && this.enemy.getIsAlive());
    console.log("The fight has ended.");

  }

  /**
   * When it is the player's turn, this method handles the player's turn choice and executes the attack on the enemy.
   */
  public playerTurnChoice(): void {
    console.log(`${this.player.getName()} is making a turn choice.`);
    (this.player as Player).attack(this.enemy as Enemy);
  }

}
