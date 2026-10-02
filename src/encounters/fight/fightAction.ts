import type { Player } from "../../character/Player.js";
import type { Enemy } from "../../character/Enemy.js";

export type PlayerFightAction =
| { type: "attack"; target: Enemy; }
| { type: "guard" }
| { type: "heal"; target: Player; }
| { type: "skip turn"; };

export type ChoosePlayerAction = (
  _player: Player,
  _livingAllies: Player[],
  _livingOpponents: Enemy[]
) => PlayerFightAction;