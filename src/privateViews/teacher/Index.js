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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
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
  NavbarText,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { error, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

import Header from "components/Headers/Header.js";
import TeacherService from "../../services/teacher.service";
import UserService from "../../services/user.service";
import { showLoading, hideLoading } from "actions/store";
import { updateUserStatus } from "actions/auth";

const TeacherIndex = () => {
  const initialState = {
    status: "",
    district: "",
    school: "",
    icNumber: "",
    listOfInvigilatorExperience: "",
    race: "",
    homeAddress: "",
    postcode: "",
    city: "",
    state: "",
    teacherName: "",
    teacherPhoneNumber: "",
    teacherSex: "",
    teacherPosition: "",
    teacherEmailAddress: "",
    salaryGrade: "",
    salary: "",
    jpnFileCode: "",
    codeTypeStaff: "",
    typeStaff: "",
    teacherPositionCode: "",
    teacherTypeStaffCode: "",
    uid: "",
  };

  const [userData, setUserData] = useState();

  const fetchCurrentSchoolTeacher = () => {
    dispatch(showLoading());
    return UserService.getCurrentSchoolUser(userProfile.school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          const arr = [];
          arr.push(result.principalCount, result.teacherCount);
          setUserData(arr);

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

  const dispatch = useDispatch();
  const history = useHistory();
  const { userProfile } = useSelector((state) => state.userProfile);
  const genderOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const positionOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "GB",
      label: "GB (Guru Besar)",
    },
    {
      value: "GAB",
      label: "GAB (Guru Biasa/Akademik Biasa/Guru Penolong)",
    },
  ];

  const staffOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "G",
      label: "G (Guru)",
    },
    {
      value: "GP",
      label: "GP (Guru Penolong)",
    },
    {
      value: "GB",
      label: "GB (Guru Besar)",
    },
  ];

  const salaryCodeOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "DG41",
      label: "DG41",
    },
    {
      value: "DG44",
      label: "DG44",
    },
    {
      value: "DG48",
      label: "DG48",
    },
    {
      value: "DG52",
      label: "DG52",
    },
    {
      value: "DG54",
      label: "DG54",
    },
  ];

  const stateOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "Johor",
      label: "Johor",
    },
    {
      value: "Kedah",
      label: "Kedah",
    },
    {
      value: "Kelantan",
      label: "Kelantan",
    },
    {
      value: "Malacca",
      label: "Malacca",
    },
    {
      value: "Negeri Sembilan",
      label: "Negeri Sembilan",
    },
    {
      value: "Pahang",
      label: "Pahang",
    },
    {
      value: "Penang",
      label: "Penang",
    },
    {
      value: "Perak",
      label: "Perak",
    },
    {
      value: "Perlis",
      label: "Perlis",
    },
    {
      value: "Sabah",
      label: "Sabah",
    },
    {
      value: "Sarawak",
      label: "Sarawak",
    },
    {
      value: "Selangor",
      label: "Selangor",
    },
    {
      value: "Terengganu",
      label: "Terengganu",
    },
  ];

  const [newTeacher, setNewTeacher] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const [completeModal, setCompleteModal] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);

  const showCompleteModal = () => {
    setNoticeModal(false);
    setCompleteModal(!completeModal);
  };

  const checkTeacherStatus = () => {
    if (userProfile.status === 0) {
      setNoticeModal(true);
    } else {
      return true;
    }
  };

  const submitTeacherInformation = () => {
    if (
      newTeacher.teacherName === "" ||
      newTeacher.teacherName === null ||
      newTeacher.teacherName === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Name",
      });
      return false;
    }
    if (
      newTeacher.icNumber === "" ||
      newTeacher.icNumber === null ||
      newTeacher.icNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid IC Number",
      });
      return false;
    }
    if (
      newTeacher.teacherSex === "" ||
      newTeacher.teacherSex === null ||
      newTeacher.teacherSex === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Gender",
      });
      return false;
    }
    if (
      newTeacher.race === "" ||
      newTeacher.race === null ||
      newTeacher.race === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Race",
      });
      return false;
    }
    if (
      newTeacher.teacherEmailAddress === "" ||
      newTeacher.teacherEmailAddress === null ||
      newTeacher.teacherEmailAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Email Address",
      });
      return false;
    }
    if (
      newTeacher.teacherPhoneNumber === "" ||
      newTeacher.teacherPhoneNumber === null ||
      newTeacher.teacherPhoneNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Phone Number",
      });
      return false;
    }
    if (
      newTeacher.homeAddress === "" ||
      newTeacher.homeAddress === null ||
      newTeacher.homeAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Home Address",
      });
      return false;
    }
    if (
      newTeacher.postcode === "" ||
      newTeacher.postcode === null ||
      newTeacher.postcode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Postcode",
      });
      return false;
    }
    if (
      newTeacher.city === "" ||
      newTeacher.city === null ||
      newTeacher.city === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid City",
      });
      return false;
    }
    if (
      newTeacher.state === "" ||
      newTeacher.state === null ||
      newTeacher.state === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid State",
      });
      return false;
    }
    if (
      newTeacher.teacherPositionCode === "" ||
      newTeacher.teacherPositionCode === null ||
      newTeacher.teacherPositionCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Position Code",
      });
      return false;
    }
    if (
      newTeacher.teacherTypeStaffCode === "" ||
      newTeacher.teacherTypeStaffCode === null ||
      newTeacher.teacherTypeStaffCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Type Staff Code",
      });
      return false;
    }
    if (
      newTeacher.salaryGrade === "" ||
      newTeacher.salaryGrade === null ||
      newTeacher.salaryGrade === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary Grade",
      });
      return false;
    }
    if (
      newTeacher.salary === "" ||
      newTeacher.salary === null ||
      newTeacher.salary === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary",
      });
      return false;
    }
    if (
      newTeacher.jpnFileCode === "" ||
      newTeacher.jpnFileCode === null ||
      newTeacher.jpnFileCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid JPN File Code",
      });
      return false;
    }
    dispatch(showLoading());

    return TeacherService.completeTeacher(newTeacher, userProfile._id)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          success({
            title: "Success",
            text: "Submitted successfully",
          });
          dispatch(updateUserStatus(userProfile._id))
            .then(() => {
              history.go(0);
            })
            .catch((err) => {
              console.log(err);
            });
          // history.go(0);
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

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([checkTeacherStatus(), fetchCurrentSchoolTeacher()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* <div>
          <></>
        </div> */}
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Users Chart
                  </h6>
                  <h2 className="mb-0">Number of user</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              {userData ? (
                <div className="chart">
                  <Bar
                    data={{
                      labels: ["School Principal", "Teacher"],
                      datasets: [
                        {
                          label: "Number of Users",
                          data: [...userData],
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                          ],
                          borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    // options={chartExample2.options}
                  />
                </div>
              ) : (
                <></>
              )}
            </CardBody>
          </Card>
        </Col>
        <Modal
          className="modal-dialog-top"
          size="lg"
          isOpen={completeModal}
          // toggle={() => showCompleteModal()} //need to comment out
        >
          <ModalHeader>Complete Personal Information</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherName"
                    >
                      Teacher Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherName"
                      placeholder={newTeacher.teacherName}
                      value={newTeacher.teacherName}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-icNumber"
                    >
                      Teacher IC Number
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="icNumber"
                      placeholder={newTeacher.icNumber}
                      value={newTeacher.icNumber}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherSex"
                    >
                      Teacher Gender
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherSex"
                      placeholder={newTeacher.teacherSex}
                      value={newTeacher.teacherSex}
                      type="select"
                      onChange={handleChange}
                    >
                      {genderOptions.map((gender, index) => {
                        return (
                          <option
                            value={gender.value}
                            key={`gender_ ${gender.value}`}
                          >
                            {gender.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-race">
                      Race
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="race"
                      placeholder={newTeacher.race}
                      value={newTeacher.race}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherEmailAddress"
                    >
                      Email Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherEmailAddress"
                      placeholder={newTeacher.teacherEmailAddress}
                      value={newTeacher.teacherEmailAddress}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherPhoneNumber"
                    >
                      Phone Number
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherPhoneNumber"
                      placeholder={newTeacher.teacherPhoneNumber}
                      value={newTeacher.teacherPhoneNumber}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-homeAddress"
                    >
                      Home Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="homeAddress"
                      placeholder={newTeacher.homeAddress}
                      value={newTeacher.homeAddress}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-postcode"
                    >
                      Postcode
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="postcode"
                      placeholder={newTeacher.postcode}
                      value={newTeacher.postcode}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      City
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="city"
                      placeholder={newTeacher.city}
                      value={newTeacher.city}
                      type="text"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-state">
                      State
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="state"
                      value={newTeacher.state}
                      type="select"
                      onChange={handleChange}
                    >
                      {stateOptions.map((state, index) => {
                        return (
                          <option
                            value={state.value}
                            key={`state_ ${state.value}`}
                          >
                            {state.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherPositionCode"
                    >
                      Teacher Position Code
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherPositionCode"
                      value={newTeacher.teacherPositionCode}
                      type="select"
                      onChange={handleChange}
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
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-teacherTypeStaffCode"
                    >
                      Staff Code
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="teacherTypeStaffCode"
                      placeholder={newTeacher.teacherTypeStaffCode}
                      value={newTeacher.teacherTypeStaffCode}
                      type="select"
                      onChange={handleChange}
                    >
                      {staffOptions.map((staff, index) => {
                        return (
                          <option
                            value={staff.value}
                            key={`staff_ ${staff.value}`}
                          >
                            {staff.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-salaryGrade"
                    >
                      Salary Grade
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="salaryGrade"
                      placeholder={newTeacher.salaryGrade}
                      value={newTeacher.salaryGrade}
                      type="select"
                      onChange={handleChange}
                    >
                      {salaryCodeOptions.map((salary, index) => {
                        return (
                          <option
                            value={salary.value}
                            key={`salary_ ${salary.value}`}
                          >
                            {salary.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-salary"
                    >
                      Salary
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="salary"
                      placeholder={newTeacher.salary}
                      value={newTeacher.salary}
                      type="number"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-jpnFileCode"
                    >
                      JPN File Code
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="jpnFileCode"
                      placeholder={newTeacher.jpnFileCode}
                      value={newTeacher.jpnFileCode}
                      type="text"
                      onChange={handleChange}
                    >
                      {salaryCodeOptions.map((salary, index) => {
                        return (
                          <option
                            value={salary.value}
                            key={`salary_ ${salary.value}`}
                          >
                            {salary.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Row className="align-items-end">
              <Col className="text-right" lg="12">
                <Button
                  color="primary"
                  onClick={submitTeacherInformation}
                  size="sm"
                >
                  Submit Personal Information
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>

        <Modal
          className="modal-dialog-top"
          size="lg"
          isOpen={noticeModal}
          // toggle={() => showCompleteModal()}
        >
          <ModalHeader>Notice</ModalHeader>
          <ModalBody>Please complete your personal information</ModalBody>
          <ModalFooter>
            <Row className="align-items-end">
              <Col className="text-right" lg="12">
                <Button
                  color="primary"
                  onClick={() => showCompleteModal()}
                  size="sm"
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default TeacherIndex;
