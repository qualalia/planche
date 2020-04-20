import axios from "axios";

const SET_LESSONS = "SET_LESSONS";
export const SET_LESSONS_ERROR = "SET_LESSONS_ERROR";

const setLessons = lessons => ({
  type: SET_LESSONS,
  lessons,
});

const setLessonsError = error => ({
  type: SET_LESSONS_ERROR,
  error,
});

/**
 * THUNK CREATORS
 */
export function fetchLessons(query) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/lessons${query}`);
      dispatch(setLessons(data));
    } catch (err) {
      console.log(err);
      dispatch(setLessonsError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_LESSONS:
      return action.lessons;
    case SET_LESSONS_ERROR:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
}
