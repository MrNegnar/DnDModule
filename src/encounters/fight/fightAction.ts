import type { Character } from "../../character/Character.js";
import type { Player } from "../../character/Player.js";
import type { Enemy } from "../../character/Enemy.js";

export type PlayerFightAction =
| { type: "attack"; target: Enemy; }
| { type: "guard" }
| { type: "heal"; target: Player; }
| { type: "skip turn"; };

export type ChoosePlayerAction = (
  player: Player,
  livingAllies: Player[],
  livingOpponents: Enemy[]
) => PlayerFightAction;