import http from "./httpService";
import config from "./config.json";

const registerUser = (user) => {
  return http.post(`${config.mainapi}/posts`, JSON.stringify(user));
};
export default registerUser;
