import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const inspectCommand: CLICommand = {
  name: "inspect",
  description: "<pokemonName> - displays information about a pokemon that has been captured in your pokedex",
  callback: async (state: State, pokemonName: string) => {
    if (!pokemonName) {
      console.log("Inspect error: No pokemonName argument provided")
      return
    }
    const pokemon = state.pokedex.get(pokemonName);
    if (!pokemon) {
      console.log(`${pokemonName} has not been caught`)
      return
    }
    const {name, height, weight, stats, types} = pokemon
    console.log(`Name: ${name}`)
    console.log(`Height: ${height}`)
    console.log(`Weight: ${weight}`)
    console.log("Stats:")
    for (const stat of stats) {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
    }
    console.log("Types:")
    for (const type of types) {
      console.log(`  -${type.type.name}`)
    }
  }
}
