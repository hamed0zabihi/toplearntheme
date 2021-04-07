import http from "./httpService";
import config from "./config.json";

const registerUser = (user) => {
  return http.post(`${config.loginApi}/api/register`, JSON.stringify(user));
};
export default registerUser;
export const loginUser = (l) => {
  return http.post(`${config.loginApi}/api/users`, JSON.stringify(l));
};
