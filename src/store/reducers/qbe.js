import * as actionTypes from '../actions/actionTypes';

export default (state = { results: [] }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QBE_START:
      return { ...state, results: [], message: action.message };
    case actionTypes.FETCH_QBE_PROGRESS:
      return {
        ...state,
        progress: action.payload.progress,
        results: action.payload.results
      };
    case actionTypes.FETCH_QBE_SUCCESS:
      return { ...state, message: action.message };
    case actionTypes.FETCH_QBE_CLOSED:
      return { ...state, message: action.message };
    case actionTypes.FETCH_QBE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
