import React from "react";
import { Link, NavLink } from "react-router-dom";

const Course = ({ coursess }) => {
  // let coursesArray = Object.values(coursess);
  {
    console.log("a" + coursess);
  }
  return (
    <section className="terms-items">
      <header>
        <h2> آخرین دوره های تاپ لرن </h2>
        <Link to="/archive"> مشاهده همه دوره ها </Link>
      </header>
      <div className="row">
        {coursess.map((courses) => (
          <div
            key={courses.id}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
          >
            <article>
              <Link to="/single" className="img-layer">
                <img src={`images/pic/${courses.id}.jpg`} />
              </Link>
              <h2>
                <a href="">{courses.title} </a>
              </h2>
              <span> رایگان </span>
              <i>1:52:32</i>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Course;
