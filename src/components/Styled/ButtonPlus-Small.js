import React from 'react';
import styled from 'styled-components';
import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledButton = styled.button`
  border: 0px;
  background-color: transparent;
  font-size: 15px;
  height: 1.5em;
  width: 1.5em;
  border-radius: 999px;
  position: relative;

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

  &:hover:after,
  &:hover:before {
    background-color: ${secondaryColor};
    opacity: 1;
  }
`;

const button = ({ className, clicked, children, type }) => (
  <StyledButton className={className} onClick={clicked} type={type}>
    {children}
  </StyledButton>
);
export default button;
