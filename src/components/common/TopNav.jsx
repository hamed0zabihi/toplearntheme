import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  return (
    <nav>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <ul>
            <li>
              <NavLink activeStyle={{ color: "lime" }} to="/" exact>
                صفحه اصلی
              </NavLink>
              <NavLink to="/archive"> دوره‌ها</NavLink>
              <NavLink to="/contactus"> تماس با ما </NavLink>
              {cart.items.length ? (
                <NavLink to="/cart">
                  <i className="fa fa-shopping-cart "></i>
                  <span
                    className="counter counter-lg"
                    style={{
                      top: "-12px",
                      position: "relative",
                      color: "#fe1212",
                      backgroundColor: "lime",
                      borderRadius: "10em",
                      padding: "0px 4px",
                      lineHeight: "14px",
                    }}
                  >
                    {cart.items.length}
                  </span>
                </NavLink>
              ) : null}
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
                  {user.fullname}
                </NavLink>{" "}
                /
                {user.isAdmin ? (
                  <NavLink activeStyle={{ color: "lime" }} to="/dashboard">
                    داشبورد/
                  </NavLink>
                ) : null}
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
