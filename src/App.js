import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalStyle } from './styles';
import LandingPage from './containers/LandingPage';
import MainPage from './containers/MainPage';
import Player from './components/Player';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <GlobalStyle />
        <Switch>
          <Route path="/search/byidandnobj/:id" component={Player} />
          <Route path="/search/byidandnobj" component={MainPage} />
          <Route path="/search/byexample" component={MainPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
