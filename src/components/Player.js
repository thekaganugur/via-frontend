import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Player,
  BigPlayButton,
  ControlBar,
  FullscreenToggle
} from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';
import styled from 'styled-components';

//import { updateVideo } from '../store/actions/index.js';

const Container = styled.div`
  canvas {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .positionCanvas {
    position: relative;
  }
`;

class VidPlayer extends Component {
  drawBox(isClear) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    if (isClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillText(
      this.props.text,
      this.props.x + this.props.width / 2,
      this.props.y - 5
    );
    ctx.strokeRect(
      this.props.x,
      this.props.y,
      this.props.width,
      this.props.height
    );
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };

    this.drawBox(false);
  }

  componentDidUpdate() {
    this.drawBox(true);
  }

  render() {
    return (
      <Container>
        <div className="positionCanvas">
          <canvas
            ref="canvas"
            width={this.props.videoWidth}
            height={this.props.videoHeight}
          />
          <Player
            ref="player"
            autoPlay={true}
            fluid={false}
            width={this.props.videoWidth}
            height={this.props.videoHeight}>
            <source src={this.props.videoSrc} />
            <BigPlayButton position="center" />
            <ControlBar>
              <FullscreenToggle disabled />
            </ControlBar>
          </Player>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  videoSrc: state.video.currentSrc,
  videoWidth: state.video.width,
  videoHeight: state.video.height
});

const mapDispatchToProps = dispatch => ({
  setPaused: () => dispatch(true)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VidPlayer);
