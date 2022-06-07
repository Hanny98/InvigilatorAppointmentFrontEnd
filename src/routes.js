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
import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import UserLogin from "publicViews/Login.js";

//Exam secretary routes
import SecretaryIndex from "privateViews/examSecretary/Index";
import School from "privateViews/examSecretary/School";
import Teacher from "privateViews/examSecretary/Teacher";
import AssignmentTask from "privateViews/examSecretary/AssignmentTask";
import Report from "privateViews/examSecretary/Report";

//Admin routes
import AdminIndex from "privateViews/admin/Index";
import Users from "privateViews/admin/Users";

//Teacher routes
import TeacherIndex from "privateViews/teacher/Index";
import TeacherProfile from "privateViews/teacher/Profile";

//Principal routes
import PrincipalIndex from "privateViews/schoolPrincipal/Index";
import ApproveAssignmentTask from "privateViews/schoolPrincipal/AssignmentTask";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
  {
    path: "/userLogin",
    name: "UserLogin",
    icon: "ni ni-circle-08 text-pink",
    component: UserLogin,
    layout: "/auth",
  },
];

export const secretaryRoutes = [
  {
    path: "/index",
    name: "Dashbaord",
    icon: "ni ni-tv-2 text-primary",
    component: SecretaryIndex,
    layout: "/admin",
  },
  {
    path: "/school",
    name: "School",
    icon: "fa fa-graduation-cap text-blue",
    component: School,
    layout: "/admin",
  },
  {
    path: "/teachers",
    name: "Teacher",
    icon: "fa fa-users text-yellow",
    component: Teacher,
    layout: "/admin",
  },
  {
    path: "/assignmentTasks",
    name: "Assignment Task",
    icon: "fa fa-folder text-red",
    component: AssignmentTask,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Report",
    icon: "fa fa-file text-purple",
    component: Report,
    layout: "/admin",
  },
];

export const principalRoutes = [
  {
    path: "/index",
    name: "Dashbaord",
    icon: "ni ni-tv-2 text-primary",
    component: PrincipalIndex,
    layout: "/admin",
  },
  {
    path: "/assignmentTask",
    name: "AssignmentTask",
    icon: "fa fa-folder text-red",
    component: ApproveAssignmentTask,
    layout: "/admin",
  },
];

export const adminRoutes = [
  // {
  //   path: "/index",
  //   name: "Dashbaord",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: AdminIndex,
  //   layout: "/admin",
  // },
  {
    path: "/index",
    name: "Users",
    icon: "fa fa-users text-orange",
    component: Users,
    layout: "/admin",
  },
];

export const teacherRoutes = [
  {
    path: "/index",
    name: "Dashbaord",
    icon: "ni ni-tv-2 text-primary",
    component: TeacherIndex,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "fa fa-user text-default",
    component: TeacherProfile,
    layout: "/admin",
  },
];

export default routes;
