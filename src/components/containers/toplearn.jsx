import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Archive from "../course/Archive";
import Course from "../course/Course";
import SingleCourse from "../course/SingleCourse";
import MainLayout from "../layouts/MainLayouts";
import Login from "../login/Login";
import Register from "../register/Register";
import { paginate } from "../common/paginate";

const Toplearn = () => {
  const courses = useSelector((state) => state.courses);
  // const coursess = Object.values(courses);
  console.log("0");
  console.log(courses);
  const b = Object.values(courses);
  const indexCourses = paginate(b, 1, 8);
  console.log("index");
  return (
    <MainLayout>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/archive" component={Archive} />
        <Route path="/single" component={SingleCourse} />
        <Route
          path="/"
          exact
          component={() => <Course coursess={indexCourses} />}
        />
      </Switch>
    </MainLayout>
  );
};
export default Toplearn;
