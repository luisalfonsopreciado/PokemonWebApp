import * as actions from "./actionTypes";

export const fetchPokemonList = (offset, limit) => {
  return {
    type : actions.FETCH_POKEMON_LIST,
    offset : offset,
    limit : limit,
  }
};
export const fetchPokemonFailed = () => {
  return {
    type: actions.FETCH_POKEMON_FAILED
  };
};
export const addPokemonToState = pokemon => {
  return {
    type: actions.ADD_POKEMON_TO_STATE,
    pokemon: pokemon
  };
};

export const fetchPokemonSuccess = (pokemonArray, lowerBound, upperBound) => {
  return {
    type: actions.FETCH_POKEMON_SUCCESS,
    pokemon: pokemonArray,
    lower: lowerBound,
    upper: upperBound
  };
};

export const fetchPokemonById = id => {
  return {
    type: actions.FETCH_POKEMON_BY_ID,
    id: id
  };
};
export const fetchPokemonByIdSuccess = pokemon => {
  return {
    type: actions.FETCH_POKEMON_BY_ID_SUCCESS,
    pokemon: pokemon
  };
};
export const fetchPokemonByIdFailed = err => {
  return {
    type: actions.FETCH_POKEMON_BY_ID_FAILED,
    error: err
  };
};

export const removePokemonFromState = () => {
  return {
    type: actions.REMOVE_POKEMON_FROM_STATE
  };
};

export const getUserFavoritePokemon = (userId, token) => {
  return{
    type: actions.FETCH_POKEMON_BY_USER_FAVORITE,
    userId: userId,
    token: token,
  }
};

export const getUserFavoritePokemonSuccess = pokemonArray => {
  return {
    type: actions.GET_USER_FAVORITE_POKEMON_SUCCESS,
    pokemon: pokemonArray
  };
};

export const getUserFavoritePokemonFailed = error => {
  return {
    type: actions.GET_USER_FAVORITE_POKEMON_FAILED,
    error: error
  };
};

export const nextPokemonPage = (offset, limit) => {
  const newOffset = offset + 20;
  return fetchPokemonList(newOffset, limit);
};

export const previousPokemonPage = (offset, limit) => {
  const newOffset = offset - 20;
  return fetchPokemonList(newOffset, limit);
};
