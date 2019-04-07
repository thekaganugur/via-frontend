import axios from 'axios';
import * as actionTypes from './actionTypes';

const ROOT_URL = 'http://localhost:3001';

export const fetchVideos = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/videos`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS,
          payload: response
        })
      )
      .catch(response =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS,
          error: response.error
        })
      );
  };
};
