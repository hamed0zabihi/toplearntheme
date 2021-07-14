import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { clearUser } from "../../actions/user";

const Logout = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    localStorage.removeItem("userName");

    history.replace("/");
  });
  return null;
};
export default withRouter(Logout);
