import React, { Component } from 'react';

import { GlobalStyle } from './styles';
import HomePage from './containers/Homepage';

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <HomePage />
      </div>
    );
  }
}

export default App;
