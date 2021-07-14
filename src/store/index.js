import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getAllCourses } from "../actions/courses";
import { reducers } from "../reducers/";

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
//dispatch
store.dispatch(getAllCourses());
//subscribe
store.subscribe(() => console.log(store.getState()));
