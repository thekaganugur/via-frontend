import React from 'react';

import styled from 'styled-components';
import cameraImage from '../../assets/camera-cctv-equipment-430208.jpg';

const Header = styled.header`
  background-image: linear-gradient(
      90deg,
      rgba(82, 101, 143, 0.6),
      rgba(82, 101, 143, 0.4)
    ),
    url(${cameraImage});
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  max-width: 100%;
  color: #fff;
  letter-spacing: 1px;
  font-size: 2.8em;
  text-align: center;
`;

const heroHeader = props => (
  <Header>
    <Heading>Video Analytics for Security</Heading>
  </Header>
);

// @media screen and (max-width: 1024px) { /* Specific to this particular image */
// }

export default heroHeader;
