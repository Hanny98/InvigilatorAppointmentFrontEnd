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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { error, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

// core components
import Header from "components/Headers/Header.js";
import TeacherService from "../../services/teacher.service";
import { showLoading, hideLoading } from "actions/store";

const TeacherProfile = () => {
  const [isView, setIsView] = useState(true);

  const handleShowUpdateForm = () => {
    setOriginalTeacher({ ...teacher });
    setIsView(false);
  };

  const handleClose = () => {
    setTeacher({ ...originalTeacher });
    setIsView(true);
  };

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

  const dispatch = useDispatch();
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

  const [teacher, setTeacher] = useState(initialState);
  const [originalTeacher, setOriginalTeacher] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleUpdate = () => {
    if (
      teacher.teacherName === "" ||
      teacher.teacherName === null ||
      teacher.teacherName === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Name",
      });
      return false;
    }
    if (
      teacher.icNumber === "" ||
      teacher.icNumber === null ||
      teacher.icNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid IC Number",
      });
      return false;
    }
    if (
      teacher.teacherSex === "" ||
      teacher.teacherSex === null ||
      teacher.teacherSex === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Gender",
      });
      return false;
    }
    if (
      teacher.race === "" ||
      teacher.race === null ||
      teacher.race === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Race",
      });
      return false;
    }
    if (
      teacher.teacherEmailAddress === "" ||
      teacher.teacherEmailAddress === null ||
      teacher.teacherEmailAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Email Address",
      });
      return false;
    }
    if (
      teacher.teacherPhoneNumber === "" ||
      teacher.teacherPhoneNumber === null ||
      teacher.teacherPhoneNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Phone Number",
      });
      return false;
    }
    if (
      teacher.homeAddress === "" ||
      teacher.homeAddress === null ||
      teacher.homeAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Home Address",
      });
      return false;
    }
    if (
      teacher.postcode === "" ||
      teacher.postcode === null ||
      teacher.postcode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Postcode",
      });
      return false;
    }
    if (
      teacher.city === "" ||
      teacher.city === null ||
      teacher.city === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid City",
      });
      return false;
    }
    if (
      teacher.state === "" ||
      teacher.state === null ||
      teacher.state === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid State",
      });
      return false;
    }
    if (
      teacher.teacherPositionCode === "" ||
      teacher.teacherPositionCode === null ||
      teacher.teacherPositionCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Position Code",
      });
      return false;
    }
    if (
      teacher.teacherTypeStaffCode === "" ||
      teacher.teacherTypeStaffCode === null ||
      teacher.teacherTypeStaffCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Type Staff Code",
      });
      return false;
    }
    if (
      teacher.salaryGrade === "" ||
      teacher.salaryGrade === null ||
      teacher.salaryGrade === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary Grade",
      });
      return false;
    }
    if (
      teacher.salary === "" ||
      teacher.salary === null ||
      teacher.salary === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary",
      });
      return false;
    }
    if (
      teacher.jpnFileCode === "" ||
      teacher.jpnFileCode === null ||
      teacher.jpnFileCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid JPN File Code",
      });
      return false;
    }
    dispatch(showLoading());
    return TeacherService.updateTeacher(teacher)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          success({
            title: "Success",
            text: "Submitted successfully",
          });
          fetchTeacher();
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

  const fetchTeacher = () => {
    dispatch(showLoading());
    setIsView(true);
    return TeacherService.getOneTeacher(userProfile._id)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setTeacher(result.teacher[0]);
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
    Promise.all([fetchTeacher()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="order-xl-1" xl="8"> */}
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Personal Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {isView ? (
                      <Button
                        color="primary"
                        onClick={handleShowUpdateForm}
                        size="sm"
                      >
                        Update Personal Information
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-secondary">
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Personal Information
                  </h6>
                  <div className="pl-lg-4">
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
                            // placeholder={teacher.teacherName}
                            value={teacher.teacherName}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.icNumber}
                            value={teacher.icNumber}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            placeholder={teacher.teacherSex}
                            value={teacher.teacherSex}
                            type="select"
                            onChange={handleChange}
                            disabled={isView}
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
                          <label
                            className="form-control-label"
                            htmlFor="input-race"
                          >
                            Race
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="race"
                            // placeholder={teacher.race}
                            value={teacher.race}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.teacherEmailAddress}
                            value={teacher.teacherEmailAddress}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            placeholder={teacher.teacherPhoneNumber}
                            value={teacher.teacherPhoneNumber}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            placeholder={teacher.homeAddress}
                            value={teacher.homeAddress}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.postcode}
                            value={teacher.postcode}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="city"
                            // placeholder={teacher.city}
                            value={teacher.city}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-state"
                          >
                            State
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="state"
                            value={teacher.state}
                            type="select"
                            onChange={handleChange}
                            disabled={isView}
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
                            value={teacher.teacherPositionCode}
                            type="select"
                            onChange={handleChange}
                            disabled={isView}
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
                            placeholder={teacher.teacherTypeStaffCode}
                            value={teacher.teacherTypeStaffCode}
                            type="select"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.salaryGrade}
                            value={teacher.salaryGrade}
                            type="select"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.salary}
                            value={teacher.salary}
                            type="number"
                            onChange={handleChange}
                            disabled={isView}
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
                            // placeholder={teacher.jpnFileCode}
                            value={teacher.jpnFileCode}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
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
                  </div>
                </Form>

                <Row className="align-items-end">
                  {/* <div className="pl-lg-4"> */}
                  <Col className="text-right" lg="12">
                    {isView ? (
                      <></>
                    ) : (
                      <>
                        <Button color="primary" onClick={handleClose} size="sm">
                          Cancel
                        </Button>

                        <Button
                          color="primary"
                          onClick={handleUpdate}
                          size="sm"
                        >
                          Update
                        </Button>
                      </>
                    )}
                  </Col>
                  {/* </div> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeacherProfile;
