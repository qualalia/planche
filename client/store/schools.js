import axios from "axios";

const SET_SCHOOLS = "SET_SCHOOLS";
export const SET_SCHOOLS_ERROR = "SET_SCHOOLS_ERROR";

const setSchools = schools => ({
  type: SET_SCHOOLS,
  schools,
});

const setSchoolsError = error => ({
  type: SET_SCHOOLS_ERROR,
  error,
});

export function fetchSchools() {
  return async dispatch => {
    try {
      const { data, status } = await axios.get(`/api/companies`);
      dispatch(setSchools({ data, status }));
    } catch (err) {
      console.log(err);
      dispatch(setSchoolsError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_SCHOOLS:
      return action.schools;
    case SET_SCHOOLS_ERROR:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
}
