import {
  type CLICommand,
  type CommandRegistry,
} from "../repl.js"

function helpCallback(commands: CommandRegistry) {
  console.log("Welcome to the Pokedex!")
  console.log("Usage:")
  console.log("")
  for (const key in commands) {
    console.log(`${key}: ${commands[key].description}`)
  }
}

export const helpCommand = {
  name: "help",
  description: "Displays a help command",
  callback: helpCallback
}
