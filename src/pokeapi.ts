import {
  Cache,
} from "./pokecache.js"

export class PokeAPI {
  readonly #baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(10000)

  constructor() {}

  async #fetchRequest(url: string) {
    const entry = this.#cache.get(url)
    if (entry) {
      console.log("fetching from cache!")
      return entry
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (!response.ok) {
      throw new Error(`Error ${response.status} at ${url}: ${response.statusText}`)
    }
    const data = response.json()
    this.#cache.add(url, data)
    return data
  }

  async fetchLocations(queryParams: string = ""): Promise<BatchLocationAreas> {
    return await this.#fetchRequest(`${this.#baseURL}/location-area/?${queryParams}`)
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    return await this.#fetchRequest(`${this.#baseURL}/location-area/${locationName}`)
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    return await this.#fetchRequest(`${this.#baseURL}/pokemon/${pokemonName}`)
  }
}


type BatchLocationAreas = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
}

type Name = {
  name: string;
  language: NamedAPIResource;
}

type EncounterVersionDetails = {
  rate: number;
  version: NamedAPIResource;
}

type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

type VersionEncounterDetail = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  past_abilities: PokemonAbilityPast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}

type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
}

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource
}


type PokemonType = {
  slot: number;
  type: NamedAPIResource
}

type PokemonTypePast = {
  generation: NamedAPIResource;
  types: PokemonType[];
}

type PokemonAbilityPast = {
  generation: NamedAPIResource;
  abilities: PokemonAbility[];
}

type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

type PokemonHeldItemVersion = {
  version: NamedAPIResource
  rarity: number;
}

type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[]
}

type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
  order: number;
}

type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

type PokemonCries = {
  latest: string;
  legacy: string;
}

export type NamedAPIResource = {
  name: string;
  url: string;
}

//type Stat = {
//  id: number;
//  name: string;
//  game_index: number;
//  is_battle_only: boolean;
//  affecting_moves: MoveStatAffectSets;
//  affecting_natures: NatureStatAffectSets;
//  characteristics: APIResource<Characteristic>[];
//  move_damage_class: NamedAPIResource;
//  names: Name[];
//}

//type MoveStatAffectSets = {
//  increase: MoveStatAffect[];
//  decrease: MoveStatAffect[];
//}

//type MoveStatAffect = {
//  change: number;
//  move: NamedAPIResource
//}

//type NatureStatAffectSets = {
//  increase: NamedAPIResource;
//  decrease: NamedAPIResource;
//}

//export type Region = {
//  id: number;
//  locations: NamedAPIResource[];
//  name: string;
//  names: Name[];
//  main_generation: NamedAPIResource;
//  pokedexes: NamedAPIResource[];
//  version_groups: NamedAPIResource[];
//}

// type EncounterMethod = {
//   id: number;
//   name: string;
//   order: number;
//   names: Name[];
// }

//type EncounterConditionValue = {
//  id: number;
//  name: string;
//  condition: NamedAPIResource;
//  names: Name[];
//}


//type EncounterCondition = {
//  id: number;
//  name: string;
//  names: Name[];
//  values: NamedAPIResource[];
//}


//type Language = {
//  id: number;
//  name: string;
//  official: boolean;
//  iso639: string;
//  iso3166: string;
//  names: Name[];
//}

//type Generation = {
//  id: number;
//  name: string;
//  abilities: NamedAPIResource[];
//  names: Name[];
//  main_region: NamedAPIResource;
//  moves: NamedAPIResource[];
//  pokemon_species: NamedAPIResource[];
//  types: NamedAPIResource[];
//  version_groups: NamedAPIResource[]
//}

//type PokemonSpecies = {
//  id: number;
//  name: string;
//  order: number;
//  gender_rate: number;
//  capture_rate: number;
//  base_happiness: number;
//  is_baby: boolean;
//  is_legendary: boolean;
//  is_mythical: boolean;
//  hatch_encounter: number;
//  has_gender_differences: boolean;
//  forms_switchable: boolean;
//  growth_rate: NamedAPIResource;
//  pokedex_numbers: PokemonSpeciesDexEntry;
//  egg_groups: NamedAPIResource[];
//  color: NamedAPIResource;
//  shape: NamedAPIResource
//  evolves_from_species: NamedAPIResource
//}

//type Ability = {
//  id: number;
//  name: string;
//  is_main_series: boolean;
//  generation: NamedAPIResource;
//  names: Name[];
//  effect_entriies: VerboseEffect[];
//  effect_changes: AbilityEffectChange[];
//  flavor_text_entries: AbilityFlavorText[];
//  pokemon: AbilityPokemon[];
//}

//type AbilityEffectChange = {
//  effect_entries: Effect[];
//  version_group: NamedAPIResource
//}

//type AbilityFlavorText = {
//  flavor_text: string;
//  language: NamedAPIResource;
//  version_group: NamedAPIResource
//}

//type AbilityPokemon = {
//  is_hidden: boolean;
//  slot: number;
//  pokemon: NamedAPIResource
//}

//type Move = {
//  id: number;
//  name: string;
//  accuracy: number;
//  effect_chance: number;
//  pp: number;
//  priority: number;
//  power: number;
//  contest_combos: ContestComboSets;
//  contest_type: NamedAPIResource;
//  contest_effect: APIResource<ContestEffect>;
//  damage_class: NamedAPIResource;
//  effect_entries: VerboseEffect[];
//  effect_changes: AbilityEffectChange[];
//  learned_by_pokemon: NamedAPIResource[];
//  flavor_text_entries: MoveFlavorText[];
//  generation: NamedAPIResource;
//  machines: MachineVersionDetail[];
//  meta: MoveMetaData;
//  names: Name[];
//  past_values: PastMoveStatValues[];
//  stat_changes: MoveStatChange[];
//  super_contest_effect: APIResource<SuperContestEffect>;
//  target: NamedAPIResource;
//  type: NamedAPIResource
//}

//type ContestComboSets = {
//  normal: ContestComboDetail;
//  super: ContestComboDetail;
//}

//type ContestComboDetail = {
//  use_before: NamedAPIResource;
//  use_after: NamedAPIResource;
//}

//type MoveFlavorText = {
//  flavor_text: string;
//  language: NamedAPIResource;
//  version_group: NamedAPIResource;
//}

//type MoveMetaData = {
//  ailment: NamedAPIResource;
//  category: NamedAPIResource;
//  min_hits: number;
//  max_hits: number;
//  min_turns: number;
//  max_turns: number;
//  drain: number;
//  healing: number;
//  crit_rate: number;
//  ailment_chance: number;
//  flinch_chance: number;
//  stat_chance: number;
//}

//type Pokedex = {
//  id: number;
//  name: string;
//  is_main_series: boolean;
//  descriptions: Description[];
//  names: Name[];
//  pokemon_entries: PokemonEntry;
//  region: NamedAPIResource;
//  version_groups: NamedAPIResource[];
//}

//type VersionGroup = {
//  id: number;
//  name: string;
//  order: number;
//  generation: NamedAPIResource;
//  move_learn_methods: NamedAPIResource[];
//  pokedexes: NamedAPIResource[];
//  regions: NamedAPIResource[];
//  versions: NamedAPIResource[];
//}

//type Version = {
//  id: number;
//  name: string;
//  names: Name[];
//  version_group: NamedAPIResource;
//}
