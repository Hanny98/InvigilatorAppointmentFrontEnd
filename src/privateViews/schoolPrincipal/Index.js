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
import { Line, Bar, Doughnut } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

// core components

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { error, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

// core components
import Header from "components/Headers/Header.js";
import UserService from "../../services/user.service";
import AssignmentTaskService from "../../services/assignmentTask.service";
import { showLoading, hideLoading } from "actions/store";

const PrincipalIndex = (props) => {
  const [isDone, setIsDone] = useState(false);

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);

  const [userData, setUserData] = useState();
  const [chartArrayData, setChartArrayData] = useState([]);

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

  const fetchAssignmentTask = () => {
    dispatch(showLoading());
    return AssignmentTaskService.getAssignmentTasksCount(userProfile.school)
      .then((result) => {
        dispatch(hideLoading());
        if (result.status) {
          setChartArrayData(result.arr);

          setIsDone(true);

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

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([fetchAssignmentTask(), fetchCurrentSchoolTeacher()])
      .then(() => dispatch(hideLoading()))
      .catch(() => dispatch(hideLoading()));
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
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
          {isDone ? (
            chartArrayData.map((cd, index) => {
              return (
                <>
                  <Col xl="4">
                    <Card className="shadow">
                      <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                          <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Task Chart
                            </h6>
                            <h2 className="mb-0">
                              Assignment Tasks for Exam Center Code {cd.code}
                            </h2>
                          </div>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        {/* Chart */}
                        {userData ? (
                          <div className="chart">
                            <Doughnut
                              type="doughnut"
                              data={{
                                labels: ["Incomplete", "Pending"],
                                datasets: [
                                  {
                                    data: [...cd.count],
                                    backgroundColor: [
                                      "rgb(255, 99, 132)",
                                      "rgb(54, 162, 235)",
                                    ],

                                    hoverOffset: 4,
                                  },
                                ],
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </>
              );
            })
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
};

export default PrincipalIndex;
