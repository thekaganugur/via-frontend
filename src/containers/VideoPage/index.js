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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
      padding: 0 6rem;
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
    liveDrawLine: false
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
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'yellow';
      ctx.fillStyle = 'yellow';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.lineWidth = '3';
      this.changeSource();
    }

    // if (this.state.videoInit && this.state.qbeLive) {
    //   const time = this.state.player.currentTime;
    //   this.conditionalDrawBox(this.props.qbeBoundingBoxes, time);
    // }
  }

  playBBoxes(bBoxes, list) {
    if (bBoxes.length === 0) {
      return;
    }
    var i = 1;
    this.refs.player.pause();
    this.setState({ liveQbe: false });
    this.setState({ liveAnomaly: false });
    this.setState({ liveObject: false });
    this.setState({ liveDrawLine: false });
    this.setState({ [list]: true });

    const myLoop = () => {
      setTimeout(() => {
        i++;

        if (i === bBoxes.length - 1) {
          this.setState({ [list]: false });
        }
        this.refs.player.seek(bBoxes[i].frameNo / 12);
        if (bBoxes[i].boundary) {
          this.drawBox(bBoxes[i].boundary);
        } else {
          this.drawBox(bBoxes[i]);
        }
        if (i < bBoxes.length && this.state[list]) {
          myLoop();
        }
      }, 400);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(bBox.left, bBox.top, bBox.width, bBox.height);
  }

  conditionalDrawBox(bBoxes, time) {
    bBoxes.forEach(bBox => {
      if ((bBox.frameNo / 12).toFixed() === time.toFixed()) {
        if (bBox.boundary) {
          this.drawBox(bBox.boundary);
        } else {
          this.drawBox(bBox);
        }
      }
    });
  }

  handleListClick(bBoxes, time) {
    this.refs.player.seek(time);
    this.conditionalDrawBox(bBoxes, time);
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
                <source src={this.state.source} />
                <BigPlayButton position="center" />
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
                      this.props.fetchAnomaly(val, this.props.match.params.id);
                    })
                  }
                >
                  Draw line
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
                title="Qbe"
                listItems={this.props.qbeBoundingBoxes}
                clickedListItem={time =>
                  this.handleListClick(this.props.qbeBoundingBoxes, time)
                }
                isPlaying={this.state.liveQbe}
                clickedPlay={() => {
                  this.playBBoxes(this.props.qbeBoundingBoxes, 'liveQbe');
                }}
                clickedPause={() => {
                  this.setState({ liveQbe: false });
                }}
              />
              <List
                title="Detected Anomalies"
                listItems={this.props.detectedAnomalies.results}
                clickedListItem={time =>
                  this.handleListClick(
                    this.props.detectedAnomalies.results,
                    time
                  )
                }
                isPlaying={this.state.liveAnomaly}
                clickedPlay={() => {
                  this.playBBoxes(
                    this.props.detectedAnomalies.results,
                    'liveAnomaly'
                  );
                }}
                clickedPause={() => {
                  this.setState({ liveAnomaly: false });
                }}
              />
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
                title="Draw line res"
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
  qbeBoundingBoxes: state.qbe.results,
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
