# Test Report

## Summary

The module is tested with automated Vitest tests. To repeat the run, use `npm ci` followed by `npm run test:run` from the repository root. The current run passed 12 tests in 2 files. Dice rolls are mocked where predictable results are needed.

## Test Results

> [!NOTE]
> **Character tests — 8 passed**  
> Source: [`character.test.ts`](src/character/character.test.ts)
>
> | What was tested | Test check | Result |
> | --- | --- | :---: |
> | Initial HP, minimum roll | Random mocked to `0`; expect 4 HP. | ✅ |
> | Initial HP, high roll | Random mocked to `0.9`; expect 24 HP. | ✅ |
> | Current HP on creation | Current HP equals maximum HP. | ✅ |
> | Non-lethal damage | Apply 4 damage; check HP and alive status. | ✅ |
> | Lethal damage | Apply 5 damage; check 0 HP and not alive. | ✅ |
> | Guarding | Armor class increases by 1. | ✅ |
> | Healing after damage | Heal a damaged player; check HP. | ✅ |
> | Healing at maximum HP | HP does not exceed the maximum. | ✅ |

> [!NOTE]
> **Fight tests — 4 passed**  
> Source: [`fightEncounterHandler.test.ts`](src/encounters/fight/fightEncounterHandler.test.ts)
>
> | What was tested | Test check | Result |
> | --- | --- | :---: |
> | Enemy team defeated | Run fight with an attack; check alive status. | ✅ |
> | Player team defeated | Skip turns; check alive status. | ✅ |
> | Player is faster | Mock speeds; check first participant. | ✅ |
> | Enemy is faster | Mock speeds; check first participant. | ✅ |

> [!WARNING]
> **Coverage gaps**  
> The current suite does not directly test `getLivingAllies()`, `getLivingOpponents()`, missed attacks, or healing a dead character.
