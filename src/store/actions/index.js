import * as actionTypes from './actionTypes';

export const initVideo = (videoTitle, currentSrc) => {
  return {
    type: actionTypes.INIT_VIDEO,
    payload: {
      videoTitle: 'Sample',
      currentSrc: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
    }
  };
};

export const updateVideo = (currentTime, paused) => {
  return {
    type: actionTypes.UPDATE_VIDEO,
    payload: {
      currentTime,
      paused
    }
  };
};
