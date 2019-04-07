import { INIT_VIDEO } from '../actions/actionTypes';

const initialState = {
  videoTitle: 'Sample Video',
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
    default:
      return state;
  }
};

export default video;
