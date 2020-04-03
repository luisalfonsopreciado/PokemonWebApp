import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios/auth";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logoutSuccess());
}

export function* logoutSaga() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  yield put(actions.logoutSuccess());
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
      // const userId = localStorage.getItem("userId");
      // yield put(actions.authSuccess(token, userId));
      yield put(actions.getUserCredentials(token))
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
    username: "",
    email: action.email,
    password: action.password,
  };
  let url = "login/";
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

    localStorage.setItem("token", res.data.key);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", action.email);
    yield put(actions.getUserCredentials(res.data.key));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* signupUserSaga(action) {
  yield put(actions.authStart());
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const username = action.username;
  const email = action.email;
  const password1 = action.password1;
  const password2 = action.password2;
  // Request Body
  const body = JSON.stringify({ username, email, password1, password2 });
  console.log(config);
  console.log(body);
  let url = "registration/";
  try {
    const res = yield axios.post(url, body, config);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem("token", res.data.key);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", action.email);
    yield put(actions.authSuccess(res.data.key, action.email));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* getUserCredentialsSaga(action) {
  console.log(action.token);
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      
    },
  };
  // If token, add to headers config
  if (action.token) {
    config.headers["Authorization"] = `Token ${action.token}`;
  }else{
    yield put(actions.authFail({}))
  }
  console.log(config)

  try {
    const res = yield axios.get("user/", config);

    const userData = {
        pk : res.data.pk,
        username: res.data.username,
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name   
    }
    console.log(userData);

    yield put(actions.authSuccess(action.token, userData));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}
