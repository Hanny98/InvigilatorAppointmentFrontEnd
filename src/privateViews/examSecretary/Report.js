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
  Table,
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
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// core components
import Header from "components/Headers/Header.js";
import ExamCenterService from "../../services/examCenter.service";
import AssignmentTaskService from "../../services/assignmentTask.service";
import TeacherService from "services/teacher.service";
import SchoolService from "services/school.service";
import ExamCenterDataService from "../../services/examCenterData.service";
import { showLoading, hideLoading } from "actions/store";
import MuiTable from "../widgets/muiTable.js";
import ExamCenterInformationPDF from "../../pdfFolder/ExamCenterInformationPDF.js";
import ProposedInvigilatorPDF from "../../pdfFolder/ProposedInvigilatorPDF.js";

const ids = ["1"];

const Report = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userProfile } = useSelector((state) => state.userProfile);

  const schoolState = {
    schoolCode: "",
    schoolName: "",
    schoolAddress: "",
    district: "",
    postcode: "",
    city: "",
    stateCode: "",
    areaCode: "",
    schoolPhoneNumber: "",
    schoolEmailAddress: "",
    typeOfSchool: "",
    codeDun: "",
    codeParlimen: "",
    taxNumber: "",
    uid: "",
  };

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
  const [schoolInformation, setSchoolInformation] = useState(schoolState);
  const [examCenterList, setExamCenterList] = useState([]);
  const [filteredAssignmentTask, setFilteredAssignmentTask] = useState();
  const [selectedAssignmentTask, setSelectedAssignmentTask] = useState("");
  const [currentExamCenterData, setCurrentExamCenterData] =
    useState(initialState);
  const [currentSelectedTeacherList, setCurrentSelectedTeacherList] = useState(
    []
  );

  const [examTitle, setExamTitle] = useState("");

  // const [, setReviewModal] = useState(false);
  const [examCenterInformationModal, setExamCenterInformationModal] =
    useState(false);
  const [invigilatorPorposedModal, setInvigilatorPorposedModal] =
    useState(false);

  //muitable function
  const [changeTablePageFunction, setChangeTablePageFunction] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(false);

  const showExamCenterInformationModal = (value, examTitle) => {
    setSelectedAssignmentTask(value); //the _id
    setExamTitle(examTitle);

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

    setExamCenterInformationModal(!examCenterInformationModal);
  };

  const showInvigilatorProposedModal = (value, examTitle) => {
    setSelectedAssignmentTask(value); //the _id
    setExamTitle(examTitle);

    dispatch(showLoading());
    const examCenterDataPromise = new Promise(function (resolve, reject) {
      const result = ExamCenterDataService.getExamCenterDataForReport(
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

    setInvigilatorPorposedModal(!invigilatorPorposedModal);
  };

  const handleExamCenter = async (e) => {
    const { value } = e.target;
    // setPreselectedExamCenter(value);
    setSelectedExamCenter(value);
    // dispatch(showLoading());
    // changeTablePageFunction(0);
    // await searchAssignmentTask(0, 100);
    // dispatch(hideLoading());
  };

  const handleSearch = async () => {
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
    return AssignmentTaskService.getApprovedAssignmentTasks(
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

  const fetchSchoolInformation = () => {
    dispatch(showLoading());
    return SchoolService.getSchool(userProfile.school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setSchoolInformation(result.school[0]);
          return true;
        }
        error({
          title: "Error",
          text: result.msg,
        });
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  const calculateTotalInvigilator = () => {
    let c =
      currentExamCenterData.numberOfEnvironmentalSupervisorRequired +
      currentExamCenterData.numberOfChiefInvigilatorRequired +
      currentExamCenterData.numberOfViceChiefInvigilatorRequired +
      currentExamCenterData.numberOfRoomKeeperRequired +
      currentExamCenterData.numberOfInvigilatorRequired +
      currentExamCenterData.numberOfReservedInvigilatorRequired;

    return c;
  };

  const calculateTotalRoom = () => {
    let c =
      currentExamCenterData.hallCandidateNumber +
      currentExamCenterData.roomCandidateNumber +
      currentExamCenterData.specialRoomCandidateNumber;

    return c;
  };

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([fetchExamCenters(), fetchSchoolInformation()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
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
                  <Col lg="5">
                    <h3 className="mb-0">Assignment Task List Approved</h3>
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
                              <Badge color="success">{value}</Badge>
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
                                color="primary"
                                onClick={() =>
                                  showExamCenterInformationModal(
                                    value,
                                    tableMeta.rowData[1]
                                  )
                                }
                                size="sm"
                              >
                                Exam Center Information Report
                              </Button>
                              <Button
                                color="info"
                                onClick={() =>
                                  showInvigilatorProposedModal(
                                    value,
                                    tableMeta.rowData[1]
                                  )
                                }
                                size="sm"
                              >
                                Proposed Invigialtor Report
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
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={examCenterInformationModal}
          toggle={() => showExamCenterInformationModal()}
        >
          <ModalHeader>You are about to download a PDF File</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h4>
                  Do you want to download this Exam Center Information Report?
                </h4>
                {/* <h4></h4 */}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Col className="float-left">
              <Button
                className="secondary"
                size="sm"
                onClick={() =>
                  setExamCenterInformationModal(!examCenterInformationModal)
                }
              >
                Cancel
              </Button>
            </Col>
            <Col xl="1">
              {/* pdf download link button */}
              <PDFDownloadLink
                className="float-right"
                document={
                  <ExamCenterInformationPDF
                    examCenterInformation={
                      currentExamCenterData === null
                        ? null
                        : currentExamCenterData
                    }
                    selectedExamCenter={selectedExamCenter}
                    schoolInformation={schoolInformation}
                    totalInvigilator={calculateTotalInvigilator()}
                    totalCandidate={calculateTotalRoom()}
                    examTitle={examTitle}
                  />
                }
                fileName="examCenterInformaition.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <div>Loading</div>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        success({
                          title: "Sucess",
                          text: "File has been downloaded successfully",
                        });
                        setExamCenterInformationModal(
                          !examCenterInformationModal
                        );
                      }}
                    >
                      Yes
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </Col>
          </ModalFooter>
        </Modal>
        {/* Invigilator selection modal */}
        <Modal
          className="modal-dialog-top"
          size="xl"
          isOpen={invigilatorPorposedModal}
          toggle={() => showInvigilatorProposedModal()}
        >
          <ModalHeader>You are about to donwload a PDF File</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h4>
                  Do you want to download this Proposed Invigilator Report?
                </h4>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Col className="float-left">
              <Button
                className="secondary"
                size="sm"
                onClick={() =>
                  setInvigilatorPorposedModal(!invigilatorPorposedModal)
                }
              >
                Cancel
              </Button>
            </Col>
            <Col xl="1">
              {/* pdf download link button */}
              <PDFDownloadLink
                className="float-right"
                document={
                  <ProposedInvigilatorPDF
                    currentSelectedTeacherList={currentSelectedTeacherList}
                    selectedExamCenter={selectedExamCenter}
                    schoolInformation={schoolInformation}
                    examTitle={examTitle}
                  />
                }
                fileName="proposedInvigilator.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <div>Loading</div>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        success({
                          title: "Sucess",
                          text: "File has been downloaded successfully",
                        });
                        setInvigilatorPorposedModal(!invigilatorPorposedModal);
                      }}
                    >
                      Yes
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </Col>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default Report;
