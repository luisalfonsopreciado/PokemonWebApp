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

export const checkAuthTimeout = expirationTime => {
 return {
   type : actionTypes.CHECK_AUTH_TIMEOUT,
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
  return dispatch => {
    dispatch(authStart());
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const authData = {
      "username": username,
      "email": email,
      "password1": password1,
      "password2": password2
    };
    console.log(authData)
    let url = "registration/";
    axios
      .post(url, authData, config)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", res.data.key);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", email);
        dispatch(authSuccess(res.data.key, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

// export const signupSuccess= () => {
//   return {
//     action: actionTypes.AUTH_SIGNUP_SUCCESS
//   }
// }

// export const signupFailed= (error) => {
//   return {
//     action: actionTypes.AUTH_SIGNUP_FAILED,
//     error: error,
//   }
// }

export const login = (email, password) => {
  return{
    type: actionTypes.AUTH_LOGIN,
    email: email,
    password: password,

  }
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const getUserCredetials = (authData) => {
  return dispatch => {
    let url = "user/";
    axios.post(url,  authData).then(res=> {
      const userData = {
        pk : res.data.pk,
        username: res.data.username,
        email: res.data.email,
    }
    dispatch(setUserInformation(userData))
    })
    .catch(err => {
      dispatch(authFail(err))
    })
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