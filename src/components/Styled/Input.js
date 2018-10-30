import React from 'react';
import styled from 'styled-components';

import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledInput = styled.input`
  border: 1.5px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: inherit;
  font: inherit;
  border-radius: 5px;
  transition: border 0.4s;

  &:focus {
    outline: none;
    border: 1.5px solid ${props => props.focusColor};
  }
`;

const input = props => {
  return (
    <StyledInput
      onChange={props.changed}
      value={props.value}
      type={props.type}
      placeholder={props.placeHolder}
      borderColor={props.borderColor || secondaryColorLight}
      focusColor={props.focusColor || secondaryColor}>
      {props.children}
    </StyledInput>
  );
};

export default input;
