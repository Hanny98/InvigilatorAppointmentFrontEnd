import { persistReducer } from "redux-persist";
// import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage"; //default local storage
import { UPDATE_USER_PROFILE, CLEAR_USER_PROFILE } from "../actions/types";

const initialState = {
  userProfile: null,
};

const userReducer = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: payload.userProfile,
      };

    case CLEAR_USER_PROFILE:
      return {
        ...state,
        userProfile: null,
      };

    default:
      return state;
  }
};

const persistConfig = {};

export default persistReducer({ key: "user", storage }, userReducer);
