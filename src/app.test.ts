import { afterEach, describe, it, expect, vi } from 'vitest'
import { Player } from './character/Player.js'
import { Enemy } from './character/Enemy.js'

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
