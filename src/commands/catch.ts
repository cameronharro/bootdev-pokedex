import {
  type State,
} from "../state.js"
import {
  type CLICommand,
} from "../commands.js"

export const catchCommand: CLICommand = {
  name: "catch",
  description: "<pokemonName> - Attempts to catch a pokemon",
  callback: async (state: State, pokemonName: string) => {
    if (!pokemonName) {
      console.log("Catch error: No pokemonName argument provided")
      return
    }
    const {pokeAPI} = state;
    const pokemon = await pokeAPI.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);
    const percentToCatch = 36 / pokemon.base_experience;
    if (Math.random() < percentToCatch) {
      console.log(`${pokemon.name} was caught!`)
      state.pokedex.set(pokemon.name, pokemon)
      return
    }
    console.log(`${pokemon.name} escaped!`)
  }
}
