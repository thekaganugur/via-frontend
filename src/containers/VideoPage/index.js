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
  fetchAnomaly
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
    flex-direction: column;
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
      align-items: center;

      &-tracking {
        margin-right: 3rem;
      }
    }

    .lists {
      display: flex;
      justify-content: space-between;
      width: 40%;
      padding: 4rem 0;
    }
  }
`;

class VideoPage extends Component {
  state = {
    videoInit: false,
    isSearchByExample: false,
    qbeLive: true,
    anomalyLive: false
  };

  componentDidMount() {
    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.props.fetchVideo(this.props.match.params.id);
    this.props.fetchAnomalies(this.props.match.params.id);
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

    if (this.state.videoInit && this.state.qbeLive) {
      const time = this.state.player.currentTime;
      this.conditionalDrawBox(this.props.qbeBoundingBoxes, time);
    }
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
      source: `http://34.74.68.244:3000/static/${this.relativePath()}`
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
            </div>
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
                clicked={() => this.setState({ isSearchByExample: true })}
              >
                Query By Example
              </Button>
            </span>
            <Modal
              show={this.state.isSearchByExample}
              handleClose={() => this.setState({ isSearchByExample: false })}
            >
              <SearchByExample id={this.props.match.params.id} />
            </Modal>
            <div className="lists">
              <List
                title="Qbe"
                listItems={this.props.qbeBoundingBoxes}
                clickedListItem={time =>
                  this.handleListClick(this.props.qbeBoundingBoxes, time)
                }
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
  qbeBoundingBoxes: state.qbe.results,
  title: state.video.metaData.title,
  path: state.video.metaData.path,
  width: state.video.metaData.width,
  height: state.video.metaData.height
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: id => dispatch(fetchVideo(id)),
  fetchAnomalies: id => dispatch(fetchAnomalies(id)),
  fetchAnomaly: (anomaly, id) => dispatch(fetchAnomaly(anomaly, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
