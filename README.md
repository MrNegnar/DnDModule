# DnD Fight Module

A TypeScript library for running turn-based fantasy combat encounters. This repository contains a reusable **module**, not a standalone game application. It also includes a small command-line demo for the original V01 implementation; the demo is not the purpose or interface of the V02 module.

## Which version should I use?

| Version | Status | What it provides |
| --- | --- | --- |
| **V01** | **Deprecated** | The original `Character`, `Player`, `Enemy`, and `FightEncounterHandler` implementation. It uses a fixed character model and the original action set. Kept in the repository for reference and compatibility; do not use it for new integrations. The V01 terminal demo can be used to try a simple fight. |
| **V02** | Current version | A generic fight handler and combat behavior that work with combatant classes supplied by the consuming application. Use this for new integrations. |

V01 and V02 are exported side by side from the package entry point. V02 exports use a `V02` suffix where names overlap. `CombatantInterface` is the V02 contract for combatants, even though its name has no version suffix. The npm package version is separate from these source API versions.

## What the module does

V02 manages a fight between player-side and enemy-side combatants. It sorts participants by speed, asks the caller to choose an action on each player turn, performs enemy turns automatically, and returns a surviving winner when one side is defeated. Combat calculations include attacks, offensive spells, armor, evasion, and healing.

The module does not provide a game UI, a character creation system, or ready-made V02 player/enemy classes. Your application supplies the combatant objects and decides how to present choices to its users.

## V02: what your application must provide

Each participant passed to the V02 fight handler must implement `CombatantInterface`:

- `getSpeed(): number` — used to order turns (highest speed first).
- `getArmor(): number` and `getEvasion(): number` — used to reduce damage and determine whether attacks hit.
- `getStrengthModifier(): number`, `getDexterityModifier(): number`, `getIntelligenceModifier(): number`, and `getWisdomModifier(): number` — used by attack, spell, and healing calculations.
- `takeDamage(amount: number): void`, `takeHealing(amount: number): void`, and `isAlive(): boolean` — used to update and check combat state.
- `raiseArmor(): void` and `raiseEvasion(): void` — used by the corresponding player actions.

The fight handler itself does not require name or hit point getters. Add those to your own classes if your application needs to display participant details.

Your application creates the player and enemy instances and passes them to `FightEncounterHandlerV02`. On each player turn, the callback receives the current player, living allies, and living opponents, then returns one `PlayerFightActionsV02` action:

- `{ type: 'attack', target }` — attack a living opponent.
- `{ type: 'offensiveSpell', target }` — cast an offensive spell on a living opponent.
- `{ type: 'raiseArmor' }` — increase the player's armor.
- `{ type: 'raiseEvasion' }` — increase the player's evasion.
- `{ type: 'heal', target }` — heal a living ally.
- `{ type: 'skipTurn' }` — take no action.

The callback is a decision point, not a UI. It can read input from a terminal, receive a choice from a web interface, or select actions using your own game rules. Enemies currently attack the first living player automatically.

## Using V02

Install the package in a consuming TypeScript project:

```bash
npm install rpg-fight-encounter
```

Import V02 explicitly. The example assumes `player` and `goblin` are instances of your own classes implementing `CombatantInterface`:

```typescript
import {
  FightEncounterHandlerV02,
  type ChoosePlayerActionV02,
  type CombatantInterface,
} from 'rpg-fight-encounter'

const player: CombatantInterface = createPlayer()
const goblin: CombatantInterface = createGoblin()

const fight = new FightEncounterHandlerV02([player], [goblin])

const chooseAction: ChoosePlayerActionV02<CombatantInterface, CombatantInterface> = (
  _player,
  _livingAllies,
  livingOpponents,
) => ({
  type: 'attack',
  target: livingOpponents[0],
})

const winner = fight.goThroughFullFight(chooseAction)
console.log('Winner:', winner)
console.log('Participants:', fight.getFightParticipants())
```

Replace `createPlayer()` and `createGoblin()` with your own constructors/factories that return objects implementing the required interface. In a real game, use concrete player and enemy types rather than `CombatantInterface` for both generic parameters, so TypeScript can distinguish valid ally and opponent targets.

`goThroughFullFight()` sets turn order, runs the encounter to completion, and returns the winning combatant. `getFightParticipants()` returns a read-only snapshot of the participants.

## V01: deprecated API

The original API remains available for reference, but is deprecated. It provides concrete `Player` and `Enemy` classes and a different handler flow (`setupFight()` followed by `startFight(...)`). V01 uses the original `CharacterInterface` and `FightEncounterHandlerInterface`; its actions are `attack`, `guard`, `heal`, and `skipTurn`. These types and classes are not interchangeable with V02.

The repository's `src/app.ts` is a terminal demo of V01. It does not demonstrate V02 usage. New code should import the V02 exports listed below and supply its own combatant implementations.

## Public V02 exports

- `CombatantInterface`
- `FightEncounterHandlerV02`
- `FightEncounterHandlerInterfaceV02`
- `CombatantBehavior`
- `ChoosePlayerActionV02`
- `PlayerFightActionsV02`

The V01 exports (`Player`, `Enemy`, `FightEncounterHandler`, and the unsuffixed action and interface types) remain in the entry point for deprecated compatibility.

## Project structure

The V02 files show the current implementation. V01 files are marked as deprecated; `src/app.ts` is a terminal demo of V01. `Dice.ts` is shared by both versions.

```text
.
├── src/
│   ├── app.ts                                      # V01 terminal demo
│   ├── index.ts                                    # Public exports for V01 and V02
│   ├── dice/
│   │   └── Dice.ts                                 # Dice rolling shared by both versions
│   ├── character/
│   │   ├── Character.ts                            # V01 base character (deprecated)
│   │   ├── CharacterInterface.ts                   # V01 character contract (deprecated)
│   │   ├── Player.ts                               # V01 player character (deprecated)
│   │   ├── Enemy.ts                                # V01 enemy character (deprecated)
│   │   ├── character.test.ts                       # V01 character tests
│   │   ├── V_02/
│   │   │   ├── CombatantInterface.ts               # Required V02 combatant contract
│   │   │   ├── combatantBehaviorInterface.ts        # Read-only behavior contract
│   │   │   └── CombatantBehavior.ts                 # V02 combat actions and calculations
│   │   └── behaviorCalculators/
│   │       ├── offensive.ts                        # V01 attack calculations (deprecated)
│   │       ├── defensive.ts                        # V01 defense calculations (deprecated)
│   │       └── V_02/
│   │           ├── offensive.ts                    # V02 attack calculations
│   │           └── defensive.ts                    # V02 defense and healing calculations
│   └── encounters/
│       └── fight/
│           ├── FightEncounterHandler.ts             # V01 fight loop (deprecated)
│           ├── fightEncounterHandlerInterface.ts    # V01 fight contract (deprecated)
│           ├── fightAction.ts                      # V01 player actions (deprecated)
│           ├── fightEncounterHandler.test.ts       # V01 fight tests
│           └── V_02/
│               ├── fightEncounterHandler.ts        # V02 fight loop
│               ├── fightEncounterHandlerInterface.ts # V02 fight contract
│               └── fightAction.ts                  # V02 actions and callback type
├── diagrams/
│   ├── classDiagram.puml                           # V01 design diagram
│   └── V_02/
│       └── classDiagram.puml                       # V02 design diagram
├── package.json                                    # Package metadata and npm scripts
├── tsconfig.json                                   # TypeScript configuration
└── tsconfig.build.json                             # Build configuration
```

## Author
Created by:
Thomas Landin
Second year student at Linnaeus University, Kalmar.

## License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code without restriction.
