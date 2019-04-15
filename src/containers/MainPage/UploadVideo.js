import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  #explainer {
    margin-bottom: 40px;
  }
`;

const uploadVideo = () => {
  return (
    <Container>
      <p id="explainer">Upload video</p>
      <input type="file" multiple />
    </Container>
  );
};

export default uploadVideo;
