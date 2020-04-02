import * as actions from "./actionTypes";
import axios from "../../axios/axios";
import axiosUsers from "../../axios/users";

export const fetchPokemon = (offset, limit) => {
  return dispatch => {
    axios
      .get("/?offset=" + offset + "&limit=" + limit)
      .then(response => {
        //maybe get the page number and add it to the url
        dispatch(fetchPokemonSuccess(response.data.results, offset, limit));
      })
      .catch(error => {
        dispatch(fetchPokemonFailed());
      });
  };
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

export const nextPokemonPage = (offset, limit) => {
  const newOffset = offset + 28;
  return fetchPokemon(newOffset, limit);
};

export const previousPokemonPage = (offset, limit) => {
  const newOffset = offset - 28;
  return fetchPokemon(newOffset, limit);
};

export const fetchPokemonById = id => {
  return dispatch => {
    axios
      .get(id)
      .then(res => {
        const types = res.data.types.map(type => type.type.name);
        const pokemon = {
          abilities: res.data.abilities,
          base_experience: res.data.base_experience,
          forms: res.data.forms,
          height: res.data.height / 10,
          id: res.data.id,
          weight: res.data.weight / 10,
          types: types,
          name: res.data.name,
          stats: res.data.stats,
          imageURL:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            res.data.id +
            ".png"
        };
        dispatch(fetchPokemonByIdSuccess(pokemon));
      })
      .catch(error => {
        dispatch(fetchPokemonByIdFailed(error));
      });
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

export const getUserFavoritePokemon = id => {
  return dispatch => {
    axiosUsers
      .get("user-favorite/" + id)
      .then(res => {
        const pokemonArray = res.data
        dispatch(getUserFavoritePokemonSuccess(pokemonArray));
      })
      .catch(error => {
        dispatch(getUserFavoritePokemonFailed(error));
      });
  };
};

export const getUserFavoritePokemonSuccess = (pokemonArray) => {
  return {
    type: actions.GET_USER_FAVORITE_POKEMON_SUCCESS,
    pokemon: pokemonArray
  };
};

export const getUserFavoritePokemonFailed = (error) => {
    return {
      type: actions.GET_USER_FAVORITE_POKEMON_FAILED,
      error: error,
    };
  };
