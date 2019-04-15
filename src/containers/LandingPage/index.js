import React from 'react';

import HeroHeader from './HeroHeader';
import Login from './Login';
import Footer from './Footer';
import Signup from './Signup';

const homepage = props => (
  <div>
    <HeroHeader />
    {props.location.pathname === '/signup' ? <Signup /> : <Login />}
    <Footer />
  </div>
);

export default homepage;
