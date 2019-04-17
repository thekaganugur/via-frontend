import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalStyle } from './styles';
import LandingPage from './containers/LandingPage';
import MainPage from './containers/MainPage';
import VideoPage from './containers/VideoPage';

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Switch>
          <Route path="/search/byexample" component={MainPage} />
          <Route path="/search" component={MainPage} />
          <Route path="/uploadVideo" component={MainPage} />
          <Route path="/video/:id" component={VideoPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
