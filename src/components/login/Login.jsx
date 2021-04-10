import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import SimpleReactValidator from "simple-react-validator";
import { loginUser } from "../../services/userservices";
import { Helmet } from "react-helmet";

import CookieServices from "../../services/cookieservices";
// import { useCookies } from "react-cookie";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();
  const [auth, setAuth] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "الزامی",
        regex: "حداقل هشت کاراکتر-حاوی حروف بزرگ کوچک و کاراکترهای خاص مانند @",
        email: "ایمیل صحیح نمیباشد",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );
  const resetLoginForm = () => {
    setPassword("");
    setEmail("");
  };
  const handelLogin = async (event) => {
    event.preventDefault();
    const userLogin = {
      email: email,
      password: password,
    };
    try {
      if (validator.current.allValid()) {
        const { status } = await loginUser(userLogin);
        setLoading(true);
        if (status === 201) {
          toast.success("با موفقیت لاگین شدید", {
            position: "top-right",
            onClose: true,
          });
          localStorage.setItem("token", email);
          let expires = new Date();
          expires.setTime(expires.getTime() + 20000);

          const options = { path: "/", expires };

          // CookieServices("namdse", email, options);
          CookieServices.set("forToken", email, options);

          setLoading(false);

          // history.replace("/");
          resetLoginForm();
        }
        if (status === 400) {
          toast.error("یوزرنیم یا پسورد اشتباه است", {
            position: "top-right",
            onClose: true,
          });
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (exp) {
      setLoading(false);

      toast.error("خطایی رخ داده است", {
        position: "top-right",
        onClose: true,
      });
      setLoading(false);
      // console.log(exp);
    }
  };
  return (
    <main className="client-page">
      {loading ? (
        <div style={{ margin: "0 auto", width: "450px" }}>
          <ReactLoading
            type="bars"
            delay={0}
            color="#2aaf27"
            height={667}
            width={375}
          />
        </div>
      ) : null}

      <div className="container-content">
        <header>
          <h2> ورود به سایت </h2>
        </header>
        <Helmet>
          <title>ورود به سایت</title>
        </Helmet>
        <div> </div>
        <div className="form-layer">
          <form action="" method="" onSubmit={handelLogin}>
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
                type="password"
                name="password"
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

            <div className="remember-me">
              <label>
                <input type="checkbox" name="" /> مرا بخاطر بسپار{" "}
              </label>
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده
                ام !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> عضویت در سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> ورود به سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default withRouter(Login);
