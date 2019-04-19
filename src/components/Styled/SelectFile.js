import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { secondaryColorLight } from '../../styles';

const Container = styled.div`
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    display: inline-block;
    cursor: pointer;

    border: 1px solid ${secondaryColorLight};
    padding: 1.2rem 2rem;
    color: inherit;
    background-color: #fff;
    font: inherit;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .inputfile:focus + label {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: 1px dotted #000;
  }

  .inputfile:focus + label,
  .inputfile.has-focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }

  svg {
    margin-right: 0.4rem;
  }
  margin-bottom: 1.2rem;
`;

const input = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    changed,
    files,
    multiple,
    dragEntered,
    dragOvered,
    droped
  } = props;

  const RenderLabel = () => {
    switch (files.length) {
      case 0:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> Select or drag file
          </label>
        );
      case 1:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> {files[0].name}
          </label>
        );
      default:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> {files.length} files selected
          </label>
        );
    }
  };

  return (
    <Container
      className={className}
      onDragEnter={dragEntered}
      onDragOver={dragOvered}
      onDrop={droped}
    >
      <input
        onChange={changed}
        ref={ref}
        type="file"
        name="file"
        id="file"
        className="inputfile"
        multiple={multiple}
      />
      <RenderLabel />
      {children}
    </Container>
  );
});

export default input;
