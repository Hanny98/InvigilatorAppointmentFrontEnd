import apiCaller from "./axios.service";

const getTeacher = (school, searchValue, skip, limit) => {
  return apiCaller("/teacher/getTeacher", {
    school,
    searchValue,
    skip,
    limit,
  });
};

const updateTeacher = (currentTeacher) => {
  return apiCaller("/teacher/updateTeacher", {
    currentTeacher,
  });
};
const completeTeacher = (newTeacher, _id) => {
  return apiCaller("/teacher/completeTeacher", {
    newTeacher,
    _id,
  });
};

const getOneTeacher = (_id) => {
  return apiCaller("/teacher/getOneTeacher", { _id });
};

// const updatePersonalInformation = (teacher, teacherUid) => {
//   return apiCaller("/teacher/updatePersonalInformation", {
//     teacher,
//     teacherUid,
//   });
// };

const getTeacherList = (school) => {
  return apiCaller("/teacher/getTeacherList", {
    school,
  });
};
const getTeacherInvigilatorExperience = (teacherName, skip, limit) => {
  return apiCaller("/teacher/getTeacherInvigilatorExperience", {
    teacherName,
    skip,
    limit,
  });
};

export default {
  getTeacher,
  updateTeacher,
  completeTeacher,
  getOneTeacher,
  // updatePersonalInformation,
  getTeacherList,
  getTeacherInvigilatorExperience,
};
