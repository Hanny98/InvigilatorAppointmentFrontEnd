import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_FAIL } from "../actions/types";

const adminToken = localStorage.getItem("adminToken");

const initialState = adminToken
  ? { loggedIn: true, adminToken }
  : { loggedIn: false, adminToken: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        // profile: payload.profile,
        token: payload.token,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        // profile: null,
        token: null,
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        // profile: null,
        token: null,
      };

    case AUTH_FAIL:
      return {
        ...state,
        loggedIn: false,
        // profile: null,
        token: null,
      };

    default:
      return state;
  }
}
