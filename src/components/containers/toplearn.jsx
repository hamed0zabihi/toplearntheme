import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Archive from "../course/Archive";
import Course from "../course/Course";
import SingleCourse from "../course/SingleCourse";
import MainLayout from "../layouts/MainLayouts";
import Login from "../login/Login";
import Register from "../register/Register";
import { paginate } from "../common/paginate";
import decodeToken from "../common/decodeToken";
import { addUser, clearUser } from "../../actions/user";
import Logout from "../login/lougout";
import Profile from "../profile/Profile";
import NotFound from "../common/notfound";
import PrivateLayout from "../layouts/PrivateLaout";
import Dashboard from "../admin/Dashboard";
import { isEmpty } from "lodash";
import CourseTable from "../admin/CourseTable";
import AddNewCourse from "../admin/AddNewCourse";
import Search from "../course/Search";

// import jwt form "jsonwebtoken";

const Toplearn = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const coursess = Object.values(courses);
  // console.log(courses);
  // if api is jasonplaceholder
  const b = Object.values(courses);
  const indexCourses = paginate(courses, 1, 8);
  // console.log("indexCourses", indexCourses);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      const dateNow = Date.now() / 1000;
      // const expireTime = localStorage.getItem("expireTime");
      // const userName = localStorage.getItem("userName");
      // const user = { email: token, name: userName };
      // if (expireTime && userName) {
      //   if (expireTime < dateNow) {
      //     localStorage.removeItem("token");
      //     localStorage.removeItem("expireTime");
      //     localStorage.removeItem("userName");
      //   } else {
      //     console.log("user:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      //     dispatch(addUser(user));
      //     console.log("user:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      //   }
      // }

      if (decodedToken.payload.exp < dateNow) {
        localStorage.removeItem("token");
        dispatch(clearUser());
      } else dispatch(addUser(decodedToken.payload.user));
    }
  }, []);
  return (
    <Switch>
      <Route path={["/dashboard"]}>
        <PrivateLayout>
          <Route
            path="/dashboard/courses"
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <CourseTable courses={b} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            exact
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <Dashboard courses={courses} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </PrivateLayout>
      </Route>
      <Route path={["/"]}>
        <MainLayout>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/archive" component={Archive} />
            <Route path="/search/:searched" component={Search} />
            <Route path="/single/:id" component={SingleCourse} />
            <Route
              path="/"
              exact
              render={() => <Course coursess={indexCourses} />}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
};
export default Toplearn;
