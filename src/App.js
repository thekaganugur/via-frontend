import React, { Component } from 'react';

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
        {auth ? <LandingPage /> : <MainPage />}
      </div>
    );
  }
}

export default App;
