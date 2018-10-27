import React, { Component } from 'react';

import GlobalStyle from './globalStyle';
import HomePage from './containers/Homepage';


class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <GlobalStyle />
        <HomePage />
      </div>
    );
  }
}

export default App;
