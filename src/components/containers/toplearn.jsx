import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Archive from "../course/Archive";
import Course from "../course/Course";
import SingleCourse from "../course/SingleCourse";
import MainLayout from "../layouts/MainLayouts";
import Login from "../login/Login";
import Register from "../register/Register";

const Toplearn = (props) => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/archive" component={Archive} />
        <Route path="/single" component={SingleCourse} />
        <Route path="/" exact component={Course} />
      </Switch>
    </MainLayout>
  );
};
export default Toplearn;
