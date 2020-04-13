import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios/auth";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logoutSuccess());
}

export function* logoutSaga(action) {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // If token, add to headers config
  if (action.token) {
    config.headers["Authorization"] = `Bearer ${action.token}`;
  } else {
    yield put(actions.authFail({}));
  }
  const url = "logout";
  try {
    yield axios.post(url,{}, config);
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
      // const userId = localStorage.getItem("userId");
      // yield put(actions.authSuccess(token, userId));
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
  let url = "registration/";
  try {
    const res = yield axios.post(url, body, config);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", action.email);
    yield put(actions.authSuccess(res.data.token, action.email));
    yield put(actions.checkAuthTimeout(3600));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* getUserCredentialsSaga(action) {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // If token, add to headers config
  if (action.token) {
    config.headers["Authorization"] = `Bearer ${action.token}`;
  } else {
    yield put(actions.authFail({}));
  }

  try {
    const res = yield axios.get("me", config);

    const userData = {
      pk: res.data._id,
      username: res.data.username,
      email: res.data.email,
      first_name: "",
      last_name: "",
    };

    yield put(actions.authSuccess(action.token, userData));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}
