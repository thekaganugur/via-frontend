import * as actionTypes from './actionTypes';

export const updateBoundingBoxes = boundingBoxMeta => {
  //  boundingBoxMeta.forEach(obj) {}
  return {
    type: actionTypes.UPDATE_BOUNDINGBOXES,
    payload: {
      left_x: boundingBoxMeta.left_x,
      top_y: boundingBoxMeta.top_y,
      width: boundingBoxMeta.width,
      height: boundingBoxMeta.height,
      text: boundingBoxMeta.text
    }
  };
};

export const initVideo = (videoTitle, currentSrc) => {
  return {
    type: actionTypes.INIT_VIDEO,
    payload: {
      videoTitle: 'Sample',
      currentSrc: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
    }
  };
};
