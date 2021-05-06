import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";
import { NavLink } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import registerUser from "../../services/userservices";
import { useSelector } from "react-redux";
const Register = ({ history }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState("");
  const [verifypassword, setVerifypassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();
  const user = useSelector((state) => state.user);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی می باشد",
        min: "کمتر از شش کاراکتر نباید باشد",
        email: "ایمیل اشتباه میباشد",
        regex:
          "پسورد باید ترکیب حروف بزرگ و کوچک و کارکترهای خاص نظیر @#!%$ و حداقل هشت کاراکتر باشد",
        accepted: "قوانین را حتما باید بپذیرید",
        in: "پسورد منطبق نیست",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );
  const resetForm = () => {
    setPassword("");
    setEmail("");
    setFullname("");
    setVerifypassword("");
  };
  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    const user = {
      fullname: fullname,
      email: email,
      password: password,
    };
    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status } = await registerUser(user);
        if (status === 201) {
          toast.success("با موفقیت ایجاد شد", {
            position: "top-right",
            onClose: true,
          });
          setLoading(false);
          history.replace("/");
          resetForm();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (exp) {
      setLoading(false);
      toast.error("مشکلی پیش آمده", { position: "top-right", onClose: true });
      console.log(exp);
    }
    // console.log(JSON.stringify(user));
  };
  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <Helmet>
            <title> عضویت در سایت </title>
          </Helmet>
        </header>

        {loading ? (
          <div style={{ margin: "0px auto", width: "450px" }}>
            <ReactLoading
              type="bars"
              color="#2aaf27"
              height={467}
              width={175}
            />
          </div>
        ) : (
          <div className="form-layer">
            <form action="" method="" onSubmit={handleRegisterFormSubmit}>
              <div className="input-group">
                <span className="input-group-addon" id="username">
                  <i className="zmdi zmdi-account"></i>
                </span>
                <input
                  name="fullname"
                  type="text"
                  className="form-control"
                  placeholder="نام و نام خانوادگی"
                  aria-describedby="username"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                    validator.current.showMessageFor("fullname");
                  }}
                />
                {validator.current.message(
                  "fullname",
                  fullname,
                  "required|min:5"
                )}
              </div>

              <div className="input-group">
                <span className="input-group-addon" id="email-address">
                  <i className="zmdi zmdi-email"></i>
                </span>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="ایمیل"
                  aria-describedby="email-address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validator.current.showMessageFor("email");
                  }}
                />
                {validator.current.message("email", email, "required|email")}
              </div>

              <div className="input-group">
                <span className="input-group-addon" id="password">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="رمز عبور "
                  aria-describedby="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validator.current.showMessageFor("password");
                  }}
                />
                {validator.current.message(
                  "password",
                  password,
                  "required|min:5"
                )}
                {/* regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])|min:8 */}
              </div>
              <div className="input-group">
                <span className="input-group-addon" id="verifypassword">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  name="verifypassword"
                  type="password"
                  className="form-control"
                  placeholder="رمز عبور "
                  aria-describedby="verifypassword"
                  value={verifypassword}
                  onChange={(e) => {
                    setVerifypassword(e.target.value);
                    validator.current.showMessageFor("verifypassword");
                  }}
                />
                {validator.current.message(
                  "verifypassword",
                  verifypassword,
                  `required|in:${password}`
                )}
              </div>

              <div className="accept-rules">
                <label>
                  <input
                    type="checkbox"
                    name="policy"
                    value={policy}
                    onChange={(e) => {
                      setPolicy(e.currentTarget.checked);
                      validator.current.showMessageFor("policy");
                    }}
                  />
                  قوانین و مقررات سایت را میپذیرم{" "}
                  {validator.current.message("policy", policy, "accepted")}
                </label>
              </div>

              <div className="link">
                <NavLink to="">
                  {" "}
                  <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت
                  !
                </NavLink>
                <NavLink to="/login">
                  {" "}
                  <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
                </NavLink>
              </div>

              <button className="btn btn-success"> عضویت در سایت </button>
            </form>
          </div>
        )}
        {/*for loading   */}
      </div>
    </main>
  );
};
export default withRouter(Register);
