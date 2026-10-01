import { afterEach, describe, expect, it, vi } from "vitest";
import { Player } from "../character/Player.js";
import { Enemy } from "../character/Enemy.js";
import { FightEncounderHandler } from "./fightEncounderHandler.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("FightEncounderHandler", () => {
  it("Fight encounter ends when enemy 'team' is defeated", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const player = new Player("Krulle", 30, 1);
    const enemy = new Enemy("Goblin", 6, 1);
    const fight = new FightEncounderHandler([player], [enemy]);

    fight.startFight();


    expect(player.getIsAlive()).toBe(true);
    expect(enemy.getIsAlive()).toBe(false);
  })

    it("Fight encounter ends when player 'team' is defeated", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const player = new Player("Krulle", 3, 1);
    const enemy = new Enemy("Goblin", 30, 1);
    const fight = new FightEncounderHandler([player], [enemy]);

    fight.startFight();


    expect(player.getIsAlive()).toBe(false);
    expect(enemy.getIsAlive()).toBe(true);
  })
})