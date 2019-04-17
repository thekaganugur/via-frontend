const metaData = (state, action) => {
  console.log(action.payload);
  return {
    ...state,
    metaData: {
      title: action.payload.Title,
      path: action.payload.Path,
      width: action.payload.Width,
      height: action.payload.Height
    }
  };
};

export default metaData;
