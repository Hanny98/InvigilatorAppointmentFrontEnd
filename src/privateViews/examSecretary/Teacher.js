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
import MuiTable from "../../privateViews/widgets/muiTable.js";

const Teacher = () => {
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

  const initialFilterState = {
    name: "",
    phoneNumber: "",
  };
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);

  const [currentTeacher, setCurrentTeacher] = useState(initialState);
  const [teacherList, setTeacherList] = useState([]);

  //filterState
  const [searchValue, setSearchValue] = useState(initialFilterState);

  //muitable function
  const [changeTablePageFunction, setChangeTablePageFunction] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(false);

  const [viewModal, setViewModal] = useState(false);

  const [isView, setIsView] = useState(false);

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

  const showViewModal = (_id) => {
    setViewModal(!viewModal);
    setIsView(true);

    if (_id !== undefined && _id !== null && _id !== "") {
      handleModalData(_id);
    }
  };

  const showUpdateModal = (_id) => {
    setViewModal(!viewModal);
    setIsView(false);
    if (_id !== undefined && _id !== null && _id !== "") {
      handleModalData(_id);
    }
  };

  const handleModalData = (_id) => {
    const selectedTeacher = teacherList.filter(
      (teacher) => teacher._id === _id
    );
    setCurrentTeacher(selectedTeacher[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentTeacher({ ...currentTeacher, [name]: value });
  };

  const handleSearch = async () => {
    dispatch(showLoading());
    changeTablePageFunction(0);
    await searchTeacher(0, 100);
    dispatch(hideLoading());
  };

  const searchTeacher = (skip, limit) => {
    return fetchTeacher(searchValue, skip, limit);
  };

  const updateTeacherInformation = () => {
    if (
      currentTeacher.teacherName === "" ||
      currentTeacher.teacherName === null ||
      currentTeacher.teacherName === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Name",
      });
      return false;
    }
    if (
      currentTeacher.icNumber === "" ||
      currentTeacher.icNumber === null ||
      currentTeacher.icNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid IC Number",
      });
      return false;
    }
    if (
      currentTeacher.teacherSex === "" ||
      currentTeacher.teacherSex === null ||
      currentTeacher.teacherSex === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Gender",
      });
      return false;
    }
    if (
      currentTeacher.race === "" ||
      currentTeacher.race === null ||
      currentTeacher.race === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Race",
      });
      return false;
    }
    if (
      currentTeacher.teacherEmailAddress === "" ||
      currentTeacher.teacherEmailAddress === null ||
      currentTeacher.teacherEmailAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Email Address",
      });
      return false;
    }
    if (
      currentTeacher.teacherPhoneNumber === "" ||
      currentTeacher.teacherPhoneNumber === null ||
      currentTeacher.teacherPhoneNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Phone Number",
      });
      return false;
    }
    if (
      currentTeacher.homeAddress === "" ||
      currentTeacher.homeAddress === null ||
      currentTeacher.homeAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Home Address",
      });
      return false;
    }
    if (
      currentTeacher.postcode === "" ||
      currentTeacher.postcode === null ||
      currentTeacher.postcode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Postcode",
      });
      return false;
    }
    if (
      currentTeacher.city === "" ||
      currentTeacher.city === null ||
      currentTeacher.city === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid City",
      });
      return false;
    }
    if (
      currentTeacher.teacherPositionCode === "" ||
      currentTeacher.teacherPositionCode === null ||
      currentTeacher.teacherPositionCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Position Code",
      });
      return false;
    }
    if (
      currentTeacher.teacherTypeStaffCode === "" ||
      currentTeacher.teacherTypeStaffCode === null ||
      currentTeacher.teacherTypeStaffCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Teacher Type Staff Code",
      });
      return false;
    }
    if (
      currentTeacher.salaryGrade === "" ||
      currentTeacher.salaryGrade === null ||
      currentTeacher.salaryGrade === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary Grade",
      });
      return false;
    }
    if (
      currentTeacher.salary === "" ||
      currentTeacher.salary === null ||
      currentTeacher.salary === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Salary",
      });
      return false;
    }
    if (
      currentTeacher.jpnFileCode === "" ||
      currentTeacher.jpnFileCode === null ||
      currentTeacher.jpnFileCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid JPN File Code",
      });
      return false;
    }

    dispatch(showLoading());
    return TeacherService.updateTeacher(currentTeacher)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setViewModal(false);
          success({
            title: "Success",
            text: "Update Successfully",
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

  const fetchTeacher = (searchValue, skip = 0, limit = 5) => {
    dispatch(showLoading());
    return TeacherService.getTeacher(
      userProfile.school,
      searchValue,
      skip,
      limit
    )
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          const teacherArray = [];
          result.teacherList.map((teacher) => {
            Object.assign(teacher.teacherData[0], {
              status: teacher.status,
            });
            teacherArray.push(teacher.teacherData[0]);
          });

          setTeacherList(teacherArray);
          setResultCount(result.teacherCount);
        }
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
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* <Container fluid> */}
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Filter</h3>
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
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="name"
                            // placeholder={school.schoolCode}
                            value={searchValue.name}
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phoneNumber"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="phoneNumber"
                            // placeholder={school.schoolName}
                            value={searchValue.phoneNumber}
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Row className="align-items-end">
                  {/* <div className="pl-lg-4"> */}
                  <Col className="text-right" lg="12">
                    <Button color="primary" onClick={handleSearch} size="sm">
                      Search
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
        {/* <Row className="Row"></Row> */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Teacher List</h3>
              </CardHeader>
              <CardBody>
                <MuiTable
                  setChangePage={(changePage) => {
                    setChangeTablePageFunction(changePage);
                  }}
                  parentCallback={searchTeacher}
                  data={teacherList}
                  totalCount={resultCount}
                  scrollIntoView={scrollIntoView}
                  columns={[
                    {
                      name: "teacherName",
                      label: "Name",
                    },
                    {
                      name: "icNumber",
                      label: "I.C. Number",
                    },
                    {
                      name: "teacherPhoneNumber",
                      label: "Phone Number",
                    },
                    {
                      name: "status", //profile not completed 0, profile completed 1, deactivated 2
                      label: "Status",
                      options: {
                        customBodyRender: (value) => {
                          if (value === 0) {
                            return <Badge color="default">Incomplete</Badge>;
                          }
                          if (value === 1) {
                            return <Badge color="success">Active</Badge>;
                          }
                          if (value === 2) {
                            return <Badge color="danger">Deactive</Badge>;
                          }
                        },
                      },
                    },
                    {
                      name: "_id",
                      label: "Actions",
                      options: {
                        customBodyRender: (value) => {
                          return (
                            <>
                              <Button
                                color="info"
                                onClick={() => showViewModal(value)}
                                size="sm"
                              >
                                View
                              </Button>
                              <Button
                                color="success"
                                onClick={() => showUpdateModal(value)}
                                size="sm"
                              >
                                Update
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
          size="lg"
          isOpen={viewModal}
          toggle={() => showViewModal()}
        >
          <ModalHeader>
            {isView ? `View Teacher` : `Update Teacher`}
          </ModalHeader>
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
                      placeholder={currentTeacher.teacherName}
                      value={currentTeacher.teacherName}
                      type="text"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.icNumber}
                      value={currentTeacher.icNumber}
                      type="text"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.teacherSex}
                      value={currentTeacher.teacherSex}
                      type="select"
                      onChange={handleUpdateChange}
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
                    <label className="form-control-label" htmlFor="input-race">
                      Race
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="race"
                      placeholder={currentTeacher.race}
                      value={currentTeacher.race}
                      type="text"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.teacherEmailAddress}
                      value={currentTeacher.teacherEmailAddress}
                      type="text"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.teacherPhoneNumber}
                      value={currentTeacher.teacherPhoneNumber}
                      type="text"
                      onChange={handleUpdateChange}
                      disabled={isView}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
                      placeholder={currentTeacher.homeAddress}
                      value={currentTeacher.homeAddress}
                      type="text"
                      onChange={handleUpdateChange}
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
                      htmlFor="input-postcode"
                    >
                      Postcode
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="postcode"
                      placeholder={currentTeacher.postcode}
                      value={currentTeacher.postcode}
                      type="text"
                      onChange={handleUpdateChange}
                      disabled={isView}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      City
                    </label>
                    <Input
                      className="form-control-alternative"
                      name="city"
                      placeholder={currentTeacher.city}
                      value={currentTeacher.city}
                      type="text"
                      onChange={handleUpdateChange}
                      disabled={isView}
                    />
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
                      placeholder={currentTeacher.teacherPositionCode}
                      value={currentTeacher.teacherPositionCode}
                      type="select"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.teacherTypeStaffCode}
                      value={currentTeacher.teacherTypeStaffCode}
                      type="select"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.salaryGrade}
                      value={currentTeacher.salaryGrade}
                      type="select"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.salary}
                      value={currentTeacher.salary}
                      type="number"
                      onChange={handleUpdateChange}
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
                      placeholder={currentTeacher.jpnFileCode}
                      value={currentTeacher.jpnFileCode}
                      type="text"
                      onChange={handleUpdateChange}
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
            </Form>
          </ModalBody>
          <ModalFooter>
            <Row className="align-items-end">
              {/* <div className="pl-lg-4"> */}
              <Col className="text-right" lg="12">
                {isView ? (
                  <>
                    <Button
                      color="primary"
                      onClick={() => showViewModal()}
                      size="sm"
                    >
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => setIsView(false)}
                      size="sm"
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      onClick={() => showUpdateModal()}
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onClick={updateTeacherInformation}
                      size="sm"
                    >
                      Update Teacher Information
                    </Button>
                  </>
                )}
              </Col>
              {/* </div> */}
            </Row>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default Teacher;
