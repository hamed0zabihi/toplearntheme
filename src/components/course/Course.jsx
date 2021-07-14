import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "../common/ShowImage";
const Course = ({ coursess }) => {
  // let coursesArray = Object.values(coursess);

  return (
    <section className="terms-items">
      <header>
        <h2> آخرین دوره های تاپ لرن </h2>
        <Link to="/archive"> مشاهده همه دوره ها </Link>
      </header>
      <div className="row">
        {coursess.map((courses) => (
          <div
            key={courses._id}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
          >
            <article>
              <Link to={`/single/${courses._id}`} className="img-layer">
                {/* <img
                  src={`images/pic/${Math.round((courses.id + 1) % 8) + 1}.jpg`}
                /> */}
                <ShowImage image={courses.imageUrl} />
              </Link>
              <h2>
                <Link to={`/single/${courses._id}`}>{courses.title} </Link>
              </h2>
              <span> {courses.price} تومان </span>
              <i>1:52:32</i>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Course;
