import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getAllCourses } from "../actions/courses";
import { reducers } from "../reducers/";

//for debuging
// const ReduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducers, compose(applyMiddleware(thunk)));
//dispatch
store.dispatch(getAllCourses());
//subscribe
store.subscribe(() => console.log(store.getState()));
