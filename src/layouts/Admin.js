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
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes, {
  secretaryRoutes,
  principalRoutes,
  teacherRoutes,
} from "routes.js";
import { useSelector } from "react-redux";
import LoadingScreen from "react-loading-screen";
import { adminRoutes } from "routes";

const Admin = (props) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.userProfile);
  const { showLoading, loadingText } = useSelector((state) => state.store);
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    if (loggedIn) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
    if (!loggedIn) {
      return <Redirect to="/auth/userLogin"></Redirect>;
    }
  }, [location, loggedIn]);

  const getRoutes = () => {
    if (loggedIn) {
      if (userProfile.userGroup === "Exam Secretary") {
        return secretaryRoutes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      }
      if (userProfile.userGroup === "School Principal") {
        return principalRoutes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      }
      if (userProfile.userGroup === "Teacher") {
        return teacherRoutes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      }
      if (userProfile.userGroup === "Admin") {
        return adminRoutes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      } else {
        return routes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      }
    }
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <LoadingScreen
        loading={showLoading}
        bgColor="#9ee5f8"
        spinnerColor="#f1f1f1"
        textColor="#fffff"
        text={loadingText}
      >
        <Sidebar
          {...props}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/argon-react.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />
          <Switch>
            {getRoutes()}
            <Redirect from="*" to="/auth/userLogin" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </LoadingScreen>
    </>
  );
};

export default Admin;
