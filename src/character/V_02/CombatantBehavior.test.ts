import { afterEach, describe, expect, it, vi } from 'vitest'
import type { CombatantInterface } from './CombatantInterface.js'
import { CombatantBehavior } from './CombatantBehavior.js'

afterEach(() => {
  vi.restoreAllMocks()
})

class TestCombatant implements CombatantInterface {
  currentHitPoints = 20
  armor = 0
  evasion = 0
  strengthModifier = 0
  dexterityModifier = 0
  intelligenceModifier = 0
  wisdomModifier = 0

  getSpeed(): number {
    return 1
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

describe('V02 CombatantBehavior', () => {
  it('applies an attack hit using dexterity, strength, and target armor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const attacker = new TestCombatant()
    const target = new TestCombatant()
    attacker.strengthModifier = 1
    target.armor = 2

    new CombatantBehavior().executePlayerAction(attacker, { type: 'attack', target })

    expect(target.currentHitPoints).toBe(17)
  })

  it('does not apply damage when an attack misses', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const attacker = new TestCombatant()
    const target = new TestCombatant()

    new CombatantBehavior().executePlayerAction(attacker, { type: 'attack', target })

    expect(target.currentHitPoints).toBe(20)
  })


  it('uses attacker dexterity and target evasion in the hit check', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const behavior = new CombatantBehavior()
    const dexterousAttacker = new TestCombatant()
    const ordinaryTarget = new TestCombatant()
    dexterousAttacker.dexterityModifier = 1
    random.mockReturnValueOnce(0.45)

    behavior.executePlayerAction(dexterousAttacker, { type: 'attack', target: ordinaryTarget })

    expect(ordinaryTarget.currentHitPoints).toBe(16)

    const ordinaryAttacker = new TestCombatant()
    const evasiveTarget = new TestCombatant()
    evasiveTarget.evasion = 1
    random.mockReturnValueOnce(0.5)

    behavior.executePlayerAction(ordinaryAttacker, { type: 'attack', target: evasiveTarget })

    expect(evasiveTarget.currentHitPoints).toBe(20)
  })
  it('casts an offensive spell using intelligence and target armor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const caster = new TestCombatant()
    const target = new TestCombatant()
    caster.intelligenceModifier = 2
    target.armor = 1

    new CombatantBehavior().executePlayerAction(caster, { type: 'offensiveSpell', target })

    expect(target.currentHitPoints).toBe(13)
  })

  it('raises armor and evasion for the corresponding actions', () => {
    const combatant = new TestCombatant()
    const behavior = new CombatantBehavior()

    behavior.executePlayerAction(combatant, { type: 'raiseArmor' })
    behavior.executePlayerAction(combatant, { type: 'raiseEvasion' })

    expect(combatant.armor).toBe(1)
    expect(combatant.evasion).toBe(1)
  })

  it('heals a target using a d4 roll and the caster wisdom modifier', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const caster = new TestCombatant()
    const target = new TestCombatant()
    caster.wisdomModifier = 1
    target.takeDamage(3)

    new CombatantBehavior().executePlayerAction(caster, { type: 'heal', target })

    expect(target.currentHitPoints).toBe(20)
  })

  it('does not change hit points when the player skips a turn', () => {
    const player = new TestCombatant()
    const behavior = new CombatantBehavior()

    behavior.executePlayerAction(player, { type: 'skipTurn' })

    expect(player.currentHitPoints).toBe(20)
  })

  it('can execute an enemy attack through the same combat behavior', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const enemy = new TestCombatant()
    const player = new TestCombatant()
    enemy.strengthModifier = 1
    player.armor = 2

    new CombatantBehavior().executeEnemyAction(enemy, { type: 'attack', target: player })

    expect(player.currentHitPoints).toBe(17)
  })
})


