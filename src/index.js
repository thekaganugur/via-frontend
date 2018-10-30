import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {faGlasses, faSignOutAlt, faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
 
library.add(faGithub,faGlasses, faSignOutAlt, faAngleDoubleDown);


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
