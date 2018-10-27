import React from 'react';
import styled  from 'styled-components';

const StyledButton = styled.button`

`;

const button = props => (
  <StyledButton>
     { props.children }
  </StyledButton>
)

export default button;