import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  pokemons: [],
  offset: 0,
  limit: 20,
  pokemon: {},
  loading: true,
  displayModal: false,
  favoritePokemon: [],
};
const fetchPokemon = (state, action) => {
  return {
    pokemons: action.pokemon,
    offset: action.lower,
    upperBound: action.upper
  };
};
const updatePokemonById = (state, action) => {
  return updateObject(state, { pokemon: action.pokemon, loading: false });
};
const addPokemonToGlobalState = (state, action) => {
  return updateObject(state, { pokemon: action.pokemon, displayModal: true });
};
const removePokemonFromState = (state, action) => {
  return updateObject(state, { displayModal: false });
};
const  addUserFavoritePokemonToGlobalSTate = (state, action) => {
  return updateObject(state, {favoritePokemon: action.pokemon, loading: false} )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POKEMON_SUCCESS:
      return fetchPokemon(state, action);
    case actionTypes.FETCH_POKEMON_FAILED:
      return {};
    case actionTypes.FETCH_POKEMON_BY_ID_SUCCESS:
      return updatePokemonById(state, action);
    case actionTypes.ADD_POKEMON_TO_STATE:
      return addPokemonToGlobalState(state, action);
    case actionTypes.REMOVE_POKEMON_FROM_STATE:
        return removePokemonFromState(state, action);
    case actionTypes.GET_USER_FAVORITE_POKEMON_SUCCESS:
        return addUserFavoritePokemonToGlobalSTate(state, action);
    case actionTypes.GET_USER_FAVORITE_POKEMON_FAILED:
        return {};
    default:
      return state;
  }
};
export default reducer;
