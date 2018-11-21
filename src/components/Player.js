import React, { Component } from 'react';
import { Player, BigPlayButton } from 'video-react';
import '../../node_modules/video-react/dist/video-react.css'; // import css

class VidPlayer extends Component {
  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  render() {
    return (
      <div>
        <Player ref="player" fluid={false} width={500} height={500}>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          <BigPlayButton position="center" />
        </Player>
        {this.refs.player.playbackRate}
      </div>
    );
  }
}

export default VidPlayer;
