import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const exitCommand: CLICommand = {
  name: "exit",
  description: "Exits the pokedex",
  callback: (state: State) => {
    console.log("Closing the Pokedex... Goodbye!")
    state.rl.close()
    process.exit(0)
  }
}
