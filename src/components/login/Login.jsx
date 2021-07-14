import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import SimpleReactValidator from "simple-react-validator";
import { loginUser } from "../../services/userservices";
import { Helmet } from "react-helmet";

import CookieServices from "../../services/cookieservices";
import { useDispatch } from "react-redux";
import { addUser } from "../../actions/user";
import decodeToken from "../common/decodeToken";
// import { useCookies } from "react-cookie";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberme, setRememberme] = useState();
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();
  // const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "الزامی",
        regex: "حداقل هشت کاراکتر-حاوی حروف بزرگ کوچک و کاراکترهای خاص مانند @",
        email: "ایمیل صحیح نمیباشد",
        min: "حداقل مجاز",
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
    const user = {
      email: email,
      password: password,
    };
    try {
      if (validator.current.allValid()) {
        // const idForLoginFake = 1 + Math.floor(Math.random() * 11);
        //fake rest api is 12 number
        // console.log("user:", user);
        const { status, data } = await loginUser(user);
        // const userLogined = data.data;
        // console.log("data", data);
        setLoading(true);
        if (status === 200) {
          toast.success("با موفقیت وارد شدید", {
            position: "top-right",
            onClose: true,
          });

          localStorage.setItem("token", data.token);
          let expires = new Date();
          const expireTimeforlogin = expires.getTime() + 180000;
          localStorage.setItem("expireTime", expireTimeforlogin);
          // const fullName = userLogined.first_name + " " + userLogined.last_name;
          localStorage.setItem("userName", email);

          expires.setTime(expires.getTime() + 200000);

          const options = {
            path: "/",
            expires,
            secure: true,
            sameSite: "none",
          };

          // CookieServices("namdse", email, options);
          CookieServices.set("forToken", email, options);
          //fix error cookie

          // const user = {
          //   email: userLogined.email,
          //   name: fullName,
          //   avatar: userLogined.avatar,
          //   id: userLogined.id,
          // };
          dispatch(addUser(decodeToken(data.token).payload.user));
          setLoading(false);
          // console.log(data);
          history.replace("/");
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
      console.log(exp);
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
            <small id="emailHelp" className="form-text text-muted text-info">
              younes.gh@chmail.ir
            </small>
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
                "required|min:5"
              )}
              {/* regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])| */}
            </div>
            <small id="passwordHelp" className="form-text text-muted text-info">
              123456
            </small>
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  name="rememberme"
                  value={rememberme}
                  onChange={(e) => {
                    setRememberme(e.currentTarget.checked);
                  }}
                />{" "}
                مرا بخاطر بسپار{" "}
              </label>
            </div>

            <div className="link">
              <a href="/#">
                <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده
                ام !
              </a>
              <a href="/#">
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
