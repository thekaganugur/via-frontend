import React from 'react';

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
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Heading = styled.h1`
  max-width: 100%;
  color: #fff;
  letter-spacing: 1px;
  font-size: 2.8em;
  text-align: center;
`;

const ScrollDown = styled.a`
  position: absolute;
  color: #fff;
  bottom: 15%;
`;

const heroHeader = props => (
  <Header>
    <Heading>Video Analytics for Security</Heading>
    <ScrollDown>**Not working** Scroll Down To Login </ScrollDown>
  </Header>
);

export default heroHeader;
