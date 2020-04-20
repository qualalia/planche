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
      const { data, status } = await axios.get(`/api/lessons${query}`);
      dispatch(setLessons({ data, status }));
    } catch (err) {
      console.log(err);
      dispatch(setLessonsError(err));
    }
  };
}

const initialState = { data: [], status: null, error: null };

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LESSONS:
      return action.lessons;
    /* if (action.lessons.status === 200) {
       *   if (state.data.length <= 2)
       *     return {
       *       ...state,
       *       data: [...state.data, action.lessons.data],
       *     };
       *   else {
       *     return { ...state, data: action.lessons.data };
       *   }
       * } else if (action.lessons.status === 204) {
       *   return { ...state, status: action.lessons.status };
       * } else {
       *   return action.lessons;
       * } */
    case SET_LESSONS_ERROR:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
}
