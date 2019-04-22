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
import { fetchVideo } from '../../store/actions/index';
import Modal from '../../components/Modal';
import SearchByExample from '../MainPage/SearchVideoByEx';
import List from '../../components/Styled/List';

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
    isSearchByExample: false,
    videoInit: false,
    time: 0
  };

  componentDidMount() {
    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));

    this.props.fetchVideo(this.props.match.params.id);

    // const canvas = this.refs.canvas;
    // const ctx = canvas.getContext('2d');
    // ctx.strokeStyle = 'yellow';
    // ctx.fillStyle = 'yellow';
    // ctx.font = '20px Arial';
    // ctx.textAlign = 'center';
    // ctx.lineWidth = '3';
    // this.drawBox(false);
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

    const renderedBoxes = this.props.boundingBoxes;

    this.props.boundingBoxes.forEach(bBox => {
      if (
        this.state.player &&
        this.state.player.currentTime &&
        bBox.time === parseFloat(this.state.player.currentTime.toFixed(1))
      ) {
        //this.drawBox(bBox, true); /*Render and clear no matter what*/

        // Look if to be rendered object is already rendered on the screen if
        // so we are going to clear it.
        let renderedBoxIndex = renderedBoxes.findIndex(
          last => last.text === bBox.text
        );

        // If box is rendered before Meaning it is in the renderedBoxes[]
        if (renderedBoxIndex !== -1) {
          renderedBoxes.splice(renderedBoxIndex, 1);
          this.drawBox(bBox, true);
        }
        // If box is not rendered before Meaning it is not in the
        // renderedBoxes[]
        else {
          renderedBoxes.push(bBox);
          this.drawBox(bBox, false);
        }
      }
    });
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  drawBox(bBox, isClear) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    if (isClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(bBox.left, bBox.top, bBox.width, -bBox.height);
    // ctx.fillText(bBox.text, bBox.left_x + bBox.width / 2, bBox.top_y - 5);
  }

  conditionalDrawBox(bBoxes, time) {
    bBoxes.forEach(bBox => {
      if (this.state.player && (bBox.frameNo / 12).toFixed(1) === time) {
        console.log(bBox);
        this.drawBox(bBox.boundary, true);
      }
    });
  }

  handleListClick(time) {
    this.refs.player.seek(time);
    // this.refs.player.play();
    this.conditionalDrawBox(this.props.qbeBoundingBoxes, time);
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
            <span className="funcContainer">
              <Button
                className="funcContainer-tracking"
                clicked={() => drawTrackingRect()}
              >
                Start tracking
              </Button>
              <Button
                className="funcContainer-tracking"
                clicked={() => drawLine()}
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
                clickedListItem={time => this.handleListClick(time)}
              />

              {/* <List */}
              {/*   title="Anomalies" */}
              {/*   listItems={this.props.detectedAnomalies} */}
              {/*   clickedListItem={time => this.handleListClick(time)} */}
              {/* /> */}
              {/* <List */}
              {/*   title="Objects" */}
              {/*   listItems={this.props.detectedObjects} */}
              {/*   clickedListItem={time => this.handleListClick(time)} */}
              {/* /> */}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  detectedAnomalies: state.video.detectedAnomalies,
  detectedObjects: state.video.detectedObjects,
  boundingBoxes: state.video.boundingBoxes,
  title: state.video.metaData.title,
  path: state.video.metaData.path,
  width: state.video.metaData.width,
  height: state.video.metaData.height,

  qbeBoundingBoxes: state.qbe.results
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: id => dispatch(fetchVideo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
