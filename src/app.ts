#!/usr/bin/env node

import { Player } from "./character/Player.js";

/**
 * Extracts the name argument from the command line.
 *
 * @example
 * parseArgs(['Ada Lovelace']) // Returns 'Ada Lovelace'
 * parseArgs([]) // Returns undefined
 * @param argv - Command-line arguments, excluding the node executable and
 *   script path (i.e. `process.argv.slice(2)`).
 * @returns The first positional argument, if any.
 */
export function parseArgs(argv: string[]): string | undefined {
  return argv[0]
}

/**
 * Execution entry point.
 */
function main(): void {

  try {
    const player1 = new Player("Krulle", 10, 2)
    console.log(player1);
  } catch (error) {
    console.error('An unexpected error occurred during execution:', (error as Error).message)
    process.exitCode = 1
  }
}

main()
