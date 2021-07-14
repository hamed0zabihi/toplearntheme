import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { paginate } from "../common/paginate";
import Pagination from "../common/pagination";
import Course from "./Course";
import { isEmpty, isUndefined, orderBy } from "lodash";

const Search = ({ match }) => {
  //get all courses
  const courses = useSelector((state) => state.courses);
  // if use api jasonplaceholder.com
  // const allCourses = Object.values(courses);
  //search
  const [search, setsearch] = useState("");
  const [filteredSearch, setfilteredSearch] = useState([]);
  useEffect(() => {
    setfilteredSearch(courses);
  }, [courses]);
  //
  const coursesForPagination = filteredSearch.filter((el) =>
    el.title.includes(search)
  );
  ///search passed
  // console.log("match:", match);
  const searched = match.params.searched;
  // console.log("searched", searched);
  useEffect(() => {
    if (!isEmpty(searched) && !isUndefined(searched)) {
      setsearch(searched);
    }
  }, [searched]);

  ////filter radio top
  const filterRaio = (n) => {
    switch (n) {
      case "all":
        setfilteredSearch(courses);
        setcurrentpage(1);
        break;
      case "free":
        const freeCourse = courses.filter((el) => el.price === 0);
        setfilteredSearch(freeCourse);

        setcurrentpage(1);
        console.log("free case");
        break;
      case "off":
        setfilteredSearch(courses.filter((el) => el.price !== 0));
        setcurrentpage(1);
        break;
      default:
        setfilteredSearch(courses);
        setcurrentpage(1);
        break;
    }
  };
  //sorting top page
  const sorting = (fieldName) => {
    setfilteredSearch(orderBy(filteredSearch, fieldName, "asc"));
  };
  // for pagination options
  const perpage = 8;
  const [currentpage, setcurrentpage] = useState(1);
  const handlePageChage = (page) => {
    setcurrentpage(page);
  };

  //pagination
  const archiveCourses = paginate(coursesForPagination, currentpage, perpage);

  return (
    <React.Fragment>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">تاپ لرن</a>
            </li>
            <li className="breadcrumb-item active">
              <a href="/#">دوره ها</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              برنامه نویسی وب{" "}
            </li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <section className="term-categories">
          <div className="top-bar">
            <header>
              <h1>
                {" "}
                دوره های <span> برنامه نویسی وب </span>{" "}
              </h1>{" "}
              <span> {courses.length} دوره </span>
            </header>

            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 pull-right">
                <form action="" method="">
                  <div className="input">
                    <input
                      type="text"
                      name=""
                      value={search}
                      placeholder="موضوع مورد نظر ..."
                      onChange={(e) => setsearch(e.target.value)}
                    />
                    <button>
                      <i className="zmdi zmdi-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
                <div
                  className="switch-field available"
                  onChange={(e) => {
                    filterRaio(e.target.value);
                  }}
                >
                  <input
                    id="available-filter-1"
                    name="available"
                    value="all"
                    defaultChecked
                    type="radio"
                  />
                  <label htmlFor="available-filter-1"> همه </label>
                  <input
                    id="available-filter-2"
                    name="available"
                    value="off"
                    type="radio"
                  />
                  <label htmlFor="available-filter-2"> خریدنی </label>
                  <input
                    id="available-filter-3"
                    name="available"
                    value="free"
                    type="radio"
                  />
                  <label htmlFor="available-filter-3"> رایگان </label>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12 pull-left">
                <div
                  className="select-ddl"
                  onChange={(e) => sorting(e.target.value)}
                >
                  <select>
                    <option value="_id"> مرتب سازی </option>
                    <option value="price"> قیمت </option>
                    <option value="title">الفبا </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <aside className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <section className="aside-section filter-by-price">
                <header>
                  <h3> فیلتر بر اساس قیمت </h3>
                </header>
                <div className="price-range">
                  <input
                    type="hidden"
                    value=""
                    id="min-value"
                    name="min_price"
                  />
                  <input
                    type="hidden"
                    value=""
                    id="max-value"
                    name="max_price"
                  />
                  <div className="price-bar">
                    <div id="priceFilter"></div>
                  </div>
                  <div className="max-price">
                    تا <span id="max-text">500000</span> تومان
                  </div>
                  <div className="min-price">
                    از <span id="min-text">20000</span> تومان
                  </div>
                  <div className="clearfix"></div>
                </div>
              </section>

              <section className="aside-section filter-by-category">
                <header>
                  <h3> دسته بندی موضوعات </h3>
                </header>
                <div className="inner">
                  <ul>
                    <li>
                      <input type="checkbox" name="" id="cat-1" />
                      <label htmlFor="cat-1"> برنامه نویسی وب </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-2" />
                      <label htmlFor="cat-2"> برنامه نویسی موبایل </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-3" />
                      <label htmlFor="cat-3"> برنامه نویسی وب </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-4" />
                      <label htmlFor="cat-4"> برنامه نویسی موبایل </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-5" />
                      <label htmlFor="cat-5"> برنامه نویسی وب </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-6" />
                      <label htmlFor="cat-6"> برنامه نویسی موبایل </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-7" />
                      <label htmlFor="cat-7"> برنامه نویسی وب </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-8" />
                      <label htmlFor="cat-8"> برنامه نویسی موبایل </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-9" />
                      <label htmlFor="cat-9"> برنامه نویسی وب </label>
                    </li>
                    <li>
                      <input type="checkbox" name="" id="cat-10" />
                      <label htmlFor="cat-10"> برنامه نویسی موبایل </label>
                    </li>
                  </ul>
                </div>
              </section>
            </aside>

            <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
              <section className="terms-items">
                {coursesForPagination.length === 0 ? (
                  <p>نتیجه ای یافت نشد!</p>
                ) : (
                  <React.Fragment>
                    <div className="row">
                      <Course coursess={archiveCourses} />
                    </div>
                    <Pagination
                      totalpages={coursesForPagination.length}
                      currentpage={currentpage}
                      perpage={perpage}
                      handlePageChage={handlePageChage}
                    />
                  </React.Fragment>
                )}
              </section>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Search;
