import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchVideo = () => {
  return dispatch => {
    axios
      .get(`/video`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS,
          payload: res
        })
      )
      .catch(res =>
        dispatch({
          type: actionTypes.FETCH_ERROR,
          payload: res.error
        })
      );
  };
};

export const fetchVideos = () => {
  return dispatch => {
    axios
      .get(`/video`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS,
          payload: res
        })
      )
      .catch(res =>
        dispatch({
          type: actionTypes.FETCH_ERROR,
          payload: res.error
        })
      );
  };
};
