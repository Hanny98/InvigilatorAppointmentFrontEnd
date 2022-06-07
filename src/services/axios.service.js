import axios from "axios";
import { store } from "../store";
import { logout } from "../actions/auth";
import config from "../config";

axios.defaults.baseURL = config.apiURL;

const handleError = (error) => {
  if (error.response) {
    // Request made and server responded
    if (error.response.status === 401) {
      if (error.response.data.msg === "User unauthorized token") {
        localStorage.removeItem("adminToken");
        store.dispatch(logout());
      } else {
        // store.dispatch(dispatchShowError(error.response.data.msg, ""));
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
        // window.location.href = '/dashboard'
      }
      // store.dispatch(dispatchShowError(error.response.data.msg, ''))
    }
    if (error.response.status === 500) {
      //   store.dispatch(
      //     //why use store.dispatch
      //     dispatchShowError(error.response.data.msg, error.response.data.eventID)
      //   );
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    throw error;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    throw error;
  }
};

export default function apiCaller(path, data = {}, method = "POST") {
  const methods = {
    DELETE: "delete",
    GET: "get",
    HEAD: "head",
    OPTIONS: "options",
    PATCH: "patch",
    POST: "post",
    PUT: "put",
  };

  //for all axios requests have that token as Authorization header
  //no need manually attach it to every request
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
    "adminToken"
  )}`;

  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  const func = axios[methods[method] || "post"];

  return func(path, data)
    .then((response) => response.data)
    .catch(handleError);
}
