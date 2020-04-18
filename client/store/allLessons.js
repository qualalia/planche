import axios from "axios";
import history from "../history";

const GET_ALL_LESSONS = "GET_ALL_LESSONS";
export const ALL_LESSONS_ERROR = "ALL_LESSONS_ERROR";

const getAllLessons = allLessons => ({
  type: GET_ALL_LESSONS,
  allLessons,
});

const allLessonsError = error => ({
  type: ALL_LESSONS_ERROR,
  error,
});

/**
 * THUNK CREATORS
 */
export function fetchLessons() {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/classes`);
      dispatch(getAllLessons(data));
    } catch (err) {
      console.log(err);
      dispatch(allLessonsError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ALL_LESSONS:
      return action.allLessons;
    case ALL_LESSONS_ERROR:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
}
