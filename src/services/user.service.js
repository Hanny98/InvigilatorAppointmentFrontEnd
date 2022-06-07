import apiCaller from "./axios.service";

const getUsers = (searchValue, skip, limit) => {
  return apiCaller("/user/getUsers", {
    searchValue,
    skip,
    limit,
  });
};

const registerUser = (newUser) => {
  return apiCaller("/admin/registerUser", {
    newUser,
  });
};

const updateUser = (currentUser) => {
  return apiCaller("/user/updateUser", {
    currentUser,
  });
};

const getLoginUser = (_id) => {
  return apiCaller("/user/getLoginUser", {
    _id,
  });
};

const getCurrentSchoolUser = (schoolId) => {
  return apiCaller("/user/getCurrentSchoolUser", {
    schoolId,
  });
};

export default {
  getUsers,
  registerUser,
  updateUser,
  getLoginUser,
  getCurrentSchoolUser,
};
