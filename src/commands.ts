import {
  catchCommand,
} from "./commands/catch.js"
import {
  exitCommand,
} from "./commands/exit.js"
import {
  exploreCommand,
} from "./commands/explore.js"
import {
  helpCommand,
} from "./commands/help.js"
import {
  inspectCommand,
} from "./commands/inspect.js"
import {
  mapCommand,
  mapBackCommand,
} from "./commands/map.js"
import {
  pokedexCommand,
} from "./commands/pokedex.js"
import {
  State,
} from "./state.js"

export function getCommands(): CommandRegistry {
  return {
    exit: exitCommand,
    help: helpCommand,
    map: mapCommand,
    mapb: mapBackCommand,
    explore: exploreCommand,
    catch: catchCommand,
    inspect: inspectCommand,
    pokedex: pokedexCommand,
  }
}
export type CommandRegistry = Record<string, CLICommand>

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void;
}
