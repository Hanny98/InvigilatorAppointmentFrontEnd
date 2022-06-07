/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Modal,
  Container,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { error, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

// core components
import Header from "components/Headers/Header.js";
import ExamCenterService from "../../services/examCenter.service";
import AssignmentTaskService from "../../services/assignmentTask.service";
import TeacherService from "services/teacher.service";
import ExamCenterDataService from "../../services/examCenterData.service";
import { showLoading, hideLoading } from "actions/store";
import MuiTable from "../widgets/muiTable.js";

const AssignmentTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userProfile } = useSelector((state) => state.userProfile);

  const initialState = {
    roomAvailable: "",
    hallAvailable: "",
    roomCandidateNumber: "",
    specialRoomAvailable: "",
    specialRoomCandidateNumber: "",
    hallCandidateNumber: "",

    numberOfChiefInvigilatorRequired: 0,
    numberOfViceChiefInvigilatorRequired: 0,
    numberOfEnvironmentalSupervisorRequired: 0,
    numberOfRoomKeeperRequired: 0,
    numberOfInvigilatorRequired: 0,
    numberOfReservedInvigilatorRequired: 0,

    listChiefInvigilatorRequired: [],
    listViceChiefInvigilatorRequired: [],
    listEnvironmentalSupervisorRequired: [],
    listRoomKeeperRequired: [],
    listInvigilatorRequired: [],
    listReservedInvigilatorRequired: [],
  };

  const calculateState = {
    numberOfChiefInvigilatorRequired: 0,
    numberOfViceChiefInvigilatorRequired: 0,
    numberOfEnvironmentalSupervisorRequired: 0,
    numberOfRoomKeeperRequired: 0,
    numberOfInvigilatorRequired: 0,
    numberOfReservedInvigilatorRequired: 0,
  };

  const positionOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "Chief Invigilator",
      label: "Chief Invigilator",
    },
    {
      value: "Vice Chief Invigilator",
      label: "Vice Chief Invigilator",
    },
    {
      value: "Environmental Supervisor",
      label: "Environmental Supervisor",
    },
    {
      value: "Room Keeper",
      label: "Room Keeper",
    },
    {
      value: "Invigilator",
      label: "Invigilator",
    },
    {
      value: "Reserved Invigilator",
      label: "Reserved Invigilator",
    },
  ];

  const [examCenterList, setExamCenterList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [filteredAssignmentTask, setFilteredAssignmentTask] = useState();
  const [selectedExamCenter, setSelectedExamCenter] = useState();

  const [selectedAssignmentTask, setSelectedAssignmentTask] = useState("");

  const [newExamCenterData, setNewExamCenterData] = useState(initialState);
  const [currentExamCenterData, setCurrentExamCenterData] =
    useState(initialState);
  const [originalEditExamCenter, setOriginalEditExamCenter] =
    useState(initialState);

  const [invigilatorCalculate, setInvigilatorCalculate] =
    useState(calculateState);
  const [editInvigilatorCalculate, setEditInvigilatorCalculate] =
    useState(calculateState);
  const [calculateStatus, setcalculateStatus] = useState(false);
  const [selectedTeacherList, setSelectedTeacherList] = useState([]);
  const [currentSelectedTeacherList, setCurrentSelectedTeacherList] = useState(
    []
  );
  const [
    originalCurrentSelectedTeacherList,
    setOriginalCurrentSelectedTeacherList,
  ] = useState([]);

  const [selectedTeacherExperience, setSelectedTeacherExperience] = useState(
    []
  );
  const [experienceCount, setExperienceCount] = useState(0);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  //modal

  const [completeModal, setCompleteModal] = useState(false);
  const [selectModal, setSelectModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editSelectModal, setEditSelectModal] = useState(false);

  //muitable function
  const [changeTablePageFunction, setChangeTablePageFunction] = useState(null);
  const [changeExpTablePageFunction, setExpChangeTablePageFunction] =
    useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(false);

  //functions
  const handleExamCenter = (e) => {
    const { value } = e.target;
    setSelectedExamCenter(value);
  };

  const handleSearch = async () => {
    // setSelectedExamCenter(preselectedExamCenter);
    dispatch(showLoading());
    changeTablePageFunction(0);
    await searchAssignmentTask(0, 100);
    dispatch(hideLoading());
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewExamCenterData({
      ...newExamCenterData,
      [name]: value,
    });
  };

  const handleEditNewChange = (e) => {
    const { name, value } = e.target;
    setCurrentExamCenterData({
      ...currentExamCenterData,
      [name]: value,
    });
  };

  const searchInvigilatorExperience = (skip, limit) => {
    return fetchExperiences(skip, limit);
  };

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setSelectedTeacher(value);
    if (value === "") {
      setSelectedTeacherExperience([]);
      return;
    }
    // setSelectedTeacher(value);
    changeExpTablePageFunction(0);
    const skip = 0;
    const limit = 5;
    dispatch(showLoading());
    const experiencePromise = new Promise(function (resolve, reject) {
      const result = TeacherService.getTeacherInvigilatorExperience(
        value,
        skip,
        limit
      );
      resolve(result);
    });

    experiencePromise //need to add if(result.status)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          const arr = result.experienceList;
          const filteredArr = [];
          arr.forEach((element) => {
            filteredArr.push({
              examTitle: element.assignmentTask.title,
              invigilationRole: element.role,
              schoolName: element.assignedTo.school.schoolName,
            });
          });
          setSelectedTeacherExperience(filteredArr);
          // if (arr !== null && arr !== undefined) {
          //   setSelectedTeacherList(arr);
          // }
          setExperienceCount(result.experienceCount);
          return;
        }
        error({
          title: "Error",
          text: "Could not get the invigilator experience of the selected teacher",
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
    //go and get the teahcerInvigilator Experience
  };

  const handlePositionChange = (e) => {
    const { value } = e.target;
    setSelectedPosition(value);
  };

  const handleSelectTeacher = () => {
    if (selectedTeacher === "" || selectedPosition === "") {
      setSelectedTeacher("");
      setSelectedPosition("");
      return;
    }

    if (selectedTeacherList.some((st) => st.teacherName === selectedTeacher)) {
      error({
        title: "Error",
        text: "Teacher already selected",
      });
      return;
    }

    setSelectedTeacherList([
      ...selectedTeacherList,
      {
        teacherName: selectedTeacher,
        position: selectedPosition,
      },
    ]);

    setSelectedTeacher("");
    setSelectedPosition("");
    setSelectedTeacherExperience([]);
  };

  const handleEditSelectTeacher = () => {
    if (selectedTeacher === "" || selectedPosition === "") {
      setSelectedTeacher("");
      setSelectedPosition("");
      return;
    }

    if (
      currentSelectedTeacherList.some(
        (st) => st.teacherName === selectedTeacher
      )
    ) {
      error({
        title: "Error",
        text: "Teacher already selected",
      });
      return;
    }

    setCurrentSelectedTeacherList([
      ...currentSelectedTeacherList,
      {
        teacherName: selectedTeacher,
        position: selectedPosition,
      },
    ]);
    setSelectedTeacher("");
    setSelectedPosition("");
    setSelectedTeacherExperience([]);
  };

  const removeTeacher = (teacher) => {
    //check if selectedList include this teacher

    const newArray = selectedTeacherList.filter((selectedTeacher) => {
      return selectedTeacher.teacherName !== teacher.teacherName;
    });
    setSelectedTeacherList(newArray);
    // if (
    //   selectedTeacherList.filter(
    //     (selectedTeacher) => selectedTeacher.teacherName === teacher.teacherName
    //   ) &&
    //   selectedTeacherList.filter(
    //     (selectedTeacher) => selectedTeacher.position === teacher.position
    //   )
    // ) {

    // }
  };

  const removeEditTeacher = (teacher) => {
    const newArray = currentSelectedTeacherList.filter((selectedTeacher) => {
      return selectedTeacher.teacherName !== teacher.teacherName;
    });
    setCurrentSelectedTeacherList(newArray);
    // if (
    //   currentSelectedTeacherList.filter(
    //     (selectedTeacher) => selectedTeacher.teacherName === teacher.teacherName
    //   ) &&
    //   currentSelectedTeacherList.filter(
    //     (selectedTeacher) => selectedTeacher.position === teacher.position
    //   )
    // ) {

    // }
  };

  const showCompleteModal = (value) => {
    if (completeModal) {
      setNewExamCenterData(initialState);
      setcalculateStatus(false);
      setSelectedTeacher("");
      setSelectedTeacherList([]);
      setSelectedTeacherExperience([]);
      setSelectedPosition("");
    }
    // setNewExamCenterData(null);
    setSelectedAssignmentTask(value);

    setCompleteModal(!completeModal);
  };

  const showEditModal = (value) => {
    //if data already exist
    if (editModal) {
      setCurrentExamCenterData({
        ...originalEditExamCenter,
      });
      // setcalculateStatus(false);
      setSelectedTeacher("");
      setCurrentSelectedTeacherList([...originalCurrentSelectedTeacherList]);
      setSelectedTeacherExperience([]);
      setSelectedPosition("");
    }
    setSelectedAssignmentTask(value);
    //value is the asssignment task _id
    dispatch(showLoading());
    const examCenterDataPromise = new Promise(function (resolve, reject) {
      const result = ExamCenterDataService.getExamCenterData(
        value,
        selectedExamCenter
      );
      resolve(result);
    });

    examCenterDataPromise
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setOriginalEditExamCenter(result.examCenterData); // a copy of it
          setCurrentExamCenterData(result.examCenterData);
          setCurrentSelectedTeacherList(result.examCenterData.teacherList);
          setOriginalCurrentSelectedTeacherList(
            result.examCenterData.teacherList
          );
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });

    setEditModal(!editModal);
  };

  const showSelectModal = (value) => {
    if (selectModal) {
      setNewExamCenterData(initialState);
      setcalculateStatus(false);
      setSelectedTeacher("");
      setSelectedTeacherList([]);
      setSelectedTeacherExperience([]);
      setSelectedPosition("");
    }
    setSelectModal(!selectModal);
  };

  const showEditSelectModal = (value) => {
    if (editSelectModal) {
      setCurrentExamCenterData({
        ...originalEditExamCenter,
      });
      // setcalculateStatus(false);
      setSelectedTeacher("");
      setCurrentSelectedTeacherList([...originalCurrentSelectedTeacherList]);
      setSelectedTeacherExperience([]);
      setSelectedPosition("");
    }
    setEditSelectModal(!editSelectModal);
  };

  const handleNext = () => {
    const {
      roomAvailable,
      specialRoomAvailable,
      hallAvailable,
      roomCandidateNumber,
      specialRoomCandidateNumber,
      hallCandidateNumber,
    } = newExamCenterData;
    if (
      roomAvailable === "" ||
      roomAvailable === 0 ||
      specialRoomAvailable === "" ||
      specialRoomAvailable === 0 ||
      hallAvailable === "" ||
      hallAvailable === 0 ||
      roomCandidateNumber === "" ||
      roomCandidateNumber === 0 ||
      specialRoomCandidateNumber === "" ||
      specialRoomCandidateNumber === 0 ||
      hallCandidateNumber === "" ||
      hallCandidateNumber === 0
    ) {
      error({
        title: "Error",
        text: "Please complete all the fields before proceeding",
      });
      return;
    }
    calculateInvigilator();
    setcalculateStatus(true);
    setCompleteModal(false);
    setSelectModal(true);
  };

  const handleBack = () => {
    // setInvigilatorCalculate(calculateState);
    setNewExamCenterData(initialState);
    setSelectedTeacherList([]);
    setcalculateStatus(false);
    setSelectedTeacher("");
    setSelectedTeacherExperience([]);
    setSelectedPosition("");

    setcalculateStatus(false);
    setCompleteModal(true);
    setSelectModal(false);
  };

  const handleEditBack = () => {
    setCurrentExamCenterData(originalEditExamCenter);
    setCurrentSelectedTeacherList(originalCurrentSelectedTeacherList);
    // setcalculateStatus(false);
    setSelectedTeacher("");
    setSelectedTeacherExperience([]);
    setSelectedPosition("");

    // setcalculateStatus(false);
    setEditModal(true);
    setEditSelectModal(false);
  };

  const handleEditNext = () => {
    const {
      roomAvailable,
      specialRoomAvailable,
      hallAvailable,
      roomCandidateNumber,
      specialRoomCandidateNumber,
      hallCandidateNumber,
    } = currentExamCenterData;
    if (
      roomAvailable === "" ||
      roomAvailable === 0 ||
      specialRoomAvailable === "" ||
      specialRoomAvailable === 0 ||
      hallAvailable === "" ||
      hallAvailable === 0 ||
      roomCandidateNumber === "" ||
      roomCandidateNumber === 0 ||
      specialRoomCandidateNumber === "" ||
      specialRoomCandidateNumber === 0 ||
      hallCandidateNumber === "" ||
      hallCandidateNumber === 0
    ) {
      error({
        title: "Error",
        text: "Please complete all the fields before proceeding",
      });
      return;
    }
    calcualateEditInvigilator();
    setEditModal(false);
    setEditSelectModal(true);
  };

  const calcualateEditInvigilator = () => {
    let chief = 1;
    let viceChief = 1;
    let envSup = 1;
    let roomKeep = 1;
    let invi = 0;
    let reservedInvi = 2;

    //hall
    if (currentExamCenterData.hallAvailable !== 0) {
      let count = currentExamCenterData.hallAvailable;
      invi = invi + count * 2;
    }

    //room
    if (currentExamCenterData.roomAvailable !== 0) {
      let count = currentExamCenterData.roomAvailable / 2;
      invi = invi + count * 2;
    }

    if (currentExamCenterData.specialRoomAvailable !== 0) {
      let count = currentExamCenterData.specialRoomAvailable;
      invi = invi + count * 1;
    }

    if (
      currentExamCenterData.hallAvailable !== 0 &&
      currentExamCenterData.roomAvailable !== 0 &&
      currentExamCenterData.specialRoomAvailable !== 0
    ) {
      envSup += 1;
    }

    if (currentExamCenterData.roomAvailable !== 0) {
      let count = currentExamCenterData.roomAvailable / 10;

      if (count >= 1) {
        //add one roomKeep for every 10 rooms
        roomKeep += count;
      }
    }

    invi -= 1; //deduct chief invi

    setCurrentExamCenterData({
      ...currentExamCenterData,
      numberOfChiefInvigilatorRequired: chief,
      numberOfViceChiefInvigilatorRequired: viceChief,
      numberOfEnvironmentalSupervisorRequired: envSup,
      numberOfRoomKeeperRequired: roomKeep,
      numberOfInvigilatorRequired: invi,
      numberOfReservedInvigilatorRequired: reservedInvi,
    });
    //set the state of the dispalyign numbers
    setEditInvigilatorCalculate({
      numberOfChiefInvigilatorRequired: chief,
      numberOfViceChiefInvigilatorRequired: viceChief,
      numberOfEnvironmentalSupervisorRequired: envSup,
      numberOfRoomKeeperRequired: roomKeep,
      numberOfInvigilatorRequired: invi,
      numberOfReservedInvigilatorRequired: reservedInvi,
    });
  };

  const calculateInvigilator = () => {
    let chief = 1;
    let viceChief = 1;
    let envSup = 1;
    let roomKeep = 1;
    let invi = 0;
    let reservedInvi = 2;

    //hall
    if (newExamCenterData.hallAvailable !== 0) {
      let count = newExamCenterData.hallAvailable;
      invi = invi + count * 2;
    }

    //room
    if (newExamCenterData.roomAvailable !== 0) {
      let count = newExamCenterData.roomAvailable / 2;
      invi = invi + count * 2;
    }

    if (newExamCenterData.specialRoomAvailable !== 0) {
      let count = newExamCenterData.specialRoomAvailable;
      invi = invi + count * 1;
    }

    if (
      newExamCenterData.hallAvailable !== 0 &&
      newExamCenterData.roomAvailable !== 0 &&
      newExamCenterData.specialRoomAvailable !== 0
    ) {
      envSup += 1;
    }

    if (newExamCenterData.roomAvailable !== 0) {
      let count = newExamCenterData.roomAvailable / 10;

      if (count >= 1) {
        //add one roomKeep for every 10 rooms
        roomKeep += count;
      }
    }

    invi -= 1; //deduct chief invi

    setNewExamCenterData({
      ...newExamCenterData,
      numberOfChiefInvigilatorRequired: chief,
      numberOfViceChiefInvigilatorRequired: viceChief,
      numberOfEnvironmentalSupervisorRequired: envSup,
      numberOfRoomKeeperRequired: roomKeep,
      numberOfInvigilatorRequired: invi,
      numberOfReservedInvigilatorRequired: reservedInvi,
    });
    //set the state of the dispalyign numbers
    setInvigilatorCalculate({
      numberOfChiefInvigilatorRequired: chief,
      numberOfViceChiefInvigilatorRequired: viceChief,
      numberOfEnvironmentalSupervisorRequired: envSup,
      numberOfRoomKeeperRequired: roomKeep,
      numberOfInvigilatorRequired: invi,
      numberOfReservedInvigilatorRequired: reservedInvi,
    });
  };

  const searchAssignmentTask = (selectedExamCenter, skip, limit) => {
    return fetchAssignmentTask(selectedExamCenter, skip, limit);
  };

  const fetchExperiences = (skip, limit = 5) => {
    dispatch(showLoading());

    return TeacherService.getTeacherInvigilatorExperience(
      selectedTeacher,
      skip,
      limit
    )
      .then((result) => {
        dispatch(hideLoading());
        const arr = result.experienceList;
        const filteredArr = [];
        arr.forEach((element) => {
          filteredArr.push({
            examTitle: element.assignmentTask.title,
            invigilationRole: element.role,
            schoolName: element.assignedTo.school.schoolName,
          });
        });
        setSelectedTeacherExperience(filteredArr);
        setExperienceCount(result.experienceCount);
        // setExperienceCount(result.experienceCount);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const fetchAssignmentTask = (skip, limit = 5) => {
    dispatch(showLoading());
    const examCenterCode = selectedExamCenter;
    return AssignmentTaskService.getAssignmentTasks(examCenterCode, skip, limit)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setFilteredAssignmentTask(result.validTasks);
          setResultCount(result.assignmentTaskCount);
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const fetchTeacherList = () => {
    dispatch(showLoading());
    return TeacherService.getTeacherList(userProfile.school)
      .then((result) => {
        const teacherOptions = [];
        teacherOptions.push({
          value: "",
          label: "",
        });
        result.teacherList.map((teacher) => {
          teacherOptions.push({
            // value: teacher.teacherData[0].uid,
            value: teacher.teacherData[0].teacherName,
            label: teacher.teacherData[0].teacherName,
          });
        });

        setTeacherList(teacherOptions);
      })
      .catch((errr) => {
        console.log(error);
      });
  };

  const fetchExamCenters = () => {
    dispatch(showLoading());
    return ExamCenterService.getExamCenters(userProfile.school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          const examCenterOptions = [];
          examCenterOptions.push({
            value: "",
            label: "",
          });
          result.examCenterList.map((rs) => {
            examCenterOptions.push({
              value: rs.examCenterCode,
              label: rs.examCenterCode,
            });
          });
          setExamCenterList(examCenterOptions);
          return true;
        }
        error({
          title: "Error",
          text: "smtg is wrong",
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const fetchExamCenterData = () => {};

  const submitInformation = () => {
    //checks position required position and selceted position same or not
    let chief = 0;
    let viceChief = 0;
    let envSup = 0;
    let roomKeep = 0;
    let invi = 0;
    let reservedInvi = 0;
    selectedTeacherList.forEach((teacherSelected) => {
      if (teacherSelected.position === "Chief Invigilator") {
        chief += 1;
      }
      if (teacherSelected.position === "Vice Chief Invigilator") {
        viceChief += 1;
      }
      if (teacherSelected.position === "Environmental Supervisor") {
        envSup += 1;
      }
      if (teacherSelected.position === "Room Keeper") {
        roomKeep += 1;
      }
      if (teacherSelected.position === "Invigilator") {
        invi += 1;
      }
      if (teacherSelected.position === "Reserved Invigilator") {
        reservedInvi += 1;
      }
    });

    //validation

    if (chief !== invigilatorCalculate.numberOfChiefInvigilatorRequired) {
      error({
        title: "Error",
        text: "Incorrect number for chief invigilator",
      });
      return;
    }
    if (
      viceChief !== invigilatorCalculate.numberOfViceChiefInvigilatorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for vice chief invigilator",
      });
      return;
    }
    if (
      envSup !== invigilatorCalculate.numberOfEnvironmentalSupervisorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for environmental supervisor",
      });
      return;
    }
    if (roomKeep !== invigilatorCalculate.numberOfRoomKeeperRequired) {
      error({
        title: "Error",
        text: "Incorrect number for room keeper",
      });
      return;
    }
    if (invi !== invigilatorCalculate.numberOfInvigilatorRequired) {
      error({
        title: "Error",
        text: "Incorrect number for invigilator",
      });
      return;
    }
    if (
      reservedInvi !== invigilatorCalculate.numberOfReservedInvigilatorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for reserved invigilator",
      });
      return;
    }

    dispatch(showLoading());
    return ExamCenterDataService.submitExamCenterData(
      newExamCenterData,
      selectedTeacherList,
      selectedAssignmentTask,
      selectedExamCenter
    )
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          success({
            title: "Success",
            text: result.msg,
          });
          history.go(0);
          return;
        }
        error({
          title: "Error",
          text: "Submit exam center data failed",
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const updateInformation = () => {
    //checks position required position and selceted position same or not
    let chief = 0;
    let viceChief = 0;
    let envSup = 0;
    let roomKeep = 0;
    let invi = 0;
    let reservedInvi = 0;
    currentSelectedTeacherList.forEach((teacherSelected) => {
      if (teacherSelected.position === "Chief Invigilator") {
        chief += 1;
      }
      if (teacherSelected.position === "Vice Chief Invigilator") {
        viceChief += 1;
      }
      if (teacherSelected.position === "Environmental Supervisor") {
        envSup += 1;
      }
      if (teacherSelected.position === "Room Keeper") {
        roomKeep += 1;
      }
      if (teacherSelected.position === "Invigilator") {
        invi += 1;
      }
      if (teacherSelected.position === "Reserved Invigilator") {
        reservedInvi += 1;
      }
    });

    //validation

    if (chief !== editInvigilatorCalculate.numberOfChiefInvigilatorRequired) {
      error({
        title: "Error",
        text: "Incorrect number for chief invigilator",
      });
      return;
    }
    if (
      viceChief !==
      editInvigilatorCalculate.numberOfViceChiefInvigilatorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for vice chief invigilator",
      });
      return;
    }
    if (
      envSup !==
      editInvigilatorCalculate.numberOfEnvironmentalSupervisorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for environmental supervisor",
      });
      return;
    }
    if (roomKeep !== editInvigilatorCalculate.numberOfRoomKeeperRequired) {
      error({
        title: "Error",
        text: "Incorrect number for room keeper",
      });
      return;
    }
    if (invi !== editInvigilatorCalculate.numberOfInvigilatorRequired) {
      error({
        title: "Error",
        text: "Incorrect number for invigilator",
      });
      return;
    }
    if (
      reservedInvi !==
      editInvigilatorCalculate.numberOfReservedInvigilatorRequired
    ) {
      error({
        title: "Error",
        text: "Incorrect number for reserved invigilator",
      });
      return;
    }
    dispatch(showLoading());
    return ExamCenterDataService.updateExamCenterData(
      currentExamCenterData,
      currentSelectedTeacherList,
      selectedAssignmentTask,
      selectedExamCenter
    )
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          success({
            title: "Success",
            text: result.msg,
          });
          history.go(0);
          return;
        }
        error({
          title: "Error",
          text: "Update exam center data failed",
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  // if (
  //   newExamCenterData.roomAvailable !== "" &&
  //   newExamCenterData.specialRoomAvailable !== "" &&
  //   newExamCenterData.hallAvailable !== "" &&
  //   newExamCenterData.roomCandidateNumber !== "" &&
  //   newExamCenterData.specialRoomCandidateNumber !== "" &&
  //   newExamCenterData.hallCandidateNumber !== "" &&
  //   calculateStatus === false
  // ) {
  //   calculateInvigilator();
  //   setcalculateStatus(true);
  // }

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([fetchExamCenters(), fetchTeacherList()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Select Exam Center</h3>
              </CardHeader>
              <CardBody className="bg-secondary">
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Exam Center of the School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="name"
                            // placeholder={school.schoolCode}
                            value={selectedExamCenter}
                            type="select"
                            onChange={handleExamCenter}
                          >
                            {examCenterList?.map((center, index) => {
                              return (
                                <option
                                  value={center.value}
                                  key={`center_ ${center.value}`}
                                >
                                  {center.label}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Row className="align-items-end">
                  {/* <div className="pl-lg-4"> */}
                  <Col className="text-right" lg="12">
                    <Button color="primary" onClick={handleSearch} size="sm">
                      Select
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col lg="3">
                    <h3 className="mb-0">Assignment Task List </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <MuiTable
                  setChangePage={(changePage) => {
                    setChangeTablePageFunction(changePage);
                  }}
                  parentCallback={searchAssignmentTask}
                  data={filteredAssignmentTask}
                  totalCount={resultCount}
                  scrollIntoView={scrollIntoView}
                  columns={[
                    {
                      name: "examType",
                      label: "Exam Type",
                    },
                    {
                      name: "title",
                      label: "Exam Name",
                    },
                    {
                      name: "selectedExamCenterAssignmentTaskSatus",
                      label: "Status",
                      options: {
                        customBodyRender: (value) => {
                          if (value === "Incomplete") {
                            return (
                              <>
                                <Badge color="warning">{value}</Badge>
                              </>
                            );
                          }
                          if (value === "Pending") {
                            return (
                              <>
                                <Badge color="info">{value}</Badge>
                              </>
                            );
                          }
                        },
                      },
                    },
                    {
                      name: "collectionDate",
                      label: "Deadline",
                      options: {
                        customBodyRender: (value, tableMeta) => {
                          const date = moment(value).format(
                            "YYYY-MM-DD HH:mm:ss"
                          );
                          return date;
                        },
                      },
                    },
                    {
                      name: "_id",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, tableMeta) => {
                          return tableMeta.rowData[2] === "Incomplete" ? (
                            <>
                              <Button
                                color="info"
                                onClick={() => showCompleteModal(value)}
                                size="sm"
                              >
                                Complete
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                color="success"
                                onClick={() => showEditModal(value)}
                                size="sm"
                              >
                                Edit
                              </Button>
                            </>
                          );
                        },
                      },
                    },
                  ]}
                ></MuiTable>
              </CardBody>
            </Card>
          </div>
        </Row>
        {/* Modal for complete */}
        {/* exam center information modal */}
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={completeModal}
          toggle={() => showCompleteModal()}
        >
          <ModalHeader>{`Exam Center Data ${selectedExamCenter}`}</ModalHeader>
          <ModalBody>
            <Row>
              {/* Exam Center Information */}
              <Col>
                <Card className="card-profile shadow">
                  <CardHeader>
                    <Row>
                      <Col>
                        <h4>Exam Center Status</h4>
                        {/* <Button
                          className="float-right"
                          color="secondary"
                          size="sm"
                        >
                          Reset 
                        </Button> */}
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-roomAvailable"
                            >
                              Room Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="roomAvailable"
                              value={newExamCenterData.roomAvailable}
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-roomCandidateNumber"
                            >
                              Room Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="roomCandidateNumber"
                              value={newExamCenterData.roomCandidateNumber}
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-specialRoomAvailable"
                            >
                              Special Room Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="specialRoomAvailable"
                              value={newExamCenterData.specialRoomAvailable}
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-specialRoomCandidateNumber"
                            >
                              Special Room Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="specialRoomCandidateNumber"
                              value={
                                newExamCenterData.specialRoomCandidateNumber
                              }
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hallAvailable"
                            >
                              Hall Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="hallAvailable"
                              value={newExamCenterData.hallAvailable}
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hallCandidateNumber"
                            >
                              Hall Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="hallCandidateNumber"
                              value={newExamCenterData.hallCandidateNumber}
                              type="number"
                              onChange={handleNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="float-right"
              color="default"
              // href="#pablo"
              onClick={handleNext}
              size="sm"
            >
              Next
            </Button>
          </ModalFooter>
        </Modal>
        {/* teacher selection modal */}
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={selectModal}
          toggle={() => showSelectModal()}
        >
          <ModalHeader>{`Exam Center Data ${selectedExamCenter}`}</ModalHeader>
          <ModalBody>
            <Row>
              {/* Exam Center Information */}
              <Col xl="8">
                <Card className="card-profile shadow">
                  <CardHeader>
                    <h4>Exam Center Status</h4>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <div>
                        <Row>
                          <Col xl="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-teacher"
                              >
                                Select Teacher
                              </label>
                              <Input
                                className="form-control-alternative"
                                name="teacher"
                                value={selectedTeacher}
                                type="select"
                                onChange={handleTeacherChange}
                              >
                                {teacherList?.map((teacher, index) => {
                                  return (
                                    <option
                                      value={teacher.value}
                                      key={`teacher_ ${teacher.value}`}
                                    >
                                      {teacher.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xl="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-position"
                              >
                                Position
                              </label>
                              <Input
                                className="form-control-alternative"
                                name="position"
                                value={selectedPosition}
                                type="select"
                                onChange={handlePositionChange}
                              >
                                {positionOptions.map((position, index) => {
                                  return (
                                    <option
                                      value={position.value}
                                      key={`position_ ${position.value}`}
                                    >
                                      {position.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xl="2">
                            <Button
                              size="sm"
                              color="primary"
                              className="mt-4"
                              onClick={handleSelectTeacher}
                            >
                              Select Teacher
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <div className="col">
                            <Card className="shadow">
                              <CardHeader className="border-0">
                                <Row>
                                  <Col>
                                    <h3 className="mb-0">
                                      Invigilator Experience
                                    </h3>
                                  </Col>
                                </Row>
                              </CardHeader>
                              <CardBody>
                                <MuiTable
                                  setChangePage={(changePage) => {
                                    setExpChangeTablePageFunction(changePage);
                                  }}
                                  parentCallback={searchInvigilatorExperience}
                                  // parentCallback={handleTeacherChange}
                                  data={selectedTeacherExperience}
                                  totalCount={experienceCount}
                                  scrollIntoView={scrollIntoView}
                                  columns={[
                                    {
                                      name: "examTitle",
                                      label: "Assignment Task",
                                    },
                                    {
                                      name: "schoolName",
                                      label: "School Name",
                                    },
                                    {
                                      name: "invigilationRole",
                                      label: "Invigilation Role",
                                      options: {
                                        customBodyRender: (
                                          value,
                                          tableMeta
                                        ) => {
                                          return _.startCase(value);
                                        },
                                      },
                                    },
                                  ]}
                                ></MuiTable>
                              </CardBody>
                            </Card>
                          </div>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              {/* Invigilatorsdf information */}
              <Col xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div></div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center ">
                    <div className="d-flex justify-content-between">
                      <h4> Suggseted Number of Invigilators</h4>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <Row>
                      <div>
                        <div className="justify-content-center">
                          <Row className="p-2">
                            <div className="col">
                              Chief Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfChiefInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Vice Chief Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfViceChiefInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Environmental Supervisor Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfEnvironmentalSupervisorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">Room Keeper Required</div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfRoomKeeperRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">Invigilator Required</div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Reserved Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  invigilatorCalculate.numberOfReservedInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <hr></hr>
            <Row xl="12">
              <Col>
                {/* display teacher selected */}
                <Card className="card-profile shadow">
                  <CardHeader>
                    <h4>Teacher selected</h4>
                  </CardHeader>
                  <CardBody>
                    <Row className="icon-examples">
                      <div className="col" lg="3" md="6">
                        {selectedTeacherList?.map((teacher) => {
                          // const id = uuidv4();
                          return (
                            <>
                              <div
                                lg="3"
                                onClick={() => removeTeacher(teacher)}
                              >
                                <Button
                                  size="xl"
                                  className="float-right justify-content-between"
                                  color="danger"
                                >
                                  <i className="ni ni-fat-delete"></i>
                                </Button>
                              </div>
                              <div
                                className="mt-2"
                                key={`postionTeacher_${teacher.position}${teacher.teacherName}`}
                              >
                                <Col lg="3">
                                  <h4>{teacher.position}</h4>
                                  {teacher.teacherName}
                                </Col>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row xl="12">
              <Button
                className="float-left"
                color="secondary"
                onClick={handleBack}
                size="sm"
              >
                Back
              </Button>
              <Button
                className="float-right"
                color="default"
                onClick={submitInformation}
                size="sm"
              >
                Complete
              </Button>
            </Row>
          </ModalFooter>
        </Modal>

        {/* Modal for edit  */}
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={editModal}
          toggle={() => showEditModal()}
        >
          <ModalHeader>
            {`Update Exam Center Data ${selectedExamCenter}`}
          </ModalHeader>
          <ModalBody>
            <Row>
              {/* Exam Center Information */}
              <Col>
                <Card className="card-profile shadow">
                  <CardHeader>
                    <Row>
                      <Col>
                        <h4>Exam Center Status</h4>
                        {/* <Button
                          className="float-right"
                          color="secondary"
                          size="sm"
                        >
                          Reset 
                        </Button> */}
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-roomAvailable"
                            >
                              Room Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="roomAvailable"
                              value={currentExamCenterData.roomAvailable}
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-roomCandidateNumber"
                            >
                              Room Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="roomCandidateNumber"
                              value={currentExamCenterData.roomCandidateNumber}
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-specialRoomAvailable"
                            >
                              Special Room Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="specialRoomAvailable"
                              value={currentExamCenterData.specialRoomAvailable}
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-specialRoomCandidateNumber"
                            >
                              Special Room Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="specialRoomCandidateNumber"
                              value={
                                currentExamCenterData.specialRoomCandidateNumber
                              }
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hallAvailable"
                            >
                              Hall Available
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="hallAvailable"
                              value={currentExamCenterData.hallAvailable}
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hallCandidateNumber"
                            >
                              Hall Total Candidate
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="hallCandidateNumber"
                              value={currentExamCenterData.hallCandidateNumber}
                              type="number"
                              onChange={handleEditNewChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="float-right"
              color="default"
              // href="#pablo"
              onClick={handleEditNext}
              size="sm"
            >
              Next
            </Button>
          </ModalFooter>
        </Modal>

        {/* edit teacher selection modal */}
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={editSelectModal}
          toggle={() => showEditSelectModal()}
        >
          <ModalBody>
            <Row>
              {/* Exam Center Information */}
              <Col xl="8">
                <Card className="card-profile shadow">
                  <CardHeader>
                    <h4>Exam Center Status</h4>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <div>
                        <Row>
                          <Col xl="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-teacher"
                              >
                                Select Teacher
                              </label>
                              <Input
                                className="form-control-alternative"
                                name="teacher"
                                value={selectedTeacher}
                                type="select"
                                onChange={handleTeacherChange}
                              >
                                {teacherList?.map((teacher, index) => {
                                  return (
                                    <option
                                      value={teacher.value}
                                      key={`teacher_ ${teacher.value}`}
                                    >
                                      {teacher.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xl="5">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-position"
                              >
                                Position
                              </label>
                              <Input
                                className="form-control-alternative"
                                name="position"
                                value={selectedPosition}
                                type="select"
                                onChange={handlePositionChange}
                              >
                                {positionOptions.map((position, index) => {
                                  return (
                                    <option
                                      value={position.value}
                                      key={`position_ ${position.value}`}
                                    >
                                      {position.label}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xl="2">
                            <Button
                              size="sm"
                              color="primary"
                              className="mt-4"
                              onClick={handleEditSelectTeacher}
                            >
                              Select Teacher
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <div className="col">
                            <Card className="shadow">
                              <CardHeader className="border-0">
                                <Row>
                                  <Col>
                                    <h3 className="mb-0">
                                      Invigilator Experience
                                    </h3>
                                  </Col>
                                </Row>
                              </CardHeader>
                              <CardBody>
                                <MuiTable
                                  setChangePage={(changePage) => {
                                    setExpChangeTablePageFunction(changePage);
                                  }}
                                  parentCallback={searchInvigilatorExperience}
                                  // parentCallback={handleTeacherChange}
                                  data={selectedTeacherExperience}
                                  totalCount={experienceCount}
                                  scrollIntoView={scrollIntoView}
                                  columns={[
                                    {
                                      name: "examTitle",
                                      label: "Assignment Task",
                                    },
                                    {
                                      name: "schoolName",
                                      label: "School Name",
                                    },
                                    {
                                      name: "invigilationRole",
                                      label: "Invigilation Role",
                                    },
                                  ]}
                                ></MuiTable>
                              </CardBody>
                            </Card>
                          </div>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              {/* Invigilatorsdf information */}
              <Col xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div></div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center ">
                    <div className="d-flex justify-content-between">
                      <h4> Suggseted Number of Invigilators</h4>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <Row>
                      <div>
                        <div className="justify-content-center">
                          <Row className="p-2">
                            <div className="col">
                              Chief Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfChiefInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Vice Chief Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfViceChiefInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Environmental Supervisor Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfChiefInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">Room Keeper Required</div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfRoomKeeperRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">Invigilator Required</div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div className="col">
                              Reserved Invigilator Required
                            </div>
                            <div className="col-auto col">
                              <span className="font-weight-light">
                                {
                                  editInvigilatorCalculate.numberOfReservedInvigilatorRequired
                                }
                              </span>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <hr></hr>
            <Row xl="12">
              <Col>
                {/* display teacher selected */}
                <Card className="card-profile shadow">
                  <CardHeader>
                    <h4>Teacher selected</h4>
                  </CardHeader>
                  <CardBody>
                    <Row className="icon-examples">
                      <div className="col" lg="3" md="6">
                        {currentSelectedTeacherList?.map((teacher) => {
                          // const id = uuidv4();
                          return (
                            <>
                              <div
                                lg="3"
                                onClick={() => removeEditTeacher(teacher)}
                              >
                                <Button
                                  size="xl"
                                  className="float-right justify-content-between"
                                  color="danger"
                                >
                                  <i className="ni ni-fat-delete"></i>
                                </Button>
                              </div>
                              <div
                                className="mt-2"
                                key={`postionTeacher_${teacher.position}${teacher.teacherName}`}
                              >
                                <Col lg="3">
                                  <h4>{teacher.position}</h4>
                                  {teacher.teacherName}
                                </Col>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row xl="12">
              <Button
                className="float-left"
                color="secondary"
                onClick={handleEditBack}
                size="sm"
              >
                Back
              </Button>
              <Button
                className="float-right"
                color="default"
                onClick={updateInformation}
                size="sm"
              >
                Complete
              </Button>
            </Row>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default AssignmentTask;
