import { INIT_DETECTED_ANOMALIES } from '../actions/actionTypes';

const initialState = [
  {
    name: 'detectedAnomaly-1',
    time: 2
  },
  {
    name: 'detectedAnomaly-1',
    time: 10
  }
];

const detectedAnomalies = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DETECTED_ANOMALIES:
      return;
    default:
      return state;
  }
};

export default detectedAnomalies;
