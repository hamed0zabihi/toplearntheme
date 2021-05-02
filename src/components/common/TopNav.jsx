import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <ul>
            <li>
              <NavLink activeStyle={{ color: "lime" }} to="/" exact>
                {" "}
                صفحه اصلی
              </NavLink>
              <NavLink to="/aboutus"> درباره ما </NavLink>
              <NavLink to="/contactus"> تماس با ما </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-xs-12">
          <div className="clientarea">
            {!isEmpty(user) ? (
              <div className="loggein ">
                <i className="zmdi zmdi-account"></i>
                <NavLink activeStyle={{ color: "lime" }} to="/profile">
                  {"     "}
                  {user.name}
                </NavLink>{" "}
                /
                <NavLink activeStyle={{ color: "lime" }} to="/logout">
                  {"     "}
                  خروج{"    "}
                </NavLink>{" "}
              </div>
            ) : (
              <div className="signin">
                <i className="zmdi zmdi-account"></i>
                <NavLink activeStyle={{ color: "lime" }} to="/login">
                  {" "}
                  ورود{" "}
                </NavLink>{" "}
                /
                <NavLink activeStyle={{ color: "lime" }} to="/register">
                  {" "}
                  عضویت{" "}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default TopNav;
