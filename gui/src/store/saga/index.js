import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  fetchPokemonByIdSaga,
  getUserFavoritePokemonSaga,
  fetchPokemonListSaga,
  addPokemonToApiSaga,
  removePokemonFromApiSaga,
} from "./pokemon";
import {
  checkAuthTimeoutSaga,
  logoutSaga,
  loginUserSaga,
  authCheckState,
  signupUserSaga,
  getUserCredentialsSaga,
} from "./auth";

export function* watchPokemon() {
  yield takeEvery(actionTypes.FETCH_POKEMON_BY_ID, fetchPokemonByIdSaga);
  yield takeEvery(
    actionTypes.FETCH_POKEMON_BY_USER_FAVORITE,
    getUserFavoritePokemonSaga
  );
  yield takeEvery(actionTypes.FETCH_POKEMON_LIST, fetchPokemonListSaga);
  yield takeEvery(
    actionTypes.ADD_POKEMON_USER_FAVORITE,
    addPokemonToApiSaga
  );
  yield takeEvery(
    actionTypes.REMOVE_POKEMON_USER_FAVORITE,
    removePokemonFromApiSaga
  );
}
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGIN, loginUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
  yield takeEvery(actionTypes.AUTH_USER_SIGNUP, signupUserSaga);
  yield takeEvery(
    actionTypes.AUTH_GET_USER_CREDENTIALS,
    getUserCredentialsSaga
  );
}
