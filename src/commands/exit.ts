import {
  type CLICommand,
  type CommandRegistry,
} from "../repl.js"

function exitCallback(commands: CommandRegistry) {
  console.log("Closing the Pokedex... Goodbye!")
  process.exit(0)
}

export const exitCommand: CLICommand = {
  name: "exit",
  description: "Exits the pokedex",
  callback: exitCallback
}
