import axios from "axios";
import history from "../history";

const GET_ALL_CLASSES = "GET_ALL_CLASSES";
const ALL_CLASSES_ERROR = "ALL_CLASSES_ERROR";

const getAllClasses = allClasses => ({
  type: GET_ALL_CLASSES,
  allClasses,
});

const allClassesError = error => ({
  type: ALL_CLASSES_ERROR,
  error,
});

/**
 * THUNK CREATORS
 */
export function fetchClasses() {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/classes`);
      dispatch(getAllClasses(data));
    } catch (err) {
      dispatch(allClassesError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CLASSES:
      return action.allClasses;
    case ALL_CLASSES_ERROR:
      return action.error;
    default:
      return state;
  }
}
