import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const pokedexCommand: CLICommand = {
  name: "pokedex",
  description: "lists names of all caught pokemon",
  callback: async (state: State) => {
    const {pokedex} = state;
    const entries = pokedex.entries().toArray()
    if (entries.length === 0) {
      console.log("You haven't caught any Pokemon yet. Gotta catch em all!")
      return
    }
    for (const entry of entries) {
      console.log(` - ${entry[1].name}`)
    }
  }
}
