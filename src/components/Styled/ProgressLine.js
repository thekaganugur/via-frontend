import React from 'react';
import styled from 'styled-components';
import { Line } from 'rc-progress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  svg {
    widows: 100%;
  }

  .message {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const input = ({ percent, strokeWidth, strokeColor, message }) => {
  let progressLine = <div />;

  if (percent) {
    progressLine = (
      <Container>
        <div className="message">{message}</div>
        <Line percent={percent} strokeWidth="0.9" strokeColor="#3e9bdc" />
      </Container>
    );
  }

  // if (percent === 100) {
  //   progressLine = <div />;
  // }

  return progressLine;
};

export default input;
