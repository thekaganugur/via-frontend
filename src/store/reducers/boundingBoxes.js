import { UPDATE_BOUNDINGBOXES } from '../actions/actionTypes';

const initialState = [
  {
    left_x: 182,
    top_y: 293,
    width: 67,
    height: 91,
    text: 'Car',
    time: 1
  },
  {
    left_x: 185,
    top_y: 297,
    width: 67,
    height: 91,
    text: 'Car',
    time: 2
  },
  {
    left_x: 199,
    top_y: 499,
    width: 67,
    height: 91,
    text: 'Cer',
    time: 4
  },
  {
    left_x: 199,
    top_y: 519,
    width: 67,
    height: 91,
    text: 'Cer',
    time: 5
  }
];

const boundingBoxes = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOUNDINGBOXES:
      return action.payload;
    default:
      return state;
  }
};

export default boundingBoxes;
