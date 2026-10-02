import { afterEach, describe, it, expect, vi } from 'vitest'
import { Player } from './Player.js'

afterEach(() => {
  vi.restoreAllMocks()
})

it.each([
  { randomValue: 0, expectedHp: 4},
  { randomValue: 0.9, expectedHp: 24},
])("rolls $randomValue to get a total of $expectedHp initial HP", ({ randomValue, expectedHp }) => {
  vi.spyOn(Math, 'random').mockReturnValue(randomValue);

  const player = new Player("Krulle", 10, 1);

  expect(player.getMaxHitPoints()).toBe(expectedHp);
});

it("starts with current HP equal to maximum HP", () => {
  const player = new Player("Krulle", 10, 1);

  expect(player.getCurrentHitPoints()).toBe(player.getMaxHitPoints());
});

describe("Player taking damage", () => {
  it("reduces current HP when taking damage", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const player = new Player("Krulle", 10, 1);
    
    player.defend(4);

    expect(player.getCurrentHitPoints()).toBe(1);
    expect(player.getIsAlive()).toBe(true);
  });

  it("Sets characters as not alive when current HP reaches 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const player = new Player("Krulle", 10, 1);

    player.defend(5);

    expect(player.getCurrentHitPoints()).toBe(0);
    expect(player.getIsAlive()).toBe(false);
  });

});

it("Armorclass gets higher after guarding", () => {
  const player = new Player("Krulle", 10, 1);
  const initialArmorClass = player.getArmorClass();

  player.guard();

  expect(player.getArmorClass()).toBe(initialArmorClass + 1);
});