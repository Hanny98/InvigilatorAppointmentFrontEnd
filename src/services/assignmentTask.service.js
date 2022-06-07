import apiCaller from "./axios.service";

const getAssignmentTasks = (code, skip, limit) => {
  return apiCaller("/assignmentTask/getAssignmentTasks", {
    code,
    skip,
    limit,
  });
};
const getPrincipalAssignmentTasks = (code, skip, limit) => {
  return apiCaller("/assignmentTask/getPrincipalAssignmentTasks", {
    code,
    skip,
    limit,
  });
};
const getApprovedAssignmentTasks = (code, skip, limit) => {
  return apiCaller("/assignmentTask/getApprovedAssignmentTasks", {
    code,
    skip,
    limit,
  });
};

const getAssignmentTasksCount = (school) => {
  return apiCaller("/assignmentTask/getAssignmentTasksCount", {
    school,
  });
};

export default {
  getAssignmentTasks,
  getPrincipalAssignmentTasks,
  getApprovedAssignmentTasks,
  getAssignmentTasksCount,
};
