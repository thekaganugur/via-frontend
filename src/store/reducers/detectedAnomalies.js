import { INIT_DETECTED_ANOMALIES } from '../actions/actionTypes';

const detectedAnomalies = (state = [], action) => {
  switch (action.type) {
    case INIT_DETECTED_ANOMALIES:
      return;
    default:
      return state;
  }
};

export default detectedAnomalies;
