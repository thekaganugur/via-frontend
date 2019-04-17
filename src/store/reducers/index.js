import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import videos from './videos';

export default combineReducers({
  video: videoReducer,
  videos
});
