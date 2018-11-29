import React, { Component } from 'react';
import Player from '../../components/Player';

class VideoPage extends Component {
  state = {
    x: 100,
    y: 200,
    width: 200,
    height: 200
  };

  generateCoordinates(mv) {
    if (mv === 'l') this.setState({ x: this.state.x - 5 });
    if (mv === 'r') this.setState({ x: this.state.x + 5 });
    if (mv === 'u') this.setState({ y: this.state.y - 5 });
    if (mv === 'd') this.setState({ y: this.state.y + 5 });
  }

  render() {
    return (
      <>
        <Player
          x={this.state.x}
          y={this.state.y}
          width={this.state.width}
          height={this.state.height}
        />

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
      </>
    );
  }
}
export default VideoPage;
