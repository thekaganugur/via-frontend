import { INIT_DETECTED_OBJECTS } from '../actions/actionTypes';

const detectedObjects = (state = [], action) => {
  switch (action.type) {
    case INIT_DETECTED_OBJECTS:
      return;
    default:
      return state;
  }
};

export default detectedObjects;
