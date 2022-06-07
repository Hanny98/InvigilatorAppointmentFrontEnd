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
import UserService from "services/user.service";
import SchoolService from "services/school.service.js";
import { showLoading, hideLoading } from "actions/store";
import MuiTable from "../../privateViews/widgets/muiTable.js";

const Users = () => {
  const initialState = {};

  const initialFilterState = {
    login: "",
    district: "",
    schoolName: "", //need to get schoolList
    userGroup: "",
    status: "",
  };
  const newUserInitialState = {
    login: "",
    password: "",
    district: "",
    school: "", //need to get schoolList
    userGroup: "",
    status: "",
    newPassword: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { userProfile } = useSelector((state) => state.userProfile);

  const [newUser, setNewUser] = useState(newUserInitialState);
  const [currentUser, setCurrentUser] = useState(initialState);
  const [userList, setUserList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);

  //filterState
  const [searchValue, setSearchValue] = useState(initialFilterState);

  //muitable function
  const [changeTablePageFunction, setChangeTablePageFunction] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [scrollIntoView, setScrollIntoView] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [isView, setIsView] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const statusOptions = [
    {
      value: "",
      labe: "",
    },
    {
      value: 0,
      label: "Incomplete",
    },
    {
      value: 1,
      label: "Active",
    },
    {
      value: 2,
      label: "Deactivated",
    },
  ];

  const userGroupOptions = [
    {
      value: "",
      label: "",
    },
    // {
    //   value: "Exam Secretary",
    //   label: "Exam Secretary",
    // },
    {
      value: "School Principal",
      label: "School Principal",
    },
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Teacher",
      label: "Teacher",
    },
  ];

  const distrcitOptions = [
    {
      value: "",
      label: "",
    },
    {
      value: "Segamat",
      label: "Segamat",
    },
    {
      value: "Muar",
      label: "Muar",
    },
    {
      value: "Batu Pahat",
      label: "Batu Pahat",
    },
    {
      value: "Kluang",
      label: "Kluang",
    },
    {
      value: "Pontian",
      label: "Pontian",
    },
    {
      value: "Kulai Jaya",
      label: "Kulai Jaya",
    },
    {
      value: "Kota Tinggi",
      label: "Kota Tinggi",
    },
    {
      value: "Johor Bahru",
      label: "Johor Bahru",
    },
    {
      value: "Mersing",
      label: "Mersing",
    },
    {
      value: "Tangkak",
      label: "Tangkak",
    },
  ];

  const showViewModal = (icNumber) => {
    setViewModal(!viewModal);
    setIsView(true);

    if (icNumber !== undefined && icNumber !== null && icNumber !== "") {
      handleModalData(icNumber);
    }
  };

  const showUpdateModal = (icNumber) => {
    setViewModal(!viewModal);
    setIsView(false);
    if (icNumber !== undefined && icNumber !== null && icNumber !== "") {
      handleModalData(icNumber);
    }
  };

  const showCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleModalData = (_id) => {
    const selectedUser = userList.filter((user) => user._id === _id);
    setCurrentUser(selectedUser[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });

    if (name === "userGroup" && value !== "Admin") {
      setIsAdmin(false);
    }
    if (name === "userGroup" && value === "Admin") {
      setIsAdmin(true);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "userGroup" && value !== "Admin") {
      setIsAdmin(false);
    }
    if (name === "userGroup" && value === "Admin") {
      setIsAdmin(true);
    }
  };

  const handleSearch = async () => {
    dispatch(showLoading());
    changeTablePageFunction(0);
    // await searchUser(0, 100);
    await searchUser(0, 5);
    dispatch(hideLoading());
  };

  const searchUser = (skip, limit) => {
    return fetchUsers(searchValue, skip, limit);
  };

  const updateUser = () => {
    if (
      currentUser.login === "" ||
      currentUser.login === null ||
      currentUser.login === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Username",
      });
      return false;
    }

    if (
      currentUser.userGroup === "" ||
      currentUser.userGroup === null ||
      currentUser.userGroup === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid User Group",
      });
      return false;
    }
    if (currentUser.userGroup !== "Admin") {
      // if (
      //   currentUser.district === "" ||
      //   currentUser.district === null ||
      //   currentUser.district === undefined
      // ) {
      //   error({
      //     title: "Error",
      //     text: "Invalid District",
      //   });
      //   return false;
      // }

      if (
        currentUser.schoolName === "" ||
        currentUser.schoolName === null ||
        currentUser.schoolName === undefined
      ) {
        error({
          title: "Error",
          text: "Invalid School",
        });
        return false;
      }
    }

    if (
      currentUser.status === "" ||
      currentUser.status === null ||
      currentUser.status === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Account Status",
      });
      return false;
    }

    dispatch(showLoading());
    return UserService.updateUser(currentUser)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          // setViewModal(false);
          success({
            title: "Success",
            text: result.msg,
          });
          // setChangeTablePageFunction(0);
          // fetchUsers();
          history.go(0);
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

  const registerUser = () => {
    if (
      newUser.login === "" ||
      newUser.login === null ||
      newUser.login === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Username",
      });
      return false;
    }
    if (
      newUser.password === "" ||
      newUser.password === null ||
      newUser.password === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Password",
      });
      return false;
    }
    // if (
    //   newUser.district === "" ||
    //   newUser.district === null ||
    //   newUser.district === undefined
    // ) {
    //   error({
    //     title: "Error",
    //     text: "Invalid District",
    //   });
    //   return false;
    // }
    // if (
    //   newUser.school === "" ||
    //   newUser.school === null ||
    //   newUser.school === undefined
    // ) {
    //   error({
    //     title: "Error",
    //     text: "Invalid School",
    //   });
    //   return false;
    // }
    if (
      newUser.userGroup === "" ||
      newUser.userGroup === null ||
      newUser.userGroup === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid User Group",
      });
      return false;
    }
    dispatch(showLoading());
    return UserService.registerUser(newUser)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          // setCreateModal(false);
          // setNewUser(null);
          success({
            title: "Success",
            text: result.msg,
          });
          history.go(0);
          // fetchUsers();
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

  const fetchSchoolList = () => {
    dispatch(showLoading());
    return SchoolService.getSchoolList()
      .then((result) => {
        if (result.status) {
          const schoolOptions = [];
          schoolOptions.push({
            value: "",
            label: "",
          });
          result.schoolList.map((school) => {
            schoolOptions.push({
              value: school.schoolName,
              label: school.schoolName,
            });
          });
          setSchoolList(schoolOptions);
          // setSchoolList(result.schoolList);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error);
      });
  };

  const fetchUsers = (searchValue, skip, limit = 5) => {
    dispatch(showLoading());
    return UserService.getUsers(searchValue, skip, limit)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setUserList(result.userList);
          setResultCount(result.userCount);

          // setResultCount(result.teacherCount);
        }
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([fetchUsers(), fetchSchoolList()])
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
                            htmlFor="input-login"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="login"
                            // placeholder={school.schoolCode}
                            value={searchValue.login}
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-userGroup"
                          >
                            userGroup
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="userGroup"
                            value={searchValue.userGroup}
                            type="select"
                            onChange={handleChange}
                          >
                            {userGroupOptions?.map((userGroup, index) => {
                              return (
                                <option
                                  value={userGroup.value}
                                  key={`userGroup_ ${userGroup.value}`}
                                >
                                  {userGroup.label}
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
                            htmlFor="input-schoolName"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolName"
                            // placeholder={school.schoolCode}
                            value={searchValue.schoolName}
                            type="select"
                            onChange={handleChange}
                          >
                            {schoolList?.map((school, index) => {
                              return (
                                <option
                                  value={school.value}
                                  key={`school_ ${school.value}`}
                                >
                                  {school.label}
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
                            htmlFor="input-status"
                          >
                            Status
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="status"
                            value={searchValue.status}
                            type="select"
                            onChange={handleChange}
                          >
                            {statusOptions?.map((status, index) => {
                              return (
                                <option
                                  value={status.value}
                                  key={`status_ ${status.value}`}
                                >
                                  {status.label}
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
                <Row>
                  <Col lg="2">
                    <h3 className="mb-0">User List</h3>
                  </Col>
                  <Col lg="10">
                    <Button
                      color="default"
                      className="float-right"
                      size="sm"
                      onClick={showCreateModal}
                    >
                      Register new user
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <MuiTable
                  setChangePage={(changePage) => {
                    setChangeTablePageFunction(changePage);
                  }}
                  parentCallback={searchUser}
                  data={userList}
                  totalCount={resultCount}
                  scrollIntoView={scrollIntoView}
                  columns={[
                    {
                      name: "login",
                      label: "Username",
                    },
                    {
                      name: "schoolName",
                      label: "School",
                    },
                    {
                      name: "userGroup",
                      label: "User Group",
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
        {/* Registration Form */}
        <Modal
          className="modal-dialog-top"
          size="lg"
          isOpen={createModal}
          toggle={() => showCreateModal()}
        >
          <ModalHeader>Register New User</ModalHeader>
          <ModalBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-login"
                      >
                        Username
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="login"
                        placeholder={newUser.login}
                        value={newUser.login}
                        type="text"
                        onChange={handleRegisterChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Password
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="password"
                        placeholder={newUser.password}
                        value={newUser.password}
                        type="password"
                        onChange={handleRegisterChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-userGroup"
                      >
                        User Group
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="userGroup"
                        placeholder={newUser.userGroup}
                        value={newUser.userGroup}
                        type="select"
                        onChange={handleRegisterChange}
                      >
                        {userGroupOptions.map((userGroup, index) => {
                          return (
                            <option
                              value={userGroup.value}
                              key={`userGroup_ ${userGroup.value}`}
                            >
                              {userGroup.label}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* <Col lg="6">
                    <FormGroup>
                      {isAdmin ? (
                        <></>
                      ) : (
                        <>
                          <label
                            className="form-control-label"
                            htmlFor="input-district"
                          >
                            District
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="district"
                            placeholder={newUser.district}
                            value={newUser.district}
                            type="select"
                            onChange={handleRegisterChange}
                          >
                            {distrcitOptions.map((district, index) => {
                              return (
                                <option
                                  value={district.value}
                                  key={`district_ ${district.value}`}
                                >
                                  {district.label}
                                </option>
                              );
                            })}
                          </Input>
                        </>
                      )}
                    </FormGroup>
                  </Col> */}
                  <Col lg="6">
                    {isAdmin ? (
                      <></>
                    ) : (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="school"
                            placeholder={newUser.school}
                            value={newUser.school}
                            type="select"
                            onChange={handleRegisterChange}
                          >
                            {schoolList.map((school, index) => {
                              return (
                                <option
                                  value={school.value}
                                  key={`school_ ${school.value}`}
                                >
                                  {school.label}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </>
                    )}
                  </Col>
                </Row>
                {/* <Row>
                  <Col lg="6">
                    {isAdmin ? (
                      <></>
                    ) : (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="school"
                            placeholder={newUser.school}
                            value={newUser.school}
                            type="select"
                            onChange={handleRegisterChange}
                          >
                            {schoolList.map((school, index) => {
                              return (
                                <option
                                  value={school.value}
                                  key={`school_ ${school.value}`}
                                >
                                  {school.label}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </>
                    )}
                  </Col>
                </Row> */}
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={showCreateModal} size="sm">
              Close
            </Button>
            <Button color="primary" onClick={registerUser} size="sm">
              Register User
            </Button>
          </ModalFooter>
        </Modal>
        {/* View and Update Form */}
        <Modal
          className="modal-dialog-top"
          size="lg"
          isOpen={viewModal}
          toggle={() => showViewModal()}
        >
          <ModalHeader>{isView ? `View User` : `Update User`}</ModalHeader>
          <ModalBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-login"
                      >
                        Username
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="login"
                        placeholder={currentUser.login}
                        value={currentUser.login}
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
                        htmlFor="input-password"
                      >
                        Password
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="newPassword"
                        placeholder="Enter new password here"
                        value={currentUser.newPassword}
                        type="password"
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
                        htmlFor="input-userGroup"
                      >
                        User Group
                      </label>
                      <Input
                        className="form-control-alternative"
                        name="userGroup"
                        placeholder={currentUser.userGroup}
                        value={currentUser.userGroup}
                        type="select"
                        onChange={handleUpdateChange}
                        disabled={isView}
                      >
                        {userGroupOptions.map((userGroup, index) => {
                          return (
                            <option
                              value={userGroup.value}
                              key={`userGroup_ ${userGroup.value}`}
                            >
                              {userGroup.label}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      {isAdmin ? (
                        <></>
                      ) : (
                        <>
                          <label
                            className="form-control-label"
                            htmlFor="input-district"
                          >
                            District
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="district"
                            placeholder={currentUser.district}
                            value={currentUser.district}
                            type="select"
                            onChange={handleUpdateChange}
                            disabled={isView}
                          >
                            {distrcitOptions.map((district, index) => {
                              return (
                                <option
                                  value={district.value}
                                  key={`district_ ${district.value}`}
                                >
                                  {district.label}
                                </option>
                              );
                            })}
                          </Input>
                        </>
                      )}
                    </FormGroup>
                  </Col> */}
                  <Col md="6">
                    {isAdmin ? (
                      <></>
                    ) : (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolName"
                            placeholder={currentUser.schoolName}
                            value={currentUser.schoolName}
                            type="select"
                            onChange={handleUpdateChange}
                            disabled={isView}
                          >
                            {schoolList.map((school, index) => {
                              return (
                                <option
                                  value={school.value}
                                  key={`school_ ${school.value}`}
                                >
                                  {school.label}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </>
                    )}
                  </Col>
                </Row>
                {/* <Row>
                  <Col md="6">
                    {isAdmin ? (
                      <></>
                    ) : (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolName"
                            placeholder={currentUser.schoolName}
                            value={currentUser.schoolName}
                            type="select"
                            onChange={handleUpdateChange}
                            disabled={isView}
                          >
                            {schoolList.map((school, index) => {
                              return (
                                <option
                                  value={school.value}
                                  key={`school_ ${school.value}`}
                                >
                                  {school.label}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </>
                    )}
                  </Col>
                </Row> */}
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-schoolCategory"
                      >
                        Account Status
                      </label>
                    </FormGroup>
                    {/* <div className="custom-control custom-radio mb-3">
                      <input
                        className="custom-control-input"
                        id="customRadio5"
                        name="status"
                        type="radio"
                        value="10"
                        checked={
                          currentUser.status === 0 || currentUser.status === "0"
                        }
                        onChange={handleUpdateChange}
                        disabled={isView}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio5"
                      >
                        Incomplete [Teacher should complete his/her personal Information]
                      </label>
                    </div> */}
                    <div className="custom-control custom-radio mb-3">
                      <input
                        className="custom-control-input"
                        id="customRadio5"
                        name="status"
                        type="radio"
                        value="1"
                        checked={
                          currentUser.status === 1 ||
                          currentUser.status === "1" ||
                          currentUser.status === 0 ||
                          currentUser.status === "0"
                        }
                        onChange={handleUpdateChange}
                        disabled={isView}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio5"
                      >
                        Activate
                      </label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                      <input
                        className="custom-control-input"
                        id="customRadio6"
                        name="status"
                        type="radio"
                        value="2"
                        checked={
                          currentUser.status === 2 || currentUser.status === "2"
                        }
                        onChange={handleUpdateChange}
                        disabled={isView}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio6"
                      >
                        Deactivate
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>
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
                    <Button color="primary" onClick={updateUser} size="sm">
                      Update User Information
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

export default Users;
