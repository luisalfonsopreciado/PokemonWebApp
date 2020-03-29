import axios from "../../axios/auth";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logoutSuccess = (data) => {
    return {
        type: actionTypes.AUTH_LOGOUT,
        data: data,
    }
}

export const logout = () => {
    return dispatch =>{
        localStorage.removeItem('token')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('userId')
        const url = 'logout/'
        axios
          .post(url)
          .then(res => {
              console.log(res.data)
            dispatch(logoutSuccess(res.data));
          })
          .catch(err => {
            dispatch(authFail(err.response.data));
          });
    } 
}

export const signup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    };
    let url = "registration/";
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", res.data.key);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", email);
        dispatch(authSuccess(res.data.key, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const login = ( email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username: "",
      email: email,
      password: password,
    };
    let url = "login/";
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", res.data.key);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", email);
        dispatch(authSuccess(res.data.key, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
