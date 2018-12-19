import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { primaryColor, primaryColorDark } from '../../styles';

const Navigation = styled.nav`
  background-color: ${primaryColor};
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
  padding: 0 0 0 1.5rem;

  .header {
    font-size: 1.3em;
    letter-spacing: 0.4rem;
    text-transform: uppercase;
    margin-right: 4rem;
    user-select: none;
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
    }
  }
`;

const navigation = () => (
  <Navigation>
    <p className="header">Via.</p>
    <NavLink to="/search/byidandnobj" className="vidSearch">
      Search video
    </NavLink>
    <NavLink to="/search/byexample" className="vidSearch last">
      Search by example
    </NavLink>
    <NavLink to="/search/byidandnobj/asd">Video</NavLink>
    {/* <span className="userName">Logged in as Kağan</span> */}
    <NavLink to="/" className="signOut">
      <span>Sing Out</span>
      <FontAwesomeIcon icon="sign-out-alt" />
    </NavLink>
  </Navigation>
);

export default navigation;
