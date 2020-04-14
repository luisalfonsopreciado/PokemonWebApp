import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios/auth";
import { createHTTPHeaders } from "../../shared/utility";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logoutSuccess());
}

export function* logoutSaga(action) {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  if (!action.token) {
    yield put(actions.authFail({}));
  }
  const config = createHTTPHeaders(action.token);

  const url = "logout";
  try {
    yield axios.post(url, {}, config);
    yield put(actions.logoutSuccess());
  } catch (e) {
    console.log("Unable to Log Out");
  }
}

export function* authCheckState() {
  const token = localStorage.getItem("token");
  if (!token) {
    put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      put(actions.logout());
    } else {
      yield put(actions.getUserCredentials(token));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

export function* loginUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
  };
  let url = "login";
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", action.email);
    yield put(actions.getUserCredentials(res.data.token));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* signupUserSaga(action) {
  yield put(actions.authStart());
  const signupData = {
    email: action.email,
    password: action.password1,
    username: action.username,
  };
  let url = "create";
  try {
    const res = yield axios.post(url, signupData);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", action.email);
    yield put(actions.authSuccess(res.data.token, action.email));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    console.log(error);
    console.log(error.response.data[0]);
    yield put(actions.authFail(error.response.data[0]));
  }
}

export function* getUserCredentialsSaga(action) {
  if (!action.token) {
    yield put(actions.authFail({}));
  }
  const config = createHTTPHeaders(action.token);
  try {
    const res = yield axios.get("me", config);

    const userData = {
      pk: res.data._id,
      username: res.data.username,
      email: res.data.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      favoritePokemon: res.data.favoritePokemons,
    };

    yield put(actions.authSuccess(action.token, userData));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* updateUserSaga(action) {
  try {
    const config = createHTTPHeaders(action.token);
    const res = yield axios.patch("me",action.userData, config);
    const userData = {
      pk: res.data_id,
      username: res.data.username,
      email: res.data.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
    };
    yield put(actions.authSuccess(action.token, userData));
  } catch (e) {
    console.log(e);
  }
}
