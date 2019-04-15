import React from 'react';
import styled from 'styled-components';

import { secondaryColorLight } from '../../styles';

const StyledSelect = styled.select`
  border: 1px solid ${secondaryColorLight};
  padding: 1.1rem 1.9rem;
  color: inherit;
  background-color: inherit;
  font: 1.6em;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: center;
  appearance: none;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const input = props => {
  const { name, children, value, changed } = props;
  return (
    <StyledSelect value={value} onChange={changed} name={name}>
      {children}
    </StyledSelect>
  );
};

export default input;
