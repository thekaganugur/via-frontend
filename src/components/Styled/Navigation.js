import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { primaryColor, primaryColorDark } from '../../styles/';

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
    margin-right: 2rem;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: inherit;
    padding: 0 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    transition: background-color .4s;
    &:hover {
      background-color: ${primaryColorDark};
    }
  }

  .vidSearch {
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

const navigation = props => (
  <Navigation>
    <p className="header">Via.</p>
    <a href="" className="vidSearch">
      Video Search
    </a>
    {/* <span className="userName">Logged in as Kağan</span> */}
    <a href="" className="signOut">
      <span>Sing Out</span>
      <FontAwesomeIcon icon="sign-out-alt" />
    </a>
  </Navigation>
);

export default navigation;
