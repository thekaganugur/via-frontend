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
import drawTrackingRect from './drawTrackingRect';
import FileSelect from '../../components/FileSelect';
import ToggleSwitch from '../../components/Styled/ToggleSwitch';
import Navigation from '../../components/Navigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  nav {
    width: 100%;
    height: 4.5rem;
  }

  h1 {
    font-size: 1.4em;
    font-weight: 600;
  }

  .main {
    max-width: 100rem;
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
      &-searchByExample--text {
        margin-right: 1rem;
      }
    }

    .lists {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 4rem 0;

      .listContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;

        .list {
          width: 100%;
          height: 30rem;
          overflow: hidden;
          overflow-y: scroll;

          &-item {
            height: 2.5em;
            padding: 0.2rem 0.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:not(:last-of-type) {
              border-bottom: 1px solid #e0e0e0;
            }

            &-name {
              cursor: pointer;
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
  state = {
    isSearchByExample: false,
    renderedBoxes: [],
    time: 0
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    //this.drawBox(false);

    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentDidUpdate() {
    const { renderedBoxes } = this.state;

    this.props.boundingBoxes.forEach((obj, i) => {
      if (
        this.state.player &&
        obj.time === parseFloat(this.state.player.currentTime.toFixed(1))
      ) {
        //this.drawBox(obj, true); /*Render and clear no matter what*/

        // Look if to be rendered object is already rendered on the screen if so we are going to clear it.
        let renderedBoxIndex = renderedBoxes.findIndex(
          last => last.text === obj.text
        );

        // If box is rendered before
        // Meaning it is in the renderedBoxes[]
        if (renderedBoxIndex !== -1) {
          renderedBoxes.splice(renderedBoxIndex, 1);
          this.drawBox(obj, true);
        }
        // If box is not rendered before
        // Meaning it is not in the renderedBoxes[]
        else {
          renderedBoxes.push(obj);
          this.drawBox(obj, false);
        }
      }
    });
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  drawBox(obj, isClear) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    if (isClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(obj.left_x, obj.top_y, obj.width, obj.height);
    ctx.fillText(obj.text, obj.left_x + obj.width / 2, obj.top_y - 5);
  }

  renderList(listType) {
    return listType.map((listItem, i) => (
      <li key={i} className="list-item">
        <div
          className="list-item-name"
          onClick={() => {
            this.refs.player.seek(listItem.time);
            this.refs.player.play();
          }}
        >
          {listItem.name}
        </div>
        <Button
          clicked={() => {
            this.refs.player.seek(listItem.time);
            this.refs.player.play();
          }}
        >
          Time: {listItem.time}
        </Button>
      </li>
    ));
  }

  render() {
    return (
      <Container>
        <Navigation />
        <h1>{this.props.vTitle}</h1>
        <div className="main">
          <div className="videoContainer">
            <canvas
              id="trackingCanvas"
              width={this.props.vWidth}
              height={this.props.vHeight}
            />
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
              height={this.props.vHeight}
            >
              <source src={this.props.vSrc} />
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
            <div className="funcContainer-searchByExample--text">
              Search by ex:
            </div>
            <ToggleSwitch
              className="funcContainer-searchByExample"
              changed={() =>
                this.setState({
                  isSearchByExample: !this.state.isSearchByExample
                })
              }
              checked={this.state.isSearchByExample}
            />
          </span>
          {this.state.isSearchByExample ? <FileSelect /> : null}
          <div className="lists">
            <div className="listContainer">
              <h2>Objects</h2>
              <ul className="list">
                {this.renderList(this.props.detectedAnomalies)}
              </ul>
            </div>
            <div className="listContainer">
              <h2>Anomalies</h2>
              <ul className="list">
                {this.renderList(this.props.detectedObjects)}
              </ul>
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
  boundingBoxes: state.boundingBoxes,
  //video
  vTitle: state.video.videoTitle,
  vSrc: state.video.currentSrc,
  vWidth: state.video.width,
  vHeight: state.video.height
  //Start Tracking Coordinates
});

const mapDispatchToProps = dispatch => ({
  //updateBoundingBox:
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
