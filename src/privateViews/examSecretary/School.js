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
import SchoolService from "../../services/school.service";
import { showLoading, hideLoading } from "actions/store";

const School = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);

  const initialState = {
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
  const [school, setSchool] = useState(initialState);
  const [originalSchool, setOriginalSchool] = useState();
  const [isView, setIsView] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool({ ...school, [name]: value });
  };

  const handleShowUpdateForm = () => {
    setOriginalSchool({ ...school });
    setIsView(false);
  };

  const handleClose = () => {
    setSchool({ ...originalSchool });
    setIsView(true);
  };

  const fetchSchool = () => {
    dispatch(showLoading());
    setIsView(true);
    return SchoolService.getSchool(userProfile.school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setSchool(result.school[0]);
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

  const handleUpdate = () => {
    if (
      school.schoolName === "" ||
      school.schoolName === null ||
      school.schoolName === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid School Name",
      });
      return false;
    }
    if (
      school.district === "" ||
      school.district === null ||
      school.district === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid District",
      });
      return false;
    }
    if (
      school.schoolAddress === "" ||
      school.schoolAddress === null ||
      school.schoolAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid School Address",
      });
      return false;
    }
    if (
      school.postcode === "" ||
      school.postcode === null ||
      school.postcode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Postcode",
      });
      return false;
    }
    if (
      school.city === "" ||
      school.city === null ||
      school.city === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid City",
      });
      return false;
    }
    if (
      school.stateCode === "" ||
      school.stateCode === null ||
      school.stateCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Code State",
      });
      return false;
    }
    if (
      school.areaCode === "" ||
      school.areaCode === null ||
      school.areaCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Code Area",
      });
      return false;
    }
    if (
      school.stateCode === "" ||
      school.stateCode === null ||
      school.stateCode === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Code State",
      });
      return false;
    }
    if (
      school.schoolPhoneNumber === "" ||
      school.schoolPhoneNumber === null ||
      school.schoolPhoneNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Phone Number",
      });
      return false;
    }
    if (
      school.taxNumber === "" ||
      school.taxNumber === null ||
      school.taxNumber === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid Tax Number",
      });
      return false;
    }
    if (
      school.schoolEmailAddress === "" ||
      school.schoolEmailAddress === null ||
      school.schoolEmailAddress === undefined
    ) {
      error({
        title: "Error",
        text: "Invalid School Email Address",
      });
      return false;
    }
    dispatch(showLoading());
    return SchoolService.updateSchool(school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          success({
            title: "Success",
            text: "Update Successfully",
          });
          fetchSchool();
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
    Promise.all([fetchSchool()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="order-xl-1" xl="8"> */}
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">School Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {isView ? (
                      <Button
                        color="primary"
                        onClick={handleShowUpdateForm}
                        size="sm"
                      >
                        Update School Information
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
                    School Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-schoolCode"
                          >
                            School Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolCode"
                            // placeholder={school.schoolCode}
                            value={school.schoolCode}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-schoolName"
                          >
                            School Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolName"
                            // placeholder={school.schoolName}
                            value={school.schoolName}
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
                            htmlFor="input-district"
                          >
                            District
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="district"
                            // placeholder={school.district}
                            value={school.district}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-schoolAddress"
                          >
                            School Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolAddress"
                            // placeholder={school.schoolAddress}
                            value={school.schoolAddress}
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
                            htmlFor="input-postcode"
                          >
                            PostCode
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="postcode"
                            // placeholder={school.postcode}
                            value={school.postcode}
                            type="number"
                            onChange={handleChange}
                            disabled={isView}
                          />
                        </FormGroup>
                      </Col>
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
                            // placeholder={school.city}
                            value={school.city}
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
                            htmlFor="input-codeState"
                          >
                            Code State
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="stateCode"
                            // placeholder={school.stateCode}
                            value={school.stateCode}
                            type="number"
                            onChange={handleChange}
                            disabled={isView}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-codeArea"
                          >
                            Code Area
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="areaCode"
                            // placeholder={school.areaCode}
                            value={school.areaCode}
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
                            htmlFor="input-schoolPhoneNumber"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolPhoneNumber"
                            // placeholder={school.schoolPhoneNumber}
                            value={school.schoolPhoneNumber}
                            type="number"
                            onChange={handleChange}
                            disabled={isView}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-taxNumber"
                          >
                            Tax Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="taxNumber"
                            // placeholder={school.taxNumber}
                            value={school.taxNumber}
                            type="number"
                            onChange={handleChange}
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
                            htmlFor="input-schoolEmailAddress"
                          >
                            School Email Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="schoolEmailAddress"
                            // placeholder={school.schoolEmailAddress}
                            value={school.schoolEmailAddress}
                            type="email"
                            onChange={handleChange}
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
                            htmlFor="input-schoolCategory"
                          >
                            School Category
                          </label>
                        </FormGroup>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio5"
                            name="typeOfSchool"
                            type="radio"
                            value="Public School"
                            checked={school.typeOfSchool === "Public School"}
                            onChange={handleChange}
                            disabled={isView}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio5"
                          >
                            Public School
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio6"
                            name="typeOfSchool"
                            type="radio"
                            value="International School"
                            checked={
                              school.typeOfSchool === "International School"
                            }
                            onChange={handleChange}
                            disabled={isView}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio6"
                          >
                            International School
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio7"
                            name="typeOfSchool"
                            type="radio"
                            value="Private School"
                            checked={school.typeOfSchool === "Private School"}
                            onChange={handleChange}
                            disabled={isView}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio7"
                          >
                            Private School
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio8"
                            name="typeOfSchool"
                            type="radio"
                            value="Vernacular School"
                            checked={
                              school.typeOfSchool === "Vernacular School"
                            }
                            onChange={handleChange}
                            disabled={isView}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio8"
                          >
                            Vernacular School
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-codeDun"
                          >
                            codeDun
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="codeDun"
                            // placeholder={school.codeDun}
                            value={school.codeDun}
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
                            htmlFor="input-codeParlimen"
                          >
                            Code Parlimen
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="codeParlimen"
                            // placeholder={school.codeParlimen}
                            value={school.codeParlimen}
                            type="text"
                            onChange={handleChange}
                            disabled={isView}
                          />
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

export default School;
