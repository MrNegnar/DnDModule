import { afterEach, describe, expect, it, vi } from "vitest";
import { Player } from "../../character/Player.js";
import { Enemy } from "../../character/Enemy.js";
import { fightEncounterHandler } from "./fightEncounterHandler.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fightEncounterHandler", () => {
  it("Fight encounter ends when enemy 'team' is defeated", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const player = new Player("Krulle", 30);
    const enemy = new Enemy("Goblin", 6);
    const fight = new fightEncounterHandler([player], [enemy]);

    fight.startFight(() => ({ type: "attack", target: enemy })); 


    expect(player.getIsAlive()).toBe(true);
    expect(enemy.getIsAlive()).toBe(false);
  });

    it("Fight encounter ends when player 'team' is defeated", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const player = new Player("Krulle", 3);
    const enemy = new Enemy("Goblin", 30);
    const fight = new fightEncounterHandler([player], [enemy]);

    fight.startFight(() => ({ type: "skipTurn" })); 


    expect(player.getIsAlive()).toBe(false);
    expect(enemy.getIsAlive()).toBe(true);
  });

  it("player starts fight when having a higher speed attribute than the enemy", () => {
    const player = new Player("Krulle", 10);
    const enemy = new Enemy("Goblin", 6);

    vi.spyOn(player, "getSpeed").mockReturnValue(2);
    vi.spyOn(enemy, "getSpeed").mockReturnValue(1);

    const fight = new fightEncounterHandler([player], [enemy]);
    fight.startFight(() => ({ type: "attack", target: enemy })); 

    expect(fight.getFightMembers()[0]).toBe(player);
  });

    it("enemy starts fight when having a higher speed attribute than the player", () => {
    const player = new Player("Krulle", 10);
    const enemy = new Enemy("Goblin", 6);

    vi.spyOn(player, "getSpeed").mockReturnValue(1);
    vi.spyOn(enemy, "getSpeed").mockReturnValue(2);

    const fight = new fightEncounterHandler([player], [enemy]);
    fight.startFight(() => ({ type: "attack", target: enemy })); 

    expect(fight.getFightMembers()[0]).toBe(enemy);
  });
})