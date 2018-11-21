import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const searchByEx = props => {
  return (
    <Container>
      <p>Upload an video to search by video sample.</p>
    </Container>
  );
};

export default searchByEx;
