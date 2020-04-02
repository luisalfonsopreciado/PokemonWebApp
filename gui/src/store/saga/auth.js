import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios/auth";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
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
    const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      put(actions.logout());
    } else {
      const userId = localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

export function* loginUserSaga(action){
    yield put(actions.authStart());
    const authData = {
      username: "",
      email: action.email,
      password: action.password
    };
    let url = "login/";
    try{
      const res = yield axios.post(url, authData)
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", res.data.key);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", action.email);
        // dispatch(getUserCredetials(authData))
        yield put(actions.authSuccess(res.data.key, action.email));
        yield put(actions.checkAuthTimeout(3600));
    }catch(error){
      yield put(actions.authFail(error.response.data));
    }
}
