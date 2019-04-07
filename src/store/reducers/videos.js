import { FETCH_VIDEOS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_VIDEOS:
      console.log('in-fetch', action.payload);
      return action.payload.data;

    default:
      console.log('in-default');
      return state;
  }
};
