import { afterEach, describe, expect, it, vi } from 'vitest'
import type { CombatantInterface } from '../../../character/V_02/CombatantInterface.js'
import { FightEncounterHandler } from './fightEncounterHandler.js'

afterEach(() => {
  vi.restoreAllMocks()
})

class TestCombatant implements CombatantInterface {
  private currentHitPoints = 20
  private armor = 0
  private evasion = 0
  private strengthModifier = 0
  private dexterityModifier = 0
  private intelligenceModifier = 0
  private wisdomModifier = 0

  constructor(
    public readonly name: string,
    private readonly speed: number,
  ) {}

  getSpeed(): number {
    return this.speed
  }

  getArmor(): number {
    return this.armor
  }

  getEvasion(): number {
    return this.evasion
  }

  getStrengthModifier(): number {
    return this.strengthModifier
  }

  getDexterityModifier(): number {
    return this.dexterityModifier
  }

  getIntelligenceModifier(): number {
    return this.intelligenceModifier
  }

  getWisdomModifier(): number {
    return this.wisdomModifier
  }

  takeDamage(amount: number): void {
    this.currentHitPoints = Math.max(0, this.currentHitPoints - amount)
  }

  isAlive(): boolean {
    return this.currentHitPoints > 0
  }

  raiseEvasion(): void {
    this.evasion += 1
  }

  raiseArmor(): void {
    this.armor += 1
  }

  takeHealing(amount: number): void {
    if (this.isAlive()) {
      this.currentHitPoints = Math.min(20, this.currentHitPoints + amount)
    }
  }
}

describe('V02 FightEncounterHandler', () => {
  it('orders turns by speed, supplies living teams to the callback, and returns the winner', () => {
    const fastPlayer = new TestCombatant('fast player', 10)
    const deadPlayer = new TestCombatant('dead player', 7)
    deadPlayer.takeDamage(20)
    const slowPlayer = new TestCombatant('slow player', 5)
    const enemy = new TestCombatant('enemy', 8)
    const deadEnemy = new TestCombatant('dead enemy', 4)
    deadEnemy.takeDamage(20)
    const fight = new FightEncounterHandler([fastPlayer, deadPlayer, slowPlayer], [enemy, deadEnemy])
    const turnOrder: string[] = []

    vi.spyOn(fight.combatantBehavior, 'executePlayerAction').mockImplementation((_player, action) => {
      if (action.type === 'attack') {
        action.target.takeDamage(20)
      }
    })
    vi.spyOn(fight.combatantBehavior, 'executeEnemyAction').mockImplementation(() => {
      turnOrder.push('enemy')
    })

    const winner = fight.goThroughFullFight((player, livingAllies, livingOpponents) => {
      turnOrder.push(player.name)
      expect(livingAllies).toEqual([fastPlayer, slowPlayer])
      expect(livingOpponents).toEqual([enemy])
      return player === slowPlayer
        ? { type: 'attack', target: livingOpponents[0] }
        : { type: 'skipTurn' }
    })

    expect(turnOrder).toEqual(['fast player', 'enemy', 'slow player'])
    expect(winner).toBe(fastPlayer)
    expect(enemy.isAlive()).toBe(false)
  })

  it('has enemies automatically attack the first living player', () => {
    const firstPlayer = new TestCombatant('first player', 1)
    const secondPlayer = new TestCombatant('second player', 2)
    const enemy = new TestCombatant('enemy', 10)
    const fight = new FightEncounterHandler([firstPlayer, secondPlayer], [enemy])
    const attackedTargets: CombatantInterface[] = []

    vi.spyOn(fight.combatantBehavior, 'executeEnemyAction').mockImplementation((_enemy, action) => {
      if (action.type === 'attack') {
        attackedTargets.push(action.target)
        action.target.takeDamage(20)
      }
    })
    vi.spyOn(fight.combatantBehavior, 'executePlayerAction').mockImplementation((_player, action) => {
      if (action.type === 'attack') {
        action.target.takeDamage(20)
      }
    })

    const winner = fight.goThroughFullFight((_player, _allies, opponents) => ({
      type: 'attack',
      target: opponents[0],
    }))

    expect(attackedTargets).toEqual([firstPlayer])
    expect(firstPlayer.isAlive()).toBe(false)
    expect(winner).toBe(secondPlayer)
  })

  it('returns a copy of the participant list', () => {
    const player = new TestCombatant('player', 2)
    const enemy = new TestCombatant('enemy', 1)
    const fight = new FightEncounterHandler([player], [enemy])
    const participants = fight.getFightParticipants()

    expect(participants).toEqual([player, enemy])
    expect(participants).not.toBe(fight.getFightParticipants())
  })

  it('rejects a character that is not part of the encounter', () => {
    const player = new TestCombatant('player', 2)
    const enemy = new TestCombatant('enemy', 1)
    const stranger = new TestCombatant('stranger', 3)
    const fight = new FightEncounterHandler([player], [enemy])

    expect(() => fight.getLivingAllies(stranger)).toThrow('Character does not belong to any team')
    expect(() => fight.getLivingOpponents(stranger)).toThrow('Character does not belong to any team')
  })
})



