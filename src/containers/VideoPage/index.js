import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Player,
  BigPlayButton,
  ControlBar,
  FullscreenToggle
} from 'video-react';

import '../../../node_modules/video-react/dist/video-react.css';
import Button from '../../components/Styled/Button';

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

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  .main {
    max-width: 100rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .lists {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 4rem 0;

      .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;

        ul {
          width: 100%;
          height: 30rem;
          overflow: hidden;
          overflow-y: scroll;

          li {
            height: 2.5em;
            padding: 0.2rem 0.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:not(:last-of-type) {
              border-bottom: 1px solid #e0e0e0;
            }

            button {
              padding: 0.2rem 0.8rem;
            }
          }
        }
      }
    }
  }
`;

class VideoPage extends Component {
  drawBox(isClear) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    if (isClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillText(
      this.props.cText,
      this.props.cX + this.props.cWidth / 2,
      this.props.cY - 5
    );
    ctx.strokeRect(
      this.props.cX,
      this.props.cY,
      this.props.cWidth,
      this.props.cHeight
    );
  }

  list(listType, player) {
    return listType.map((listItem, i) => (
      <li key={i}>
        {listItem.name}
        <Button
          clicked={() => {
            this.refs.player.seek(listItem.time);
          }}>
          Time: {listItem.time}
        </Button>
      </li>
    ));
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    this.drawBox(false);

    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  componentDidUpdate() {
    this.drawBox(true);
  }

  render() {
    const player = this.refs.player;
    return (
      <Container>
        <h1>{this.props.vTitle}</h1>
        <div className="main">
          <div className="positionCanvas">
            <canvas
              ref="canvas"
              width={this.props.vWidth}
              height={this.props.vHeight}
            />
            <Player
              ref="player"
              autoPlay={true}
              fluid={false}
              width={this.props.vWidth}
              height={this.props.vHeight}>
              <source src={this.props.vSrc} />
              <BigPlayButton position="center" />
              <ControlBar>
                <FullscreenToggle disabled />
              </ControlBar>
            </Player>
          </div>
          <div className="lists">
            <div className="list">
              <h2>Objects</h2>
              <ul>{this.list(this.props.detectedAnomalies, player)}</ul>
            </div>
            <div className="list">
              <h2>Anomalies</h2>
              <ul>{this.list(this.props.detectedObjects, player)}</ul>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  detectedAnomalies: state.detectedAnomalies,
  detectedObjects: state.detectedObjects,
  //canvas
  cX: state.canvas.x,
  cY: state.canvas.y,
  cWidth: state.canvas.width,
  cHeight: state.canvas.height,
  cText: state.canvas.text,
  //video
  vTitle: state.video.videoTitle,
  vSrc: state.video.currentSrc,
  vWidth: state.video.width,
  vHeight: state.video.height
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
