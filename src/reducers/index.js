import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { courcesReducer } from "./coursesReducer";
import { singlecourseReducer } from "./singlecourseReducer";
import { userReducer } from "./userReducer";
export const reducers = combineReducers({
  courses: courcesReducer,
  course: singlecourseReducer,
  user: userReducer,
  cart: cartReducer,
});
