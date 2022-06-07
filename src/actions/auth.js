import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  UPDATE_USER_PROFILE,
  CLEAR_USER_PROFILE,
  CLEAR_MERCHANT_PROFILE,
} from "./types";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export const login = (login, password) => (dispatch) => {
  return AuthService.login(login, password).then(
    (loginData) => {
      if (
        loginData.token === null ||
        loginData.token === "" ||
        loginData.token === undefined
      ) {
        dispatch({
          type: LOGIN_FAIL,
        });
        return Promise.reject(false);
      }
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: {
          userProfile: loginData.user, //res.locals.user
        },
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          //store token and set logged in to true
          token: loginData.token,
        },
      });
      return Promise.resolve();
    },
    (error) => {
      console.log("in first error");
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString()

      // dispatch({
      //   type: LOGIN_FAIL,
      // })
      // dispatch({
      //   type: CLEAR_USER_PROFILE,
      // })
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // })

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_USER_PROFILE,
  });

  return true;
};

export const updateUserStatus = (_id) => (dispatch) => {
  return UserService.getLoginUser(_id).then(
    (loginData) => {
      console.log(loginData);
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: {
          userProfile: loginData.user, //res.locals.user
        },
      });
      return Promise.resolve(loginData);
    },
    (error) => {
      console.log(error);
      return Promise.reject();
    }
  );
};
