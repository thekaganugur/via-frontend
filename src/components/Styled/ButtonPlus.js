import React from 'react';
import styled, { css } from 'styled-components';
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
  }

  ${props =>
    props.small &&
    css`
      border: 0px;
      height: 1.5em;
      width: 1.5em;
      &:after,
      &:before {
        opacity: 0.5;
        transition: all 0.4s;
      }
      &:hover:after,
      &:hover:before {
        background-color: ${secondaryColor};
        opacity: 1;
      }
      &:hover {
        border: 0;
      }
    `}
`;

const button = ({ className, clicked, children, type, small }) => (
  <StyledButton
    className={className}
    onClick={clicked}
    type={type}
    small={small}
  >
    {children}
  </StyledButton>
);
export default button;
