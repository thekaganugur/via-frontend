import { UPDATE_CANVAS } from '../actions/actionTypes';

const initialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  text: ''
};

const canvas = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CANVAS:
      return;
    default:
      return state;
  }
};

export default canvas;
