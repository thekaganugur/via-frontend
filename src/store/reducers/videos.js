// import { INIT_VIDEO } from '../actions/actionTypes';

const initialState = [
  {
    title: 'a',
    objects: 'xx',
    anomalities: 'xxx'
  },
  {
    title: 'ab',
    objects: 'xx',
    anomalities: 'xxx'
  },
  {
    title: 'abc',
    objects: 'xx',
    anomalities: 'xxx'
  },
  {
    title: 'abcw',
    objects: 'xx',
    anomalities: 'xxx'
  }
];

const videos = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default videos;
