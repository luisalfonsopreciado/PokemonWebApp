import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { fetchPokemonByIdSaga, getUserFavoritePokemonSaga, fetchPokemonListSaga} from './pokemon'

export function* watchPokemon() {
  yield takeEvery(actionTypes.FETCH_POKEMON_BY_ID, fetchPokemonByIdSaga);
  yield takeEvery(actionTypes.FETCH_POKEMON_BY_USER_FAVORITE, getUserFavoritePokemonSaga);
  yield takeEvery(actionTypes.FETCH_POKEMON_LIST, fetchPokemonListSaga)
}