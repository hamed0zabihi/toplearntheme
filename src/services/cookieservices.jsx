import Cookies from "universal-cookie";

const cookies = new Cookies();
class CookieServices {
  set(name, value, options) {
    cookies.set(name, value, options);
  }
  get(name) {
    return cookies.get(name);
  }
  remove(name) {
    cookies.remove(name);
  }
}
export default new CookieServices();
