import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.post["content-type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers["crossorigin"] = true;
// axios.defaults.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("خطا از سمت سرور", {
      position: "top-right",
      closeOnClick: true,
    });
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
