import localStorage from "redux-persist/es/storage";
import apiCaller from "./axios.service";

const login = (login, password) => {
  return apiCaller("/login", {
    login,
    password,
  }).then((response) => {
    if (response.token) {
      localStorage.setItem("adminToken", response.token);
      // localStorage.setItem("user", { ...response.user });
    }
    return response;
  });
};

const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("userProfile");
  return true;
};

export default {
  login,
  logout,
};
