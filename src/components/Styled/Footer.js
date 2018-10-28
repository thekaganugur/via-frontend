import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {media} from '../../styles/';

const Footer = styled.footer`
  font-size: 0.85em;
  color: #755c21;
  background-color: #fffbde;
  padding: 4rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`padding: 2rem 0;`}

  .devs {
    font-size: 0.9em;
    list-style: none;
    margin-left:1rem;
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        color: #c49a37;
      }
    }
  }
`;

/**rel="noopener noreferrer" -> Is for security */
const footer = props => {
  const gitIcon = <FontAwesomeIcon icon={['fab', 'github']} />;
  const baseGitUrl = 'https://github.com/';

  return (
    <Footer>
      This project is developed under graduation project at Başkent University.
      <ul className="devs">
        <li>
          <a rel="noopener noreferrer" target="_blank" href={`${baseGitUrl}`}>
            {gitIcon} Arifcan Bilici
          </a>
        </li>
        <li>
          <a rel="noopener noreferrer" target="_blank" href={`${baseGitUrl}`}>
            {gitIcon} Doğuhan Babur
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${baseGitUrl}Zeromika`}>
            {gitIcon} Göksen Umut Güler
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${baseGitUrl}kgnugur`}>
            {gitIcon} Mehmet Kağan Uğur
          </a>
        </li>
        <li>
          <a rel="noopener noreferrer" target="_blank" href={`${baseGitUrl}`}>
            {gitIcon} Hamit Zor
          </a>
        </li>
      </ul>
    </Footer>
  );
};

export default footer;
