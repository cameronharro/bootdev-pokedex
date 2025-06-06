import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const helpCommand: CLICommand = {
  name: "help",
  description: "Displays a help command",
  callback: (state: State) => {
    const {commands} = state
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    console.log("")
    for (const key in commands) {
      console.log(`${key}: ${commands[key].description}`)
    }
  }
}
