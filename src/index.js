import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faGlasses,
  faSignOutAlt,
  faAngleDoubleDown,
  faHandPointer,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import * as serviceWorker from './serviceWorker';
import App from './App';
import rootReducer from './store/reducers';

library.add(
  faHandPointer,
  faGithub,
  faGlasses,
  faSignOutAlt,
  faAngleDoubleDown,
  faPlay
);
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <BrowserRouter basename="/via-frontend/">
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
