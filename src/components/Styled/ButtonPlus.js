import React from 'react';
import styled from 'styled-components';
import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledButton = styled.button`
  border: 0px;
  background-color: transparent;
  height: 1.4em;
  width: 1.4em;
  font-size: 15px;

  &:after,
  &:before {
    content: '';
    display: block;
    background-color: ${secondaryColorLight};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    transition: all 0.4s;
  }

  &:before {
    height: 1em;
    width: 0.2em;
  }

  &:after {
    height: 0.2em;
    width: 1em;
  }

  &:hover {
    border: 0;
  }

  &:hover:after,
  &:hover:before {
    background-color: ${secondaryColor};
    opacity: 1;
  }
`;

const button = ({ className, clicked, children }) => (
  <StyledButton className={className} onClick={clicked}>
    {children}
  </StyledButton>
);

export default button;
