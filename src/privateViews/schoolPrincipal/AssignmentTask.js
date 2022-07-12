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

// core components
import Header from "components/Headers/Header.js";
import ExamCenterService from "../../services/examCenter.service";
import AssignmentTaskService from "../../services/assignmentTask.service";
import TeacherService from "services/teacher.service";
import ExamCenterDataService from "../../services/examCenterData.service";
import { showLoading, hideLoading } from "actions/store";
import MuiTable from "../widgets/muiTable.js";

const ApproveAssignmentTask = () => {
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

  const [selectedExamCenter, setSelectedExamCenter] = useState();
  // const [searchedExamCenter, setSearchedExamCenter] = useState()
  const [examCenterList, setExamCenterList] = useState([]);
  const [filteredAssignmentTask, setFilteredAssignmentTask] = useState();
  const [selectedAssignmentTask, setSelectedAssignmentTask] = useState("");
  const [currentExamCenterData, setCurrentExamCenterData] =
    useState(initialState);
  const [currentSelectedTeacherList, setCurrentSelectedTeacherList] = useState(
    []
  );

  const [reviewModal, setReviewModal] = useState(false);

  //muitable function
  const [changeTablePageFunction, setChangeTablePageFunction] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(false);

  const showReviewModal = (value) => {
    setSelectedAssignmentTask(value); //the _id

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
          setCurrentExamCenterData(result.examCenterData);
          setCurrentSelectedTeacherList(result.examCenterData.teacherList);
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });

    setReviewModal(!reviewModal);
  };

  const handleExamCenter = (e) => {
    const { value } = e.target;
    setSelectedExamCenter(value);
  };

  const handleCancel = () => {
    setReviewModal(false);
  };

  const handleSearch = async () => {
    // setSelectedExamCenter(preselectedExamCenter);
    dispatch(showLoading());
    changeTablePageFunction(0);
    await searchAssignmentTask(0, 100);
    dispatch(hideLoading());
  };

  const searchAssignmentTask = (selectedExamCenter, skip, limit) => {
    return fetchAssignmentTask(selectedExamCenter, skip, limit);
  };

  const fetchAssignmentTask = (skip, limit = 5) => {
    dispatch(showLoading());
    const examCenterCode = selectedExamCenter;
    return AssignmentTaskService.getPrincipalAssignmentTasks(
      examCenterCode,
      skip,
      limit
    )
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

  const reviewExamCenterData = (decision) => {
    dispatch(showLoading());
    return ExamCenterDataService.reviewExamCenterData(
      decision,
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
          text: "Review assignment task error",
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([fetchExamCenters()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
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
                <Col lg="5">
                  <h3 className="mb-0">Assignment Task List To Be Reviewed</h3>
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
                        return (
                          <>
                            <Badge color="info">{value}</Badge>
                          </>
                        );
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
                        return (
                          <>
                            <Button
                              color="info"
                              onClick={() => showReviewModal(value)}
                              size="sm"
                            >
                              Review
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

      {/* Review Modal */}
      {/* exam center information modal */}
      <Modal
        className="modal-dialog-top"
        size="xl"
        isOpen={reviewModal}
        toggle={() => showReviewModal()}
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
                            value={currentExamCenterData.roomAvailable}
                            type="number"
                            disabled="true"
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
                            disabled="true"
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
                            disabled="true"
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
                            disabled="true"
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
                            disabled="true"
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
                            disabled="true"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        {/* display teacher selected */}
                        <Card className="card-profile shadow">
                          <CardHeader>
                            <h4>Position proposed | Teacher selected</h4>
                          </CardHeader>
                          <CardBody>
                            <Row className="icon-examples">
                              <div className="col">
                                {currentSelectedTeacherList?.map((teacher) => {
                                  // const id = uuidv4();
                                  return (
                                    <>
                                      <div
                                        className="mt-2"
                                        key={`postionTeacher_${teacher.position}${teacher.teacherName}`}
                                      >
                                        <Row>
                                          <Col>
                                            <h4>{teacher.position}</h4>
                                          </Col>
                                          <Col>{teacher.teacherName}</Col>
                                        </Row>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col>
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
                                          currentExamCenterData.numberOfChiefInvigilatorRequired
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
                                          currentExamCenterData.numberOfViceChiefInvigilatorRequired
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
                                          currentExamCenterData.numberOfEnvironmentalSupervisorRequired
                                        }
                                      </span>
                                    </div>
                                  </Row>
                                  <Row className="p-2">
                                    <div className="col">
                                      Room Keeper Required
                                    </div>
                                    <div className="col-auto col">
                                      <span className="font-weight-light">
                                        {
                                          currentExamCenterData.numberOfRoomKeeperRequired
                                        }
                                      </span>
                                    </div>
                                  </Row>
                                  <Row className="p-2">
                                    <div className="col">
                                      Invigilator Required
                                    </div>
                                    <div className="col-auto col">
                                      <span className="font-weight-light">
                                        {
                                          currentExamCenterData.numberOfInvigilatorRequired
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
                                          currentExamCenterData.numberOfReservedInvigilatorRequired
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
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Col>
            <Button
              className="float-left"
              color="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>

          <Col xl="2">
            <Button
              className="float-right"
              color="default"
              size="sm"
              onClick={() => reviewExamCenterData("approve")}
            >
              Approve
            </Button>

            <Button
              className="float left"
              color="danger"
              size="sm"
              onClick={() => reviewExamCenterData("reject")}
            >
              Reject
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ApproveAssignmentTask;
