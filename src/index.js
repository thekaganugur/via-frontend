import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faGlasses,
  faSignOutAlt,
  faAngleDoubleDown,
  faPlay,
  faFileUpload
} from '@fortawesome/free-solid-svg-icons';

import * as serviceWorker from './serviceWorker';
import App from './App';
import rootReducer from './store/reducers';

library.add(
  faGithub,
  faGlasses,
  faSignOutAlt,
  faAngleDoubleDown,
  faPlay,
  faFileUpload
);

axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://34.74.68.244:3000';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
