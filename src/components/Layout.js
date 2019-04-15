import React from 'react';
import Navigation from './Navigation';

export default ({ children }) => (
  <div>
    <Navigation />
    <div className="width-wrapper">{children}</div>
  </div>
);
