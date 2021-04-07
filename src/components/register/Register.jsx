import React, { useState, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { toast, ToastContainer } from "react-toastify";
import registerUser from "../../services/userservices";
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState("");
  const [verifypassword, setVerifypassword] = useState("");
  const [, forceUpdate] = useState();
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
        const { status } = await registerUser(user);
        if (status === 201) {
          toast.success("با موفقیت ایجاد شد", {
            position: "top-right",
            onClose: true,
          });

          resetForm();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (exp) {
      toast.error("مشکلی پیش آمده", { position: "top-right", onClose: true });
      console.log(exp);
    }
    console.log(JSON.stringify(user));
  };
  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>

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
                "required|regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])|min:8"
              )}
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
                <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !
              </NavLink>
              <NavLink to="/login">
                {" "}
                <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
              </NavLink>
            </div>

            <button className="btn btn-success"> عضویت در سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Register;
