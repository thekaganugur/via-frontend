import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchVideo = id => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_VIDEO_START });
    axios
      .get(`/video/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEO_SUCCESS,
          payload: res.data.data.video
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_VIDEO_ERROR,
          payload: err
        })
      );
  };
};

export const fetchVideos = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_VIDEOS_START });
    axios
      .get(`/video`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: res.data.data.videos
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_VIDEOS_ERROR,
          payload: err
        })
      );
  };
};

export const fetchAnomalies = id => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ANOMALIES_START });
    axios
      .get(`/anomaly/linecrossing/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.FETCH_ANOMALIES_SUCCESS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.FETCH_ANOMALIES_ERROR,
          payload: err
        })
      );
  };
};

export const fetchAnomaly = (anomaly, videoId) => {
  const codes = {
    STARTED: 10,
    INTERNAL_SERVER_ERROR: 1,
    TERMINATED_BY_USER: 20,
    COMPLETED_SUCCESSFULLY: 0,
    PROGRESS: 4,
    BAD_REQUEST: 5,
    OK: 6
  };

  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ANOMALY_START, message: 'Started' });

    const setanomalyResult = result => {
      dispatch({
        type: actionTypes.FETCH_ANOMALY_PROGRESS,
        payload: result
      });
    };

    const setanomalyMessage = (type, message, videoId) => {
      dispatch({ type, message, videoId });
    };

    let startWS = undefined;
    let results = [];

    startWS && startWS.close();

    startWS = new WebSocket('ws://34.74.68.244:3000');

    startWS.onopen = function() {
      startWS.send(
        JSON.stringify({
          route: 'start-anomaly',
          data: {
            videoId: parseInt(videoId),
            line_coord1_x: anomaly.line_coord1_x
              ? parseFloat(anomaly.line_coord1_x)
              : undefined,
            line_coord1_y: anomaly.line_coord1_y
              ? parseFloat(anomaly.line_coord1_x)
              : undefined,
            line_coord2_x: anomaly.line_coord2_x
              ? parseInt(anomaly.line_coord1_x)
              : undefined,
            line_coord2_y: anomaly.line_coord2_y
              ? parseInt(anomaly.line_coord2_y)
              : undefined
          }
        })
      );
    };

    startWS.onmessage = function(evt) {
      let watchWS = undefined;
      const startM = JSON.parse(evt.data);

      // anomaly.terminate.onclick = async () => {
      //   await (await fetch(
      //     `${endPoint}/query/terminate-operation/${startM.data.operationId}`
      //   )).json();
      // };

      const startStatus = startM.status;

      switch (startStatus) {
        case codes.INTERNAL_SERVER_ERROR:
          console.log(startM);
          break;
        case codes.COMPLETED_SUCCESSFULLY:
          setanomalyMessage(
            actionTypes.FETCH_QBE_SUCCESS,
            'Completed',
            videoId
          );
          break;
        case codes.OK:
          watchWS && watchWS.close();

          watchWS = new WebSocket('ws://34.74.68.244:3000');

          watchWS.onopen = function() {
            watchWS.send(
              JSON.stringify({
                route: 'anomaly-watch-operation',
                data: { operationId: startM.data.operationId }
              })
            );
          };

          watchWS.onmessage = async function(evt) {
            const watchM = JSON.parse(evt.data);
            const watchStatus = watchM.status;
            // setanomalyResult(watchM);
            switch (watchStatus) {
              case codes.PROGRESS:
                setanomalyResult({
                  videoId: parseInt(videoId),
                  progress: watchM.data.progress,
                  results: results
                });
                break;
              default:
                console.log(watchM);
            }
          };
          watchWS.onclose = function() {
            setanomalyMessage(
              actionTypes.FETCH_QBE_CLOSED,
              'Watch Connection is closed',
              videoId
            );
          };
          break;
        default:
          console.log(startM);
          break;
      }
      /* eslint-enable */
    };
    startWS.onclose = function() {
      setanomalyMessage(
        actionTypes.FETCH_QBE_CLOSED,
        'Connection is closed',
        videoId
      );
    };
  };
};

export const fetchQBE = formData => {
  const codes = {
    STARTED: 10,
    INTERNAL_SERVER_ERROR: 1,
    TERMINATED_BY_USER: 20,
    COMPLETED_SUCCESSFULLY: 0,
    PROGRESS: 4,
    BAD_REQUEST: 5,
    OK: 6
  };

  return dispatch => {
    dispatch({ type: actionTypes.FETCH_QBE_START, message: 'Started' });

    const setQBEResult = result => {
      dispatch({
        type: actionTypes.FETCH_QBE_PROGRESS,
        payload: result
      });
    };

    const setQBEMessage = (type, message, videoId) => {
      dispatch({ type, message, videoId });
    };

    let startWS = undefined;
    const results = [];
    const reader = new FileReader();

    reader.onloadend = function() {
      startWS && startWS.close();

      startWS = new WebSocket('ws://34.74.68.244:3000');

      console.log(formData);

      startWS.onopen = function() {
        startWS.send(
          JSON.stringify({
            route: 'start-qbe',
            data: {
              userId: 1,
              videoId: parseInt(formData.id),
              encodedImage: reader.result,
              min: formData.similarity
                ? parseFloat(formData.similarity)
                : undefined,
              begin: formData.from ? parseInt(formData.from) : undefined,
              end: formData.to ? parseInt(formData.to) : undefined
            }
          })
        );
      };

      startWS.onmessage = function(evt) {
        let watchWS = undefined;
        const startM = JSON.parse(evt.data);

        // fetch(
        //   `${endPoint}/search/terminate-qbe?operationId=${
        //     startM.data.operationId
        //   }`
        // ).json();

        const startStatus = startM.status;

        switch (startStatus) {
          case codes.INTERNAL_SERVER_ERROR:
            console.log(startM);
            break;
          case codes.COMPLETED_SUCCESSFULLY:
            setQBEMessage(
              actionTypes.FETCH_QBE_SUCCESS,
              'Completed',
              formData.id
            );
            break;
          case codes.OK:
            watchWS && watchWS.close();

            watchWS = new WebSocket('ws://34.74.68.244:3000');

            watchWS.onopen = function() {
              watchWS.send(
                JSON.stringify({
                  route: 'watch-operation',
                  data: { operationId: startM.data.operationId }
                })
              );
            };

            watchWS.onmessage = async function(evt) {
              const watchM = JSON.parse(evt.data);
              const watchStatus = watchM.status;
              switch (watchStatus) {
                case codes.PROGRESS:
                  if (watchM.data.results.length) {
                    results.push(...watchM.data.results);
                  }
                  setQBEResult({
                    videoId: parseInt(formData.id),
                    progress: watchM.data.progress,
                    results: results
                  });
                  break;
                default:
                  console.log(watchM);
              }
            };
            watchWS.onclose = function() {
              setQBEMessage(
                actionTypes.FETCH_QBE_CLOSED,
                'Watch Connection is closed',
                formData.id
              );
            };
            break;
          default:
            console.log(startM);
            break;
        }
      };
      startWS.onclose = function() {
        setQBEMessage(
          actionTypes.FETCH_QBE_CLOSED,
          'Connection is closed',
          formData.id
        );
      };
    };

    reader.readAsDataURL(formData.files[0]);
  };
};

export const terminateQBE = () => {};
