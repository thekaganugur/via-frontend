import React from 'react';
import styled from 'styled-components';

import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledSelect = styled.select`
  border: 1px solid ${props => props.borderColor};
  padding: 1.1rem 1.9rem;
  color: inherit;
  font: 1.6em;
  border-radius: 4px;
  transition: border 0.4s;
  background-color: inherit;
  text-align: center;
  appearance: none;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.focusColor};
  }
`;

const input = props => {
  const { name, borderColor, focusColor, children, value, changed } = props;
  return (
    <StyledSelect
      value={value}
      onChange={changed}
      name={name}
      borderColor={borderColor || secondaryColorLight}
      focusColor={focusColor || secondaryColor}
    >
      {children}
    </StyledSelect>
  );
};

export default input;
