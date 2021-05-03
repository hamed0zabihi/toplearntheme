import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Archive from "../course/Archive";
import Course from "../course/Course";
import SingleCourse from "../course/SingleCourse";
import MainLayout from "../layouts/MainLayouts";
import Login from "../login/Login";
import Register from "../register/Register";
import { paginate } from "../common/paginate";
import { addUser } from "../../actions/user";
import Logout from "../login/lougout";
import Profile from "../profile/Profile";
import NotFound from "../common/notfound";
// import jwt form "jsonwebtoken";

const Toplearn = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  // const coursess = Object.values(courses);
  // console.log(courses);
  const b = Object.values(courses);
  const indexCourses = paginate(b, 1, 8);
  // console.log("index");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //     const decodedToken = jwt.decode(token, { complete: true });thiscomment
      // const dateNow = Date.now() / 1000;this comment
      const dateNow = Date.now();
      const expireTime = localStorage.getItem("expireTime");
      const userName = localStorage.getItem("userName");
      const user = { email: token, name: userName };
      if (expireTime && userName) {
        if (expireTime < dateNow) {
          localStorage.removeItem("token");
          localStorage.removeItem("expireTime");
          localStorage.removeItem("userName");
        } else {
          console.log("user:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          dispatch(addUser(user));
          console.log("user:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        }
      }

      //     if (decodedToken.payload.exp < dateNow) localStorage.removeItem("token");thisis comment
      //     else dispatch(addUser(decodedToken.payload.user));this is comment
    }
  }, []);
  return (
    <MainLayout>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />

        <Route path="/archive" component={Archive} />
        <Route path="/single/:id" component={SingleCourse} />
        <Route
          path="/"
          exact
          render={() => <Course coursess={indexCourses} />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </MainLayout>
  );
};
export default Toplearn;
