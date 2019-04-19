import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchVideo = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_VIDEO_START
    });
    axios
      .get(`/video/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEO_SUCCESS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_VIDEO_ERROR,
          payload: err
        })
      );
  };
};

export const fetchVideos = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_VIDEOS_START
    });
    axios
      .get(`/video`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS_ERROR,
          payload: err
        })
      );
  };
};
