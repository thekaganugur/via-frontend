import React from 'react';
import styled from 'styled-components';

const GridVideo = styled.div`
  h3 {
    font-family: 'Open Sans', sans-serif;
  }
`;

const gridVideo = props => (
  <GridVideo>
    <img />
    <h3>Video Title</h3>
    <div className="metadata">
      <div>Detected Ano.</div>
      <div>Detected Obj.</div>
    </div>
  </GridVideo>
);

export default gridVideo;
