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
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../actions/auth";

const UserLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    login: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const { loggedIn, token } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const fireSweetAlert = (alert) => {
    Swal.fire({
      title: alert.title,
      text: alert.text,
      icon: alert.icon,
    });
  };

  const handleSubmit = () => {
    if (user.login === null || user.login === undefined || user.login === "") {
      fireSweetAlert({
        title: "Warning",
        text: "LoginID is required",
        icon: "warning",
      });
      return;
    }
    if (
      user.password === null ||
      user.password === undefined ||
      user.password === ""
    ) {
      fireSweetAlert({
        title: "Warning",
        text: "Password is required",
        icon: "warning",
      });

      return;
    }
    dispatch(login(user.login, user.password))
      .then(() => {})
      .catch((err) => {
        fireSweetAlert({
          title: "Warning",
          text: "LoginID / Password Incorrect. Please Enter Again",
          icon: "warning",
        });
      });
  };

  if (loggedIn) {
    fireSweetAlert({
      title: "Succes",
      text: "Welcome User",
      icon: "success",
    });
    return <Redirect to="/admin/index"></Redirect>;
  }

  // if (!loggedIn) {
  //   return <Redirect to="/auth/userLogin"></Redirect>;
  // }

  // const testing = () => {
  //   history.go(0);
  // };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            {/* insert one icon */}
            <Row className="justify-content-center">
              <Col lg="3">
                <img
                  style={{
                    "border-radius": "50%",
                  }}
                  height={100}
                  width={100}
                  alt="..."
                  src={require("../assets/img/icons/common/PEIA.jpg").default}
                />
                {/* <h1 className="text-white">Welcome!</h1> */}
              </Col>
              <Col>
                <b>
                  Inivigilator Appointment Based On Exam Centre For Malaysia
                  Public Exam Invigilator Assignment System
                </b>
              </Col>
            </Row>
            {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/github.svg").default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/google.svg").default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="login"
                    name="login"
                    placeholder="Login"
                    type="text"
                    onChange={handleChange}
                    // autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    // autoComplete="new-password"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot what password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default UserLogin;
