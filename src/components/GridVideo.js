import React from 'react';
import styled from 'styled-components';
import Thumbnail from '../assets/sintel1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GridVideo = styled.div`
  font-size: 0.9em;
  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  .thumbnail {
    position: relative;

    img {
      width: 210px;
      height: 118px;
    }

    span {
      position: absolute;
      bottom: 6%;
      right: 3%;
      padding: 0 2px;
      color: #fff;
      background-color: rgba(14, 19, 28, 0.6);
      font-size: 0.9em;
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fafafa;
      opacity: 0;
      transition: opacity 0.4s;
    }

    &:hover svg {
      opacity: 0.8;
    }
  }

  .metadata {
    font-weight: 300;
  }
`;

const gridVideo = ({ className }) => (
  <GridVideo className={className}>
    <div className="thumbnail">
      <div className="filter" />
      <img src={Thumbnail} />
      <span>2:02</span>
      <FontAwesomeIcon icon="play" size="2x" />
    </div>
    <div className="metadata">
      <h3>Sintel - Sample</h3>
      <div>Car, Man, Bycle</div>
      <div>Line crossing, Something</div>
    </div>
  </GridVideo>
);

export default gridVideo;
