import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: true,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case actionTypes.FETCH_VIDEOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
