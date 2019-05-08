import * as actionTypes from '../actions/actionTypes';
// import detectedAnomaliesReduces from './detectedAnomalies';
// import detectedObjectsReducer from './detectedObjects';
import metaData from './metaData';

const initialState = {
  metaData: {
    title: 'Undefined Video',
    path: ''
  },
  detectedAnomalies: {
    results: []
  },
  detectedObjects: {
    results: []
  }
  // detectedObjects: [
  //   {
  //     left_x: 182,
  //     top_y: 223,
  //     width: 67,
  //     height: 91,
  //     text: 'Object',
  //     time: 1
  //   },
  //   {
  //     left_x: 282,
  //     top_y: 193,
  //     width: 67,
  //     height: 91,
  //     text: 'Diffrent Object',
  //     time: 2
  //   },
  //   {
  //     left_x: 289,
  //     top_y: 399,
  //     width: 67,
  //     height: 91,
  //     text: 'Diffrent Object',
  //     time: 2.5
  //   },
  //   {
  //     left_x: 325,
  //     top_y: 297,
  //     width: 67,
  //     height: 91,
  //     text: 'Object',
  //     time: 2
  //   },
  //   {
  //     left_x: 289,
  //     top_y: 319,
  //     width: 67,
  //     height: 91,
  //     text: 'Diffrent Object',
  //     time: 2
  //   },
  //   {
  //     left_x: 349,
  //     top_y: 299,
  //     width: 67,
  //     height: 91,
  //     text: 'Object',
  //     time: 2.5
  //   },
  //   {
  //     left_x: 199,
  //     top_y: 289,
  //     width: 67,
  //     height: 91,
  //     text: 'Object',
  //     time: 4
  //   }
  // ],
  // detectedAnomalies: [
  //   {
  //     name: 'detectedAnomaly-1',
  //     time: 2
  //   }
  // ],
  // detectedObjects: [
  //   {
  //     name: 'detectedObject-1',
  //     time: 2
  //   },
  //   {
  //     name: 'detectedObject-1',
  //     time: 8
  //   }
  // ]
};

const video = (state = initialState, action) => {
  switch (action.type) {
    //VIDEO
    case actionTypes.FETCH_VIDEO_START:
      return {
        ...state
      };
    case actionTypes.FETCH_VIDEO_SUCCESS:
      return metaData(initialState, action);
    case actionTypes.FETCH_VIDEO_ERROR:
      return metaData(initialState, action);
    //ANOMALY
    case actionTypes.FETCH_ANOMALIES_START:
      return {
        ...state
      };
    case actionTypes.FETCH_ANOMALIES_SUCCESS:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          results: action.payload
        }
      };
    case actionTypes.FETCH_OBJECT_START:
      return {
        ...state
      };
    case actionTypes.FETCH_OBJECT_SUCCESS:
      return {
        ...state,
        detectedObjects: {
          ...state.detectedObjects,
          results: action.payload
        }
      };

    case actionTypes.FETCH_ANOMALY_START:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          message: action.message
        }
      };
    case actionTypes.FETCH_ANOMALY_PROGRESS:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          progress: action.payload.progress
        }
      };
    case actionTypes.FETCH_ANOMALY_SUCCESS:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          message: action.message
        }
      };
    case actionTypes.FETCH_ANOMALY_CLOSED:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          message: action.message
        }
      };
    case actionTypes.FETCH_ANOMALY_ERROR:
      return {
        ...state,
        detectedAnomalies: {
          ...state.detectedAnomalies,
          error: action.payload
        }
      };

    // ** //
    // case actionTypes.INIT_BOUNDINGBOXES:
    //   return boundingBoxesReducer(initialState, action);
    // case actionTypes.INIT_DETECTED_OBJECTS:
    //   return detectedObjectsReducer(initialState, action);
    default:
      return state;
  }
};

export default video;
