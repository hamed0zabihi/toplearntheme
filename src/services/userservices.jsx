import http from "./httpService";
import config from "./config.json";

const registerUser = (user) => {
  return http.post(`${config.loginApi}/api/users`, JSON.stringify(user));
};
export default registerUser;
export const loginUser = (l) => {
  return http.post(`${config.loginApi}/api/users`, JSON.stringify(l));
};
export const loginUser1 = (idForLoginFake) => {
  return http.get(`${config.loginApi}/api/users/${idForLoginFake}`);
};
