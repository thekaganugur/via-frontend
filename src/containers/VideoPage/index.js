import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Player,
  BigPlayButton,
  ControlBar,
  FullscreenToggle
} from 'video-react';

import Layout from '../../components/Layout';
import '../../../node_modules/video-react/dist/video-react.css';
import Button from '../../components/Styled/Button';
import drawTrackingRect from './drawTrackingRect';
import drawLine from './drawLine';
import {
  fetchVideo,
  fetchAnomalies,
  fetchAnomaly,
  fetchObjects
} from '../../store/actions/index';
import Modal from '../../components/Modal';
import SearchByExample from '../MainPage/SearchVideoByEx';
import List from '../../components/Styled/List';
import ProgressLine from '../../components/Styled/ProgressLine';
import Select from '../../components/Styled/Select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  select {
    padding: 0.3rem 0.8rem;
    margin: 0.4rem 0 1rem 0;
  }

  .main {
    width: 100%;
    display: flex;
    align-items: center;

    .videoContainer {
      position: relative;
      margin-bottom: 2rem;

      canvas {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        pointer-events: none;
      }
    }

    .funcContainer {
      display: flex;
      padding: 0;
      align-items: center;
      justify-content: space-between;

      &-tracking {
        margin: 1rem 2rem;
      }
    }

    .lists {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: auto 0;
      /* padding: 4rem 0; */
    }
  }
`;

class VideoPage extends Component {
  state = {
    videoInit: false,
    isSearchByExample: false,
    liveQbe: false,
    liveAnomaly: false,
    liveObject: false,
    liveDrawLine: false,
    anomalySelect: 'Line Crossing'
  };

  componentDidMount() {
    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.props.fetchVideo(this.props.match.params.id);
    this.props.fetchAnomalies(this.props.match.params.id);
    this.props.fetchObjects(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.path && !this.state.videoInit) {
      this.setState({ videoInit: true });
      this.changeSource();
    }

    if (this.state.videoInit && !this.state.player.paused) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  playBBoxes(bBoxes, list) {
    if (bBoxes.length === 0) {
      return;
    }
    var i = bBoxes[0].frameNo;
    var frame = bBoxes[bBoxes.length - 1].frameNo;
    this.refs.player.pause();
    this.setState({ liveQbe: false });
    this.setState({ liveAnomaly: false });
    this.setState({ liveObject: false });
    this.setState({ liveDrawLine: false });
    this.setState({ [list]: true });

    const myLoop = () => {
      setTimeout(() => {
        i++;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let drawList = bBoxes.filter(bboxdetail => {
          return bboxdetail.frameNo === i;
        });

        if (drawList.length === 0) {
        }
        console.log(i, drawList);

        if (i === frame - 1) {
          this.setState({ [list]: false });
        }

        this.refs.player.seek(i / 12);
        drawList.forEach(box => {
          if (box.boundary) {
            this.drawBox(box.boundary);
          } else {
            this.drawBox(box);
            if (box.params) {
              const params = JSON.parse(box.params);
              this.drawAnomalyLine(params[2], params[3], params[4], params[5]);
            }
          }
        });

        if (i < frame && this.state[list]) {
          myLoop();
        }
      }, 500);
    };

    myLoop();
  }

  playBBoxesForQbe(bBoxes, list) {
    if (bBoxes.length === 0) {
      return;
    }
    var i = 0;
    this.refs.player.pause();
    this.setState({ liveQbe: false });
    this.setState({ liveAnomaly: false });
    this.setState({ liveObject: false });
    this.setState({ liveDrawLine: false });
    this.setState({ [list]: true });

    const myLoop = () => {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      setTimeout(() => {
        if (i === bBoxes.length - 1) {
          this.setState({ [list]: false });
        }
        this.refs.player.seek(bBoxes[i].frameNo / 12);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBox(bBoxes[i].boundary);

        i++;
        if (i < bBoxes.length && this.state[list]) {
          myLoop();
        }
      }, 500);
    };

    myLoop();
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  drawBox(bBox) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.setLineDash([0]);
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.lineWidth = '3';
    ctx.strokeRect(bBox.left, bBox.top, bBox.width, bBox.height);
    if (bBox.label) {
      ctx.fillText(bBox.label, bBox.left + bBox.width / 2, bBox.top - 5);
    }
  }

  drawAnomalyLine(startX, startY, lineX, lineY) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.setLineDash([4]);
    ctx.strokeStyle = 'Cyan';
    ctx.lineWidth = '3';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(lineX, lineY);
    ctx.stroke();
  }

  conditionalDrawBox(bBoxes, time) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bBoxes.forEach(bBox => {
      if ((bBox.frameNo / 12).toFixed() === time.toFixed()) {
        if (bBox.boundary) {
          this.drawBox(bBox.boundary);
        } else {
          this.drawBox(bBox);
          if (bBox.params) {
            const params = JSON.parse(bBox.params);
            this.drawAnomalyLine(params[2], params[3], params[4], params[5]);
          }
        }
      }
    });
  }

  handleListClick(bBoxes, time) {
    let drawList = bBoxes.filter(bboxdetail => {
      return bboxdetail.frameNo === time;
    });
    this.refs.player.pause();
    this.refs.player.seek(time / 12);
    this.conditionalDrawBox(drawList, time / 12);
  }

  changeSource() {
    this.setState({
      source: `http://104.196.71.143:3000/static/${this.relativePath()}`
    });
    this.refs.player.load();
  }

  relativePath() {
    const path = this.props.path;
    const index = path.indexOf('/media-source/');
    return path.substring(index + '/media-source/'.length);
  }

  filterAnomalies() {
    return this.props.detectedAnomalies.results.filter(anomaly => {
      switch (this.state.anomalySelect) {
        case 'Line Crossing':
          return anomaly.rule_id === 2;
        case 'Crowd Detection':
          return anomaly.rule_id === 3;
        case 'Activity Detection':
          return anomaly.rule_id === 1;
      }
    });
  }

  render() {
    const renderProgress = (
      <ProgressLine
        percent={this.props.detectedAnomalies.progress}
        message={'Detecting Anomalies'}
      />
    );

    return (
      <Layout>
        <Container>
          <Modal
            show={this.state.isSearchByExample}
            handleClose={() => this.setState({ isSearchByExample: false })}
          >
            <SearchByExample id={this.props.match.params.id} />
          </Modal>

          <h1>{this.props.title}</h1>
          <div className="main">
            <div className="videoContainer">
              <canvas
                id="trackingCanvas"
                width={this.props.width}
                height={this.props.height}
              />
              <canvas
                ref="canvas"
                width={this.props.width}
                height={this.props.height}
              />
              <Player
                ref="player"
                autoPlay={true}
                fluid={false}
                width={this.props.width}
                height={this.props.height}
              >
                <BigPlayButton className="big-play-button-hide" />
                <source src={this.state.source} />
                <ControlBar>
                  <FullscreenToggle disabled />
                </ControlBar>
              </Player>
              {renderProgress}
              <span className="funcContainer">
                <Button
                  className="funcContainer-tracking"
                  clicked={() => drawTrackingRect()}
                >
                  Start tracking
                </Button>
                <Button
                  className="funcContainer-tracking"
                  clicked={() =>
                    drawLine().then(val => {
                      console.log(val);
                      this.props.fetchAnomaly(val, this.props.match.params.id);
                    })
                  }
                >
                  Draw line for line crossing
                </Button>
                <Button
                  className="funcContainer-tracking"
                  clicked={() => this.setState({ isSearchByExample: true })}
                >
                  Query By Example
                </Button>
              </span>
            </div>

            <div className="lists">
              <List
                title="Query By Example"
                listItems={this.props.qbeBoundingBoxes}
                clickedListItem={time =>
                  this.handleListClick(this.props.qbeBoundingBoxes, time)
                }
                isPlaying={this.state.liveQbe}
                clickedPlay={() => {
                  this.playBBoxesForQbe(this.props.qbeBoundingBoxes, 'liveQbe');
                }}
                clickedPause={() => {
                  this.setState({ liveQbe: false });
                }}
              />

              <List
                title="Detected Anomalies"
                listItems={this.filterAnomalies()}
                clickedListItem={time =>
                  this.handleListClick(this.filterAnomalies(), time)
                }
                isPlaying={this.state.liveAnomaly}
                clickedPlay={() => {
                  this.playBBoxes(this.filterAnomalies(), 'liveAnomaly');
                }}
                clickedPause={() => {
                  this.setState({ liveAnomaly: false });
                }}
              >
                <Select
                  value={this.state.anomalySelect}
                  changed={e => {
                    this.props.detectedAnomalies.results.map(anomaly => {
                      switch (e.target.value) {
                        case 'Line Crossing':
                          if (anomaly.rule_id === 2) {
                            this.setState({ anomalySelect: e.target.value });
                          }
                          break;
                        case 'Crowd Detection':
                          if (anomaly.rule_id === 3) {
                            this.setState({ anomalySelect: e.target.value });
                          }
                          break;
                        case 'Activity Detection':
                          if (anomaly.rule_id === 1) {
                            this.setState({ anomalySelect: e.target.value });
                          }
                          break;
                      }
                    });
                  }}
                >
                  <option>Line Crossing</option>
                  <option>Crowd Detection</option>
                  <option>Activity Detection</option>
                </Select>
              </List>
              <List
                title="Detected Objects"
                listItems={this.props.detectedObjects.results}
                clickedListItem={time =>
                  this.handleListClick(this.props.detectedObjects.results, time)
                }
                isPlaying={this.state.liveObject}
                clickedPlay={() => {
                  this.playBBoxes(
                    this.props.detectedObjects.results,
                    'liveObject'
                  );
                }}
                clickedPause={() => {
                  this.setState({ liveObject: false });
                }}
              />

              <List
                title="Drawed line result"
                listItems={this.props.drawLineRes.results}
                clickedListItem={time =>
                  this.handleListClick(this.props.drawLineRes.results, time)
                }
                isPlaying={this.state.liveDrawLine}
                clickedPlay={() => {
                  this.playBBoxes(
                    this.props.drawLineRes.results,
                    'liveDrawLine'
                  );
                }}
                clickedPause={() => {
                  this.setState({ liveDrawLine: false });
                }}
              />
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  detectedObjects: state.video.detectedObjects,
  detectedAnomalies: state.video.detectedAnomalies,
  drawLineRes: state.video.drawLineRes,
  qbeBoundingBoxes: state.video.qbe.results,
  title: state.video.metaData.title,
  path: state.video.metaData.path,
  width: state.video.metaData.width,
  height: state.video.metaData.height
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: id => dispatch(fetchVideo(id)),
  fetchAnomalies: id => dispatch(fetchAnomalies(id)),
  fetchAnomaly: (anomaly, id) => dispatch(fetchAnomaly(anomaly, id)),
  fetchObjects: id => dispatch(fetchObjects(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
