import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
  return http.get(`${config.mainapi}/posts?_page=1&_limit=24`);
};
