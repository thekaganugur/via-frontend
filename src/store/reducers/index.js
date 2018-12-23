import { combineReducers } from 'redux';
import boundingBoxes from './boundingBoxes';
import detectedAnomalies from './detectedAnomalies';
import detectedObjects from './detectedObjects';
import video from './video';

export default combineReducers({
  boundingBoxes,
  detectedAnomalies,
  detectedObjects,
  video
});
