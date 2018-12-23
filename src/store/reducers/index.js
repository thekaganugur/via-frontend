import { combineReducers } from 'redux';
import boundingBox from './boundingBox';
import detectedAnomalies from './detectedAnomalies';
import detectedObjects from './detectedObjects';
import video from './video';

export default combineReducers({
  boundingBox,
  detectedAnomalies,
  detectedObjects,
  video
});
