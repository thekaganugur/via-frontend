import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { primaryColor, primaryColorDark, primaryColorLight } from '../styles';
import { media } from '../styles';

const Navigation = styled.nav`
  background-color: ${primaryColor};
  display: flex;
  align-items: center;
  width: 100%;
  height: 5.2rem;
  color: #fff;
  padding: 0 0 0 1.5rem;
  text-align: center;

  ${media.phone`
      padding: 0 0 0 1rem;
      font-size: 0.9em;
  `};

  .active {
    background-color: ${primaryColorLight};
  }

  .header {
    font-size: 1.3em;
    letter-spacing: 0.4rem;
    text-transform: uppercase;
    margin-right: 1.6rem;
    user-select: none;
    ${media.tablet`
      font-size: 1.2em;
      margin-right: 1rem;
    `};
  }

  a {
    text-decoration: none;
    color: inherit;
    padding: 0 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    transition: background-color 0.4s;
    &:hover {
      background-color: ${primaryColorDark};
    }
  }

  .last {
    margin-right: auto;
  }

  .userName {
    font-family: 'Open Sans', sans-serif;
    color: #ddd;
    font-size: 0.7em;
  }

  .signOut {
    span {
      margin-right: 0.5rem;
      ${media.tablet`
        width: 0;
        visibility: hidden;
      `};
    }
  }
`;

const navigation = () => (
  <Navigation>
    <p className="header">Via.</p>
    <NavLink to="/search" exact activeClassName="active">
      Search video
    </NavLink>
    {/* <NavLink to="/search/byexample">Query by example</NavLink> */}
    <NavLink to="/uploadVideo" className="last">
      Upload video
    </NavLink>
    <NavLink to="/" exact className="signOut">
      <span>Sing Out</span>
      <FontAwesomeIcon icon="sign-out-alt" />
    </NavLink>
  </Navigation>
);

export default navigation;
