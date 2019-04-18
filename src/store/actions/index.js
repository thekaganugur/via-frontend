import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchVideo = () => {
  return dispatch => {
    //TODO change 1 with unique id
    dispatch({
      type: actionTypes.FETCH_VIDEO_START
    });
    axios
      .get(`/video/1`)
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
          payload: res
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
