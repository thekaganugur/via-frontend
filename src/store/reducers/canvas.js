import { UPDATE_CANVAS } from '../actions/actionTypes';

const initialState = {
  x: 100,
  y: 200,
  width: 200,
  height: 200,
  text: 'Hello'
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
