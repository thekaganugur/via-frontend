import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Player from '../../components/Player';
import Button from '../../components/Styled/Button';

const Container = styled.div`
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
  list(listType, player) {
    return listType.map((listItem, i) => (
      <li key={i}>
        {listItem.name}
        <Button
          clicked={() => {
            console.log('asd' + player.currentTime);
          }}>
          {listItem.time}
        </Button>
      </li>
    ));
  }

  render() {
    const player = this.refs.player;
    return (
      <Container>
        <h1>{this.props.vTitle}</h1>
        <div className="main">
          <Player
            x={this.props.cX}
            y={this.props.cY}
            width={this.props.cWidth}
            height={this.props.cHeight}
            text={this.props.cText}
          />

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
  vWidth: state.canvas.width,
  vHeight: state.canvas.height
});

const mapDispatchToProps = dispatch => ({
  setPaused: () => dispatch(true)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPage);
