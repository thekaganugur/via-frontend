import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from '../../styles';

const Footer = styled.footer`
  color: #755c21;
  background-color: #fffbde;
  padding: 4rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`padding: 2rem 1rem;`};

  a {
    font-size: 0.9em;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #c49a37;
    }
  }

  .advisor {
    display: block;
  }

  .devs {
    font-size: 0.9em;
    flex-shrink: 0;
    list-style: none;
    margin-left: 1rem;
  }
`;

/** rel="noopener noreferrer" -> Is for security */
const footer = () => {
  const gitIcon = <FontAwesomeIcon icon={['fab', 'github']} />;
  const baseGitUrl = 'https://github.com/';

  return (
    <Footer>
      <p>
        Developed under graduation project at Başkent University.
        <span className="advisor">
          Advisor:
          {' '}
          <a href="https://www.baskent.edu.tr/~msert/">
            <FontAwesomeIcon icon="glasses" />
            {' '}
Mustafa Sert
          </a>
        </span>
      </p>
      <ul className="devs">
        <li>
          <a rel="noopener noreferrer" target="_blank" href={`${baseGitUrl}`}>
            {gitIcon}
            {' '}
Arifcan Bilici
          </a>
        </li>
        <li>
          <a rel="noopener noreferrer" target="_blank" href={`${baseGitUrl}`}>
            {gitIcon}
            {' '}
Doğuhan Babur
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${baseGitUrl}Zeromika`}
          >
            {gitIcon}
            {' '}
Göksen Umut Güler
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${baseGitUrl}kgnugur`}
          >
            {gitIcon}
            {' '}
Mehmet Kağan Uğur
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${baseGitUrl}hamit-zor`}
          >
            {gitIcon}
            {' '}
Hamit Zor
          </a>
        </li>
      </ul>
    </Footer>
  );
};

export default footer;
