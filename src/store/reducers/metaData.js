const metaData = (state, action) => {
  return {
    ...state,
    detectedAnomalies: {
      ...state.detectedAnomalies
    },
    detectedObjects: {
      ...state.detectedObjects
    },
    metaData: {
      title: action.payload.title,
      path: action.payload.path,
      width: action.payload.width,
      height: action.payload.height
    }
  };
};

export default metaData;
