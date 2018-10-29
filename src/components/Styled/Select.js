import React from 'react';
import styled from 'styled-components';

import { secondaryColor, secondaryColorLight, greyColor } from '../../styles';

const StyledSelect = styled.select`
  border: 1.5px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: inherit;
  font: inherit;
  border-radius: 5px;
  transition: border .4s;
  background-color: inherit;

  &:focus {
    outline: none;
    border: 1.5px solid ${props => props.hoverColor};
  }
`;

const input = props => {
  return (
    <StyledSelect
      name={props.name}
      borderColor={props.borderColor || secondaryColorLight}
      focusColor={props.focusColor || secondaryColor}>
      {props.children}
    </StyledSelect>
  );
};

export default input;
