import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import singleClass from "./singleClass.js";
import allLessons from "./allLessons.js";

const reducer = combineReducers({
  user,
  singleClass,
  allLessons,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./singleClass.js";
export * from "./allLessons.js";
