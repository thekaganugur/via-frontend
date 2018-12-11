// !!
// Implementation of video may change libary uses Redux natively
// https://video-react.js.org/components/player/#getState
// !!

import { INIT_VIDEO, UPDATE_VIDEO } from '../actions/actionTypes';

const initialState = {
  videoTitle: 'Sample Video',
  currentTime: 0,
  paused: false,
  currentSrc: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  width: 800,
  height: 600
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case INIT_VIDEO:
      return {
        ...state,
        videoTitle: action.payload.videoTitle,
        currentSrc: action.payload.currentSrc
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        currentTime: action.payload.currentTime,
        paused: action.payload.paused
      };
    default:
      return state;
  }
};

export default video;
