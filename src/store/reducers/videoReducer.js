import {
  FETCH_VIDEO,
  INIT_BOUNDINGBOXES,
  INIT_DETECTED_ANOMALIES,
  INIT_DETECTED_OBJECTS
} from '../actions/actionTypes';

import boundingBoxesReducer from './boundingBoxes';
import detectedAnomaliesReduces from './detectedAnomalies';
import detectedObjectsReducer from './detectedObjects';
import metaData from './metaData';

const initialState = {
  metaData: {
    title: 'Sample Video',
    path: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    width: 800,
    height: 600
  },
  boundingBoxes: [
    {
      left_x: 182,
      top_y: 293,
      width: 67,
      height: 91,
      text: 'Object',
      time: 1
    },
    {
      left_x: 282,
      top_y: 393,
      width: 67,
      height: 91,
      text: 'Diffrent Object',
      time: 1
    },
    {
      left_x: 289,
      top_y: 399,
      width: 67,
      height: 91,
      text: 'Diffrent Object',
      time: 1.5
    },
    {
      left_x: 385,
      top_y: 297,
      width: 67,
      height: 91,
      text: 'Object',
      time: 2
    },
    {
      left_x: 289,
      top_y: 319,
      width: 67,
      height: 91,
      text: 'Diffrent Object',
      time: 2
    },
    {
      left_x: 499,
      top_y: 299,
      width: 67,
      height: 91,
      text: 'Object',
      time: 2.5
    },
    {
      left_x: 199,
      top_y: 289,
      width: 67,
      height: 91,
      text: 'Object',
      time: 4
    }
  ],
  detectedAnomalies: [
    {
      name: 'detectedAnomaly-1',
      time: 2
    },
    {
      name: 'detectedAnomaly-1',
      time: 10
    }
  ],
  detectedObjects: [
    {
      name: 'detectedObject-1',
      time: 2
    },
    {
      name: 'detectedObject-1',
      time: 8
    }
  ]
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO:
      return metaData(initialState, action);
    case INIT_BOUNDINGBOXES:
      return boundingBoxesReducer(initialState, action);
    case INIT_DETECTED_ANOMALIES:
      return detectedAnomaliesReduces(initialState, action);
    case INIT_DETECTED_OBJECTS:
      return detectedObjectsReducer(initialState, action);
    default:
      return state;
  }
};

export default video;
