import React, { Component } from 'react';
import styled from 'styled-components';
import Player from '../../components/Player';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .lists {
      display: flex;
      justify-content: space-between;
      width: 70%;
      padding: 2rem;

      .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 45%;

        ul {
          width: 100%;
          height: 300px;
          overflow: hidden;
          overflow-y: scroll;

          li {
            height: 2.5em;
          }
        }
      }

      &-objects {
      }
      &-anormalities {
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

  generateCoordinates(mv) {
    if (mv === 'l') this.setState({ x: this.state.x - 5 });
    if (mv === 'r') this.setState({ x: this.state.x + 5 });
    if (mv === 'u') this.setState({ y: this.state.y - 5 });
    if (mv === 'd') this.setState({ y: this.state.y + 5 });
  }

  render() {
    return (
      <Container>
        <h1>{this.state.videoTitle}</h1>
        <div className="main">
          <Player
            x={this.state.x}
            y={this.state.y}
            width={this.state.width}
            height={this.state.height}
            text={this.state.text}
          />
          <div className="lists">
            <div className="list lists-objects">
              <h2>Objects</h2>
              <ul>
                <li>
                  asd <button>0.23</button>
                </li>
                <li>Asd</li>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
              </ul>
            </div>
            <div className="list lists-anormalities">
              <h2>Anormalities</h2>
            </div>
          </div>
        </div>

        {/* ---------- */}
        {/* Testing buttons and coordinates */}
        <button onClick={() => this.generateCoordinates('l')}>
          Shift Left
        </button>
        <button onClick={() => this.generateCoordinates('r')}>
          Shift Right
        </button>
        <button onClick={() => this.generateCoordinates('d')}>
          Shift Down
        </button>
        <button onClick={() => this.generateCoordinates('u')}>Shift Up</button>
        <br />
        <br />
        <div>
          x: {this.state.x} / y: {this.state.y}
        </div>
        <div>
          width: {this.state.width} / height: {this.state.height}
        </div>
        {/* ---------- */}
      </Container>
    );
  }
}
export default VideoPage;
