import {
  initState,
} from "./state.js"

export function cleanInput(input: string): string[] {
  const cleaned = input
  .toLowerCase()
  .replaceAll(/ +/g," ")
  .trim()
  .split(" ")
  .filter(ele => ele !== "")
  return cleaned
}

export async function startREPL () {
  const state = initState()
  const {rl, commands} = state;
  rl.prompt()
  rl.on("line", async (input) => {
    const cleanedInput = cleanInput(input)
    if (cleanedInput.length === 0) {
      rl.prompt()
      return
    }
    const word = cleanedInput[0];
    try {
      const command = commands[word]
      if (command !== undefined) {
        await command.callback(state, ...cleanedInput.slice(1))
      } else {
        console.log("Unknown command")
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
      }
    }
    rl.prompt()
  })
}
