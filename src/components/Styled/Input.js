import React from 'react';
import styled from 'styled-components';

import { secondaryColorLight } from '../../styles';

const StyledInput = styled.input`
  border: 1px solid ${secondaryColorLight};
  padding: 0.4rem 1rem;
  color: inherit;
  background-color: #fff;
  font: inherit;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 1rem;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const input = props => {
  const { changed, placeHolder, children } = props;
  return (
    <StyledInput onChange={changed} placeholder={placeHolder}>
      {children}
    </StyledInput>
  );
};

export default input;
