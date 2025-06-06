import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const mapCommand: CLICommand = {
  name: "map",
  description: "Gets and displays the next 20 locations in the map",
  callback: async (state: State) => {
    const {nextLocationURL, pokeAPI} = state;
    const locationAreas = await pokeAPI.fetchLocations(nextLocationURL);
    for (const area of locationAreas.results) {
      console.log(area.name)
    }
    state.nextLocationURL = parseQueryParams(locationAreas.next);
    state.prevLocationURL = parseQueryParams(locationAreas.previous);
  }
}

export const mapBackCommand: CLICommand = {
  name: "mapb",
  description: "Gets and displays the next 20 locations in the map",
  callback: async (state: State) => {
    const {prevLocationURL, pokeAPI} = state;
    const locationAreas = await pokeAPI.fetchLocations(prevLocationURL);
    for (const area of locationAreas.results) {
      console.log(area.name)
    }
    state.nextLocationURL = parseQueryParams(locationAreas.next);
    state.prevLocationURL = parseQueryParams(locationAreas.previous);
  }
}

function parseQueryParams (url: string | null) {
  if (url === null) {
    return ""
  }
  const split = url.split("?")
  return split[split.length - 1]
}
