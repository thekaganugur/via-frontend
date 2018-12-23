import { UPDATE_CANVAS } from '../actions/actionTypes';

const initialState = {
  left_x: 100,
  top_y: 200,
  width: 200,
  height: 200,
  text: 'Hello'
};

const boundingBox = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CANVAS:
      return;
    default:
      return state;
  }
};

export default boundingBox;
