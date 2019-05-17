import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { media } from '../styles';

const GridVideo = styled.div`
  font-size: 0.9em;
  margin: 0 2rem 2rem 0;
  &:last-child {
    margin: 0 0 2rem 0;
  }

  ${media.phone`
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      padding: 1rem 0.5rem;
      margin: 0 0 1rem 0;
    `};

  &:hover {
    cursor: pointer;
  }

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

      ${media.phone`
        width: 100%;
        height: auto;
      `};
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
  }
  &:hover svg {
    opacity: 0.8;
  }

  .metadata {
    font-weight: 300;
  }
`;

const gridVideo = ({
  className,
  title,
  objects,
  anomalities,
  id,
  time,
  thumbnail
}) => {
  return (
    <GridVideo className={className}>
      <Link to={`/video/${id}`}>
        <div className="thumbnail">
          <div className="filter" />
          <img alt="thumbnail" src={thumbnail} />
          <span>{time}</span>
          <FontAwesomeIcon icon="play" size="2x" />
        </div>
        <div className="metadata">
          <h3>{title}</h3>
          <div>{objects}</div>
          <div>{anomalities}</div>
        </div>
      </Link>
    </GridVideo>
  );
};

export default gridVideo;
