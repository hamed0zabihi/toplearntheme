import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resetForm = () => {
    setPassword("");
    setEmail("");
    setFullname("");
  };
  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    const user = {
      fullname: fullname,
      email: email,
      password: password,
    };

    axios
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(user),
        {
          headers: {
            // "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(({ status }) => {
        console.log(status);
        if (status === 201) {
          toast.success("با موفقیت ثبت نام شد", {
            position: "top-right",
            closeOnclick: true,
          });
        }
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("مشکلی پیش آمده است", {
          position: "top-right",
          onClose: true,
        });
      });

    console.log(JSON.stringify(user));
    console.log(user);
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
                type="text"
                className="form-control"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="ایمیل"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="accept-rules">
              <label>
                <input type="checkbox" name="" /> قوانین و مقررات سایت را
                میپذیرم{" "}
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
      <ToastContainer />
    </main>
  );
};
export default Register;
