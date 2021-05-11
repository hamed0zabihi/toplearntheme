import http from "./httpService";
import config from "./config.json";
// if use https://jsonplaceholder.typicode.com api ,we use :
// http.get(`${config.mainapi}/posts?_page=1&_limit=36`);
// http.get(`${config.mainapi}/posts/${id}`);
export const getCourses = () => {
  return http.get(`${config.ghorbaniApi}/api/courses`);
};

export const getCourse = (id) => {
  return http.get(`${config.ghorbaniApi}/api/course/${id}`);
};

export const NewCourse = (course) => {
  return http.post(`${config.ghorbaniApi}/api/course`, course);
};
export const sendCourseForUpdate = (id, course) => {
  return http.put(`${config.ghorbaniApi}/api/course/${id}`, course);
};

export const DeleteCourse = (id) => {
  console.log("id", id);
  return http.delete(`${config.ghorbaniApi}/api/course/${id}`);
};
