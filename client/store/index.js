import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import singleClass from "./singleClass.js";
import lessons from "./allLessons.js";
import instructors from "./instructors.js";
import schools from "./schools";

const reducer = combineReducers({
  user,
  singleClass,
  lessons,
  instructors,
  schools,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./singleClass.js";
export * from "./allLessons.js";
export * from "./instructors.js";
export * from "./schools.js";
