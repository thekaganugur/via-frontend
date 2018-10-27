import React from 'react';
import styled  from 'styled-components';

const StyledInput = styled.input`
  border: 2px solid var(--color-blue-light-2);  
  padding: .4rem .6rem;
  color: var(--color-primary);
  font: inherit;

  &:hover {
    border: 2px solid var(--color-blue-light-2);  
  }
`;

const input = props => (
  <StyledInput>
     { props.children }
  </StyledInput>
)

export default input;