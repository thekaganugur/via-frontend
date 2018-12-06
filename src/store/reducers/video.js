// !!
// Implementation of video may change libary uses Redux natively
// https://video-react.js.org/components/player/#getState
// !!

import { INIT_VIDEO, UPDATE_VIDEO } from '../actions/actionTypes';

const initialState = {
  videoTitle: '',
  currentTime: 0,
  paused: true,
  currentSrc: ''
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case INIT_VIDEO:
      return;
    case UPDATE_VIDEO:
      return;
    default:
      return state;
  }
};

export default video;
