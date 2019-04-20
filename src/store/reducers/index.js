import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import videos from './videos';
import qbe from './qbe';

export default combineReducers({
  video: videoReducer,
  videos,
  qbe
});
