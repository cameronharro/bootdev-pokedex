import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const exploreCommand: CLICommand = {
  name: "explore",
  description: "<location> - Explores a location and displays a list of the Pokemon that can be encountered there",
  callback: async (state: State, locationName: string) => {
    if (!locationName) {
      console.log("Explore error: No location argument provided")
      return
    }
    const {pokeAPI} = state;
    const locationArea = await pokeAPI.fetchLocation(locationName);
    console.log(`Exploring ${locationArea.name}...`)
    for (const encounter of locationArea.pokemon_encounters) {
      console.log(encounter.pokemon.name)
    }
  }
}
