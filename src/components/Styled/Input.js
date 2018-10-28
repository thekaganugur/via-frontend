import React from 'react';

import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1.5px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: inherit;
  font: inherit;
  border-radius: 5px;
  transition: all .4s;

  &:focus {
    outline: none;
    border: 1.5px solid ${props => props.hoverColor};
  }
`;

const input = props => {
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeHolder}
      borderColor={props.borderColor}
      hoverColor={props.hoverColor}>
      {props.children}
    </StyledInput>
  );
};

export default input;
