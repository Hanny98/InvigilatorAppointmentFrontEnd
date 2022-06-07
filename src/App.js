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
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Aux from "./hoc/Aux_/index.js";
import { history } from "./helpers/history.js";
import Loadable from "react-loadable";
import Loader from "./layouts/Loader";

/* 
What Loadable() does is that it load our About component when someone hits that route /about
( when the component is mounted in the DOM ) . It gives us an ability to display any message 
( e.g. loading message ) until the Component is being loaded by returning that information inside loading(). 
And loader takes a function where we define which component we want to import.
*/

const AdminLayout = Loadable({
  loader: () => import("layouts/Admin.js"),
  loading: Loader,
});

const AuthLayout = Loadable({
  loader: () => import("layouts/Auth.js"),
  loading: Loader,
});

const App = () => {
  return (
    <Aux>
      {/* <Router history={history}> */}
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/userLogin" />
          </Switch>
        </Suspense>
      </BrowserRouter>
      {/* </Router> */}
    </Aux>
  );
};
export default App;
