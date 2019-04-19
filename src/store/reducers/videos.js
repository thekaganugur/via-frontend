import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: true,
  error: false
};

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function msToSec(payload) {
  payload.forEach(video => {
    video.length = millisToMinutesAndSeconds(video.length);
  });
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_VIDEOS_SUCCESS:
      msToSec(action.payload);
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    case actionTypes.FETCH_VIDEOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
