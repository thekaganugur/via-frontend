import React, { Component } from 'react';
import styled from 'styled-components';

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
  state = {
    videoTitle: 'Sample Video',
    x: 100,
    y: 200,
    width: 200,
    height: 200,
    text: 'Hello'
  };

  render() {
    const player = this.refs.player;
    return (
      <Container>
        <h1>{this.state.videoTitle}</h1>
        <div className="main">
          <Player
            ref="player"
            x={this.state.x}
            y={this.state.y}
            width={this.state.width}
            height={this.state.height}
            text={this.state.text}
          />
          <div className="lists">
            <div className="list">
              <h2>Objects</h2>
              <ul>
                <li>
                  asd{' '}
                  <Button
                    onClick={() => {
                      player.pause();
                    }}
                  >
                    0.23
                  </Button>
                </li>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
              </ul>
            </div>
            <div className="list">
              <h2>Anomalies</h2>
              <ul>
                <li>
                  asd{' '}
                  <Button
                    onClick={() => {
                      player.pause();
                    }}
                  >
                    0.23
                  </Button>
                </li>
                <li>asd</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default VideoPage;
