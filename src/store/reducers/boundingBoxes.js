import { INIT_BOUNDINGBOXES } from '../actions/actionTypes';

const initialState = [
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
];

const boundingBoxes = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOUNDINGBOXES:
      return action.payload;
    default:
      return state;
  }
};

export default boundingBoxes;
