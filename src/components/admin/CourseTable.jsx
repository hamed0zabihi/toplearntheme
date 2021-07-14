import React, { useState, useEffect } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../common/paginate";
import AddNewCourse from "./AddNewCourse";
import EditCourseModal from "./EditCourse";
import DeleteCourseModal from "./DeleteCourseModal";
import { orderBy } from "lodash";

const CourseTable = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const handlePageChage = (page) => {
    setCurrentPage(page);
  };

  //handlesearch
  const [search, setsearch] = useState("");
  const [courselistforsearch, setcourselistforsearch] = useState([]);

  useEffect(() => {
    setcourselistforsearch(courses);
  }, [courses]);
  const filteredCoursesSearch = courselistforsearch.filter((el) =>
    el.title.includes(search)
  );
  //courses courseData
  const courseData = paginate(filteredCoursesSearch, currentPage, perPage);
  //sort price and title
  const [firstClickforSort, setfirstClickforSort] = useState(false);
  const [sorting, setsorting] = useState("");

  const toggleSorting = (feildName) => {
    if (firstClickforSort) {
      setsorting("desc");
    } else {
      setsorting("asc");
    }
    sortingfilteredCoursesSearch(feildName);
  };
  const sortingfilteredCoursesSearch = (fieldName) => {
    setcourselistforsearch(orderBy(courselistforsearch, fieldName, sorting));
    setfirstClickforSort(!firstClickforSort);
  };
  // modal
  const [modal, setModal] = useState(false); //for create course
  const [modalforedit, setmodalforedit] = useState(false); //for edit coures
  const [CurrentCourseForEdit, setCurrentCourseForEdit] = useState({}); //for edit course
  const [idForDelete, setidForDelete] = useState();
  const [modalForDelete, setmodalForDelete] = useState(false);

  const toggle = () => setModal(!modal); //for create
  const toggleForEdite = () => setmodalforedit(!modalforedit); //for edit
  const toggleForDelete = () => setmodalForDelete(!modalForDelete); //for delete

  const openModalEdit = (course) => {
    setmodalforedit(true);
    setCurrentCourseForEdit(course);
  };
  const openModalDelete = (idForDelete) => {
    setmodalForDelete(true);
    setidForDelete(idForDelete);
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
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    عنوان دوره{" "}
                    <i
                      className="zmdi zmdi-sort-asc"
                      onClick={() => toggleSorting("title")}
                    ></i>
                  </th>
                  <th scope="col">تصویر دوره</th>
                  <th scope="col">
                    قیمت دوره (تومان){" "}
                    <i
                      className="zmdi zmdi-sort-asc"
                      onClick={() => toggleSorting("price")}
                    ></i>
                  </th>
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
                        rel="noopener noreferrer"
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
                      <button
                        className="btn btn-danger"
                        onClick={() => openModalDelete(course._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="navbar-fixed-bottom text-center footer">
            <Pagination
              totalpages={filteredCoursesSearch.length}
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
          <DeleteCourseModal
            toggle={toggleForDelete}
            modal={modalForDelete}
            id={idForDelete}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default CourseTable;
