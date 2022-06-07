import apiCaller from "./axios.service";

const getSchool = (school) => {
  return apiCaller("/school/getSchool", {
    school,
  });
};

const getSchoolList = () => {
  return apiCaller("/school/getSchoolList", {});
};

const updateSchool = (school) => {
  return apiCaller("/school/updateSchool", {
    school,
  });
};

const registerUser = (newUser) => {
  return apiCaller("/school/registerUser", {
    newUser,
  });
};

export default {
  getSchool,
  updateSchool,
  getSchoolList,
  registerUser,
};
