import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Styled/Input.js';
import { secondaryColor, secondaryColorLight } from '../../styles';
import Dropzone from 'react-dropzone';
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
      <p id="explainer">Upload an video to search by video sample.</p>
      <FileSelect />
    </Container>
  );
};

export default searchByEx;
