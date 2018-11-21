import React from 'react';
import styled from 'styled-components';

import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledSelect = styled.select`
  border: 1px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: inherit;
  font: inherit;
  border-radius: 5px;
  transition: border 0.4s;
  background-color: inherit;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.focusColor};
  }
`;

const input = props => {
  const { name, borderColor, focusColor, children } = props;
  return (
    <StyledSelect
      name={name}
      borderColor={borderColor || secondaryColorLight}
      focusColor={focusColor || secondaryColor}
    >
      {children}
    </StyledSelect>
  );
};

export default input;
