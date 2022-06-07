import apiCaller from "./axios.service";

const getExamCenterData = (assignmentTaskId, selectedExamCenter) => {
  return apiCaller("/examCenterData/getExamCenterData", {
    assignmentTaskId,
    selectedExamCenter,
  });
};
const getExamCenterDataForReport = (assignmentTaskId, selectedExamCenter) => {
  return apiCaller("/examCenterData/getExamCenterDataForReport", {
    assignmentTaskId,
    selectedExamCenter,
  });
};

const submitExamCenterData = (
  newExamCenterData,
  selectedTeacherList,
  selectedAssignmentTask,
  selectedExamCenter
) => {
  return apiCaller("/examCenterData/submitExamCenterData", {
    newExamCenterData,
    selectedTeacherList,
    selectedAssignmentTask,
    selectedExamCenter,
  });
};
const updateExamCenterData = (
  currentExamCenterData,
  currentSelectedTeacherList,
  selectedAssignmentTask,
  selectedExamCenter
) => {
  return apiCaller("/examCenterData/updateExamCenterData", {
    currentExamCenterData,
    currentSelectedTeacherList,
    selectedAssignmentTask,
    selectedExamCenter,
  });
};

const reviewExamCenterData = (
  decision,
  selectedAssignmentTask,
  selectedExamCenter
) => {
  return apiCaller("/examCenterData/reviewExamCenterData", {
    decision,
    selectedAssignmentTask,
    selectedExamCenter,
  });
};

export default {
  submitExamCenterData,
  getExamCenterData,
  updateExamCenterData,
  reviewExamCenterData,
  getExamCenterDataForReport,
};
