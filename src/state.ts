import {
  createInterface,
  type Interface,
} from "node:readline"
import {
  stdin,
  stdout,
} from "node:process"
import {
  PokeAPI,
  type Pokemon,
} from "./pokeapi.js"
import {
  getCommands,
  CommandRegistry,
} from "./commands.js"

export type State = {
  rl: Interface;
  commands: CommandRegistry;
  pokeAPI: PokeAPI;
  nextLocationURL: string | undefined;
  prevLocationURL: string | undefined;
  pokedex: Map<string, Pokemon>;
}

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > "
  })
  const commands = getCommands()
  const pokeAPI = new PokeAPI();
  const nextLocationURL = "";
  const prevLocationURL = undefined;
  const pokedex = new Map()
  return {
    rl,
    commands,
    pokeAPI,
    nextLocationURL,
    prevLocationURL,
    pokedex
  }
}
