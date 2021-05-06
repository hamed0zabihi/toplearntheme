import http from "./httpService";
import config from "./config.json";

const registerUser = (user) => {
  return http.post(`${config.ghorbaniApi}/api/register`, user);
};
export default registerUser;
export const loginUser = (user) => {
  // console.log("json", JSON.stringify(user));
  return http.post(`${config.ghorbaniApi}/api/login`, user);
};

export const loginUser1 = (idForLoginFake) => {
  return http.get(`${config.loginApi}/api/users/${idForLoginFake}`);
};
