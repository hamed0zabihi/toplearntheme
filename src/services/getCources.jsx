import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
  return http.get(`${config.mainapi}/posts?_page=1&_limit=36`);
};

export const getCourse = (id) => {
  return http.get(`${config.mainapi}/posts/${id}`);
};
