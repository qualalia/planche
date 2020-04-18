import axios from "axios";
import history from "../history";

const ADD_SINGLE_CLASS = "ADD_SINGLE_CLASS";
const GET_SINGLE_CLASS = "GET_SINGLE_CLASS";
const REMOVE_SINGLE_CLASS = "REMOVE_SINGLE_CLASS";
const SINGLE_CLASS_ERROR = "SINGLE_CLASS_ERROR";

const addSingleClass = classToAdd => ({
  type: ADD_SINGLE_CLASS,
  singleClass: classToAdd,
});

const getSingleClass = singleClass => ({
  type: GET_SINGLE_CLASS,
  singleClass,
});

const removeSingleClass = classId => ({
  type: REMOVE_SINGLE_CLASS,
  classId,
});

const singleClassError = error => ({
  type: SINGLE_CLASS_ERROR,
  error,
});

/**
 * THUNK CREATORS
 */
export function addNewClass(classToAdd) {
  return async dispatch => {
    try {
      const { data } = await axios.post("/circus-classes", classToAdd);
      dispatch(getSingleClass(data));
      history.push(`/api/classes/${data.id}`);
    } catch (err) {
      dispatch(singleClassError(err));
    }
  };
}

export function deleteClass(classId) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/circus-classes/${classId}`);
      dispatch(removeSingleClass(data));
    } catch (err) {
      dispatch(singleClassError(err));
    }
  };
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_CLASS:
      return action.singleClass;
    case SINGLE_CLASS_ERROR:
      return action.error;
    default:
      return state;
  }
}
