import { combineReducers } from 'redux';
import canvas from './canvas';
import detectedAnomalies from './detectedAnomalies';
import detectedObjects from './detectedObjects';
import video from './video';

export default combineReducers({
  canvas,
  detectedAnomalies,
  detectedObjects,
  video
});
