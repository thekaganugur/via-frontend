import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  font: inherit;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  background-color: #268bd2;
  transition: background-color 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #3e9bdc;
  }
`;

const button = ({ className, clicked, children, type }) => (
  <StyledButton className={className} onClick={clicked} type={type}>
    {children}
  </StyledButton>
);
export default button;
