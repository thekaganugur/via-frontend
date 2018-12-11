import { INIT_DETECTED_OBJECTS } from '../actions/actionTypes';

const initialState = [
  {
    name: 'detectedObject-1',
    time: 2
  },
  {
    name: 'detectedObject-1',
    time: 8
  }
];

const detectedObjects = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DETECTED_OBJECTS:
      return;
    default:
      return state;
  }
};

export default detectedObjects;
