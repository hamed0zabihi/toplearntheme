import React, { useState } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../common/paginate";
import AddNewCourse from "./AddNewCourse";
import EditCourseModal from "./EditCourse";

const CourseTable = ({ courses }) => {
  // console.log("courses in coursetable", courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const handlePageChage = (page) => {
    setCurrentPage(page);
  };

  const courseData = paginate(courses, currentPage, perPage);
  // modal
  const [modal, setModal] = useState(false);
  const [modalforedit, setmodalforedit] = useState(false);
  const [CurrentCourseForEdit, setCurrentCourseForEdit] = useState({});

  const toggle = () => setModal(!modal);
  const toggleForEdite = () => setmodalforedit(!modalforedit);
  const openModalEdit = (course) => {
    setmodalforedit(true);
    setCurrentCourseForEdit(course);
  };
  return (
    <React.Fragment>
      <section style={{ marginTop: "5em", marginRight: "2em" }}>
        <div>
          <div>
            <h3 className="alert alert-info text-center">لیست دوره ها</h3>
            <div className="row inline-block">
              <button className="btn btn-primary" onClick={toggle}>
                <span
                  className="fa fa-plus"
                  style={{
                    verticalAlign: "middle",
                    marginLeft: "1em",
                  }}
                ></span>
                اضافه کردن دوره جدید
              </button>

              <input
                type="text"
                placeholder="جستجوی دوره"
                className="form-control"
                style={{
                  width: "50%",
                  float: "left",
                  marginLeft: "2em",
                }}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">عنوان دوره</th>
                  <th scope="col">تصویر دوره</th>
                  <th scope="col">قیمت دوره (تومان)</th>
                  <th scope="col">ویرایش</th>
                  <th scope="col">حذف</th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>
                      <a
                        href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                        target="_blank"
                        className="btn btn-info btn-sm"
                      >
                        نمایش تصویر
                      </a>
                    </td>
                    <td>{course.price === 0 ? "رایگان" : `${course.price}`}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => openModalEdit(course)}
                      >
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="navbar-fixed-bottom text-center footer">
            <Pagination
              totalpages={courses.length}
              currentpage={currentPage}
              perpage={perPage}
              handlePageChage={handlePageChage}
            />
          </div>
          <AddNewCourse toggle={toggle} modal={modal} />
          <EditCourseModal
            toggle={toggleForEdite}
            modal={modalforedit}
            course={CurrentCourseForEdit}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default CourseTable;
