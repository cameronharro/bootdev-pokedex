import { createInterface } from "node:readline"
import {
  stdin,
  stdout,
} from "node:process"
import {
  exitCommand,
} from "./commands/exit.js"
import {
  helpCommand,
} from "./commands/help.js"

export function cleanInput(input: string): string[] {
  const cleaned = input
  .toLowerCase()
  .replaceAll(/ +/g," ")
  .trim()
  .split(" ")
  .filter(ele => ele !== "")
  return cleaned
}

export function startREPL () {
  const int = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > "
  })
  int.prompt()
  int.on("line", (input) => {
    const cleanedInput = cleanInput(input)
    if (cleanedInput.length === 0) {
      int.prompt()
      return
    }
    const word = cleanedInput[0];
    const commands = getCommands()
    try {
      const command = commands[word]
      if (command !== undefined) {
        command.callback(commands)
      } else {
        console.log("Unknown command")
      }
    } catch (error) {
    }
    int.prompt()
  })
}

export type CommandRegistry = Record<string, CLICommand>

export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: CommandRegistry) => void;
}

function getCommands(): CommandRegistry {
  return {
    exit: exitCommand,
    help: helpCommand,
  }
}
