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

const input = (props) => {
  const {
    changed, value, type, placeHolder, borderColor, focusColor, children,
  } = props;
  return (
    <StyledInput
      onChange={changed}
      value={value}
      type={type}
      placeholder={placeHolder}
      borderColor={borderColor || secondaryColorLight}
      focusColor={focusColor || secondaryColor}
    >
      {children}
    </StyledInput>
  );
};

export default input;
