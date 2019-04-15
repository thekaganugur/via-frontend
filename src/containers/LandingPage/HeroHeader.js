import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';
import cameraImage from '../../assets/camera-cctv-equipment-430208.jpg';

const Header = styled.header`
  background-image: linear-gradient(
      45deg,
      rgba(82, 101, 143, 0.7),
      rgba(82, 101, 143, 0.1)
    ),
    url(${cameraImage});
  width: auto;
  height: 95vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .down {
    position: absolute;
    color: #fff;
    bottom: 15%;
  }
`;

const Heading = styled.h1`
  max-width: 100%;
  color: #fff;
  letter-spacing: 1px;
  font-size: 2.8em;
  text-align: center;
`;

const heroHeader = () => (
  <Header>
    <Heading>Video Analytics for Security</Heading>
    <FontAwesomeIcon className="down" icon="angle-double-down" size="2x" />
  </Header>
);

export default heroHeader;
