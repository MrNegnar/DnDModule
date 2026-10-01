import type { Character } from "../../character/Character.js";

export type FightAction =
| { type: "attack"; target: Character; }
| { type: "guard"; target: Character; }
| { type: "heal"; target: Character; }
| { type: "skip turn"; target: Character; };