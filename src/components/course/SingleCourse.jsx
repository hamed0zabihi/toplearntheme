import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { getSingleCourse } from "../../actions/course";

import ShowImage from "../common/ShowImage";
import courseIdValidator from "../common/courseIdvadilator";
import { Redirect } from "react-router";
import CommentCourse from "./CommentCourse";
import AsideCourse from "./AsideCourse";

const SingleCourse = ({ match }) => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const matchParamsId = match.params.id;
  useEffect(() => {
    if (courseIdValidator(matchParamsId)) {
      dispatch(getSingleCourse(matchParamsId));
    }
  }, [dispatch, matchParamsId]);
  if (!courseIdValidator(match.params.id)) {
    return <Redirect to="/notfoundig" />;
  }
  return (
    <React.Fragment>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#"> تاپ لرن </a>
            </li>
            <li className="breadcrumb-item active">
              <a href="/#"> دوره ها </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              دوره آموزشی ساخت ربات تلگرام
            </li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <section className="term-content">
          <header>
            <h1> دوره آموزشی ساخت ربات تلگرام </h1>
          </header>
          {!isEmpty(course) ? (
            <div className="row">
              <div className="col-md-8 col-sm-12 col-xs-12 pull-left">
                <section className="term-description">
                  <ShowImage image={course.imageUrl} />

                  <h2>{course.title}</h2>
                  <p>{course.info}</p>

                  <h2> سرفصل های این دوره : </h2>
                  <ul>
                    <li>
                      {" "}
                      <h3> معرفی این دوره </h3> <i> رایگان </i>{" "}
                      <span>00:15:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> چرا شی گرایی یاد بگیریم ؟ </h3> <i> نقدی </i>{" "}
                      <span>01:15:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - طراحی دیتابیس </h3>{" "}
                      <i> نقدی </i> <span>02:05:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - ایجاد پنل مدیریت </h3>{" "}
                      <i> نقدی </i> <span>00:10:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> چرا شی گرایی یاد بگیریم ؟ </h3> <i> نقدی </i>{" "}
                      <span>01:15:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - طراحی دیتابیس </h3>{" "}
                      <i> نقدی </i> <span>02:05:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - ایجاد پنل مدیریت </h3>{" "}
                      <i> نقدی </i> <span>00:10:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> چرا شی گرایی یاد بگیریم ؟ </h3> <i> نقدی </i>{" "}
                      <span>01:15:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - طراحی دیتابیس </h3>{" "}
                      <i> نقدی </i> <span>02:05:12</span>
                    </li>
                    <li>
                      {" "}
                      <h3> پروژه ایجاد یک وب سایت - ایجاد پنل مدیریت </h3>{" "}
                      <i> نقدی </i> <span>00:10:12</span>
                    </li>
                  </ul>
                </section>
                <CommentCourse />
              </div>

              <AsideCourse
                price={course.price}
                id={course._id}
                course={course}
              />
            </div>
          ) : null}
        </section>
      </div>
    </React.Fragment>
  );
};
export default SingleCourse;
