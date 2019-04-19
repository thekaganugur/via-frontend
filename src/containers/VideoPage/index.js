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
import drawLine from './drawLine';
import Navigation from '../../components/Navigation';
import { fetchVideo } from '../../store/actions/index';
import Modal from '../../components/Modal';
import SearchByExample from '../MainPage/SearchVideoByEx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

    .dropArea {
      margin-top: 3rem;
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
    this.props.fetchVideo(this.props.match.params.id);

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'yellow';
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.lineWidth = '3';
    // this.drawBox(false);

    this.refs.player.actions.toggleFullscreen = () => {
      console.log('prevent full screen video');
    };
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentDidUpdate() {
    const { renderedBoxes } = this.state;

    this.props.boundingBoxes.forEach(obj => {
      if (
        this.state.player &&
        obj.time === parseFloat(this.state.player.currentTime.toFixed(1))
      ) {
        //this.drawBox(obj, true); /*Render and clear no matter what*/

        // Look if to be rendered object is already rendered on the screen if
        // so we are going to clear it.
        let renderedBoxIndex = renderedBoxes.findIndex(
          last => last.text === obj.text
        );

        // If box is rendered before Meaning it is in the renderedBoxes[]
        if (renderedBoxIndex !== -1) {
          renderedBoxes.splice(renderedBoxIndex, 1);
          this.drawBox(obj, true);
        }
        // If box is not rendered before Meaning it is not in the
        // renderedBoxes[]
        else {
          renderedBoxes.push(obj);
          this.drawBox(obj, false);
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
              <source src={this.props.path} />
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
            <Button clicked={() => this.setState({ isSearchByExample: true })}>
              Query By Example
            </Button>
          </span>
          <Modal
            show={this.state.isSearchByExample}
            handleClose={() => this.setState({ isSearchByExample: false })}
          >
            <SearchByExample />
          </Modal>
          <div className="lists">
            <div className="listContainer">
              <h2>Anomalies</h2>
              <ul className="list">
                {this.renderList(this.props.detectedAnomalies)}
              </ul>
            </div>
            <div className="listContainer">
              <h2>Objects</h2>
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
  detectedAnomalies: state.video.detectedAnomalies,
  detectedObjects: state.video.detectedObjects,
  boundingBoxes: state.video.boundingBoxes,
  title: state.video.metaData.title,
  path: state.video.metaData.path,
  width: state.video.metaData.width,
  height: state.video.metaData.height
});

const mapDispatchToProps = dispatch => ({
  fetchVideo: id => dispatch(fetchVideo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
