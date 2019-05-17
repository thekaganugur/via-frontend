import * as actionTypes from '../actions/actionTypes';
import metaData from './metaData';

const initialState = {
  metaData: {},
  detectedAnomalies: {
    results: []
  },
  detectedObjects: {
    results: []
  },
  drawLineRes: {
    results: []
  }
};

const video = (state = initialState, action) => {
  switch (action.type) {
    //VIDEO
    case actionTypes.FETCH_VIDEO_START:
      return {
        ...state,
        metaData: {
          title: 'Undefined Video',
          path: ''
        },
        detectedAnomalies: {
          results: []
        },
        detectedObjects: {
          results: []
        },
        drawLineRes: {
          results: []
        }
      };
    case actionTypes.FETCH_VIDEO_SUCCESS:
      return metaData(state, action);
    case actionTypes.FETCH_VIDEO_ERROR:
      return metaData(state, action);
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

    case actionTypes.DRAW_LINE_SUCCESS:
      return {
        ...state,
        drawLineRes: {
          ...state.drawLineRes,
          results: action.payload
        }
      };

    default:
      return state;
  }
};

export default video;
