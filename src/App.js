import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { GlobalStyle } from './styles';
import LandingPage from './containers/LandingPage';
import MainPage from './containers/MainPage';

const auth = true;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Route path="/landing" compoment={LandingPage} />
        <Route path="/search/byidandnobj" compoment={MainPage} />
        <Route path="/search/byexample" compoment={MainPage} />
        {auth ? <LandingPage /> : <MainPage />}
      </div>
    );
  }
}

export default App;
