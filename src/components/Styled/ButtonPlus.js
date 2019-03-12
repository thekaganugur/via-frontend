import React from 'react';
import styled from 'styled-components';
import { secondaryColor, secondaryColorLight } from '../../styles';

const StyledButton = styled.button`
  border: 2px solid ${secondaryColorLight};
  background-color: transparent;
  font-size: 15px;
  height: 2.5em;
  width: 2.5em;
  border-radius: 999px;
  position: relative;

  &:hover {
    border: 2px solid ${secondaryColor};
  }

  &:after,
  &:before {
    content: '';
    display: block;
    background-color: ${secondaryColorLight};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover:after,
  &:hover:before {
    background-color: ${secondaryColor};
  }

  &:before {
    height: 1em;
    width: 0.2em;
  }

  &:after {
    height: 0.2em;
    width: 1em;
  }

  .small {
    font-size: 12px;
  }

  .large {
    font-size: 22px;
  }
`;

const button = ({ className, clicked, children, type }) => (
  <StyledButton className={className} onClick={clicked} type={type}>
    {children}
  </StyledButton>
);
export default button;
