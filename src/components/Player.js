import React, { Component } from 'react';
// import { initDraw } from './drawBox';
import {
  Player,
  BigPlayButton,
  ControlBar,
  FullscreenToggle
} from 'video-react';
import '../../node_modules/video-react/dist/video-react.css'; // import css
import styled from 'styled-components';

const Container = styled.div`
  canvas {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    /* For disabling clicks on canvas */
    pointer-events: none;
  }

  .positionCanvas {
    position: relative;
  }
  /* #canvas {
    width: 800px;
    height: 600px;
    border: 10px solid transparent;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
  }

  .rectangle {
    border: 1px solid #ff0000;
    position: absolute;
  } */
`;

class VidPlayer extends Component {
  componentDidMount() {
    // console.log(initDraw(document.getElementById('canvas')));
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const player = this.refs.player;

    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    player.play();

    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    // Draw a box - (x, y, width, height)
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

  componentDidUpdate() {
    const player = this.refs.player;
    player.seek(20);
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  render() {
    return (
      <Container>
        <div className="positionCanvas">
          <canvas ref="canvas" width={800} height={600} />
          <Player ref="player" fluid={false} width={800} height={600}>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            {/* <div id="canvas" /> */}
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

export default VidPlayer;
