import React from 'react';
import styled from 'styled-components';
import FileSelect from '../../components/FileSelect.js';

const Container = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  #explainer {
    margin-bottom: 40px;
  }
`;

const searchByEx = props => {
  return (
    <Container>
      <p id="explainer">Upload an photo to search by photo sample.</p>
      <FileSelect />
    </Container>
  );
};

export default searchByEx;
