import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios/axios";
import axiosUsers from "../../axios/users";
import { createHTTPHeaders } from '../../shared/utility'

export function* fetchPokemonByIdSaga(action) {
  try {
    const res = yield axios.get(action.id);
    const types = yield res.data.types.map((type) => type.type.name);
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
        ".png",
    };
    yield put(actions.fetchPokemonByIdSuccess(pokemon));
  } catch (error) {
    yield put(actions.fetchPokemonByIdFailed(error));
  }
}

export function* getUserFavoritePokemonSaga(action) {

  const config = createHTTPHeaders(action.token)
 
  const url = "favorite";
  try {
    const res = yield axiosUsers.get(url, config);
    yield put(actions.getUserFavoritePokemonSuccess(res.data));
  } catch (error) {
    yield put(actions.getUserFavoritePokemonFailed(error));
  }
}

export function* fetchPokemonListSaga(action) {
  try {
    const response = yield axios.get(
      "/?offset=" + action.offset + "&limit=" + action.limit
    );
    yield put(
      actions.fetchPokemonSuccess(
        response.data.results,
        action.offset,
        action.limit
      )
    );
  } catch (error) {
    yield put(actions.fetchPokemonFailed());
  }
}

export function* addPokemonToApiSaga(action) {
  const config = createHTTPHeaders(action.token)
  const pokemon = {
    pokemonId: action.id,
    name: action.name,
  };

    try{
    const url = "favorite";
    yield axiosUsers.post(url, pokemon, config);
  } catch(error){
    console.log(error)
  }
}

export function* removePokemonFromApiSaga(action) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": action.token,
    }
  }
  const pokemon = {
    pokemonId: action.id,
    name: action.name,
  }; 
    try{
    const url = "favorite";
    yield axiosUsers.delete(url,config, pokemon);
  } catch(error){
    console.log(error)
  }
}

