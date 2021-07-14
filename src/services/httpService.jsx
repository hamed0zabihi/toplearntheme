import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers["Access-Control-Allow-Methods"] =
//   "GET, POST, PUT, DELETE";
// axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
// axios.defaults.headers["crossorigin"] = true;
// add for error cross orgin in firefox browser-and https://jsonplaceholder.typicode.com/posts?_page=1&_limit=36 api
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//bearer means carrier-
axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("error:", error);
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
      closeOnClick: true,
    });
  }
  console.log("reject");
  return Promise.reject(error);
});

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
// };
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
