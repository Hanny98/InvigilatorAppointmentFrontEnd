import { combineReducers } from "redux";
import auth from "./auth";
import userProfile from "./userProfile";
import store from "./store";

export default combineReducers({
  auth,
  userProfile,
  store,
});
