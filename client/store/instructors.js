import axios from "axios";

const SET_INSTRUCTORS = "SET_INSTRUCTORS";
export const SET_INSTRUCTORS_ERROR = "SET_INSTRUCTORS_ERROR";

const setInstructors = instructors => ({
  type: SET_INSTRUCTORS,
  instructors,
});

const setInstructorsError = error => ({
  type: SET_INSTRUCTORS_ERROR,
  error,
});

export function fetchInstructors() {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users?type=1`);
      dispatch(setInstructors(data));
    } catch (err) {
      console.log(err);
      dispatch(setInstructorsError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_INSTRUCTORS:
      return action.instructors;
    case SET_INSTRUCTORS_ERROR:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
}
