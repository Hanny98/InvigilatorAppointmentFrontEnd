import apiCaller from "./axios.service";

const getExamCenters = (school) => {
  return apiCaller("/examCenter/getExamCenters", {
    school,
  });
};

export default {
  getExamCenters,
};
