# DnD Fight Module

A small TypeScript module for running turn-based D&D-style fight encounters: characters players can attack, guard, heal and take damage until one side is defeated (enemies can only attack and take damage atm.). Built with strict TypeScript, Vitest for testing, and no game UI baked in — any consumer (CLI, tests, or another app) supplies its own way of letting a player choose an action.

## ✨ Features

- **Characters**: `Player` and `Enemy` extend a shared `Character` base class with hit points, attack power, speed, armor class and healing.
- **Dice rolling**: a small `Dice` utility rolls arbitrary dice pools (e.g. `4d6` for starting HP) and resolves attack rolls.
- **Defense**: a separate `Defensive` behavior reduces incoming damage based on a character's armor class.
- **Fight encounters**: `fightEncounterHandler` manages turn order (by speed), living allies/opponents per side, and runs a fight until one team has no living members left.
- **Player actions**: a `PlayerFightActions` type (`attack`, `guard`, `heal`, `skipTurn`) lets any caller — a terminal prompt, a test, or a future UI — decide what a player does on their turn, without the fight logic needing to know how that choice was made.

## 🛠️ Getting Started

### Prerequisites

Ensure you have **Node.js** (version 24.12.0 or later, per `engines` in `package.json`) and **Git** installed on your machine.

### Setup

1. Clone the repository and move into it:

   ```bash
   git clone https://github.com/MrNegnar/DnDModule
   cd DnDModule
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running a Fight

The demo entry point (`src/app.ts`) sets up a player and a couple of enemies, then runs an interactive fight in the terminal:

```bash
npm start
```

During the player's turn you'll be prompted to choose an action, example:

```text
Krulle, Choose an action:
1. Attack
2. Guard
3. Heal
4. Skip turn
>
```

Enemies act automatically. The fight continues until either all players or all enemies are defeated.

### Using the Module in Your Own Code

`app.ts` is just a demo. The module itself is just a set of plain classes you can use however you like — for example, to script a fight without any terminal input:

```typescript
import { Player } from "./character/Player.js";
import { Enemy } from "./character/Enemy.js";
import { fightEncounterHandler } from "./encounters/fight/fightEncounterHandler.js";
import type { ChoosePlayerAction } from "./encounters/fight/fightAction.js";

const player = new Player("Krulle", 10, 2);
const goblin = new Enemy("Goblin", 8, 1);
const orc = new Enemy("Orc", 12, 2);

const fight = new fightEncounterHandler([player], [goblin, orc]);

// Always have the player attack the first living opponent.
const alwaysAttack: ChoosePlayerAction = (_player, _livingAllies, livingOpponents) => ({
  type: "attack",
  target: livingOpponents[0],
});

fight.startFight(alwaysAttack);

console.log(`${player.getName()} is alive: ${player.getIsAlive()}`);
```

Swap `alwaysAttack` for any function with the same `ChoosePlayerAction` signature — e.g. one that prompts a human, reads from a test fixture, or picks randomly — without touching the fight logic itself.

---

## 💻 Available Scripts

### Running the Application

```bash
npm start
```

### Type Checking

Runs the TypeScript compiler in check-only mode (no output files), including test files:

```bash
npm run typecheck
```

### Running Tests

Tests live next to the code they test (e.g. `src/character/character.test.ts`, `src/encounters/fight/fightEncounterHandler.test.ts`), using [Vitest](https://vitest.dev).

- **Interactive watch mode (recommended during development):**
  ```bash
  npm test
  ```
- **Single run (e.g. for CI or a quick check):**
  ```bash
  npm run test:run
  ```
- **Run a specific test file or name pattern:**
  ```bash
  npm run test:run -- src/character/character.test.ts
  npm run test:match -- <test-name-pattern>
  ```

Randomness (dice rolls) is made deterministic in tests via `vi.spyOn(Math, "random")`, so outcomes like exact HP values or hit/miss results can be asserted reliably.

### Code Linting

Analyze the source code in `src/` for errors, syntax issues, and anti-patterns:

```bash
npm run lint
```

Automatically fix fixable linting issues:

```bash
npm run lint:fix
```

### Formatting

Check if files comply with Prettier styling rules:

```bash
npm run format:check
```

Automatically reformat all source files:

```bash
npm run format
```

### Building

Compiles `src/` to plain JavaScript in `dist/`:

```bash
npm run build
```

`dist/` is git-ignored — it's a build artifact, regenerated on demand.

---

## 📁 Project Structure

```text
├── src/
│   ├── app.ts                         # Demo CLI entry point: sets up and runs a fight
│   ├── character/
│   │   ├── Character.ts               # Abstract base class: HP, attack, defend, guard, heal
│   │   ├── Player.ts                  # Player character (4d6 starting HP)
│   │   ├── Enemy.ts                   # Enemy character (4d4 starting HP)
│   │   └── character.test.ts          # Tests for HP, damage, death, guard and heal
│   ├── dice/
│   │   └── Dice.ts                    # Dice rolling and attack-hit checks
│   ├── behaviors/
│   │   └── defensive.ts               # Damage mitigation based on armor class
│   └── encounters/
│       └── fight/
│           ├── fightAction.ts             # PlayerFightActions type + ChoosePlayerAction callback type
│           ├── fightEncounterHandler.ts   # Turn order, targeting, and the fight loop
│           └── fightEncounterHandler.test.ts
├── diagrams/                          # PlantUML class/sequence/system diagrams
├── test/                              # Integration/system-level tests (higher-level flows)
├── dist/                              # Compiled JavaScript output (git-ignored)
├── tsconfig.json                      # Base TypeScript config (strict mode)
├── tsconfig.build.json                # Build-only config: extends the base, emits to dist/
├── package.json                       # Project configuration, scripts, and dependencies
└── LICENSE                            # Unlicense (Public Domain dedication)
```

---

## ⚖️ License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code in any way you see fit without any restrictions.

