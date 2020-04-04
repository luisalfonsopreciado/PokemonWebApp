import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userData: userData,
  };
};

export const checkAuthTimeout = expirationTime => {
 return {
   type : actionTypes.AUTH_CHECK_TIMEOUT,
   expirationTime: expirationTime,

 }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const logoutSuccess = data => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    data: data
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_USER_LOGOUT
  }
};

export const signup = (username, email, password1, password2) => {
  return {
    type: actionTypes.AUTH_USER_SIGNUP,
    username: username,
    email: email,
    password1: password1,
    password2: password2,
  }
};

export const login = (email, password) => {
  return{
    type: actionTypes.AUTH_LOGIN,
    email: email,
    password: password,

  }
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path
  };
};

export const getUserCredentials = (token) => {
  return {
    type: actionTypes.AUTH_GET_USER_CREDENTIALS,
    token: token,
  }
}

export const setUserInformation = userData => {
  return {
    type: actionTypes.SET_USER_INFORMATION,
    userData: userData,
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}