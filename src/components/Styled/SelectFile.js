import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    border: none;
    font: inherit;
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 5px;
    background-color: #268bd2;
    transition: all 0.4s;
    cursor: pointer;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    background-color: #3e9bdc;
  }

  .inputfile:focus + label {
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
  const { className, children, changed, fileName, fileCount, multiple } = props;

  const RenderLabel = () => {
    switch (fileCount) {
      case 0:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> Select file
          </label>
        );
      case 1:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> {fileName}
          </label>
        );
      default:
        return (
          <label htmlFor="file">
            <FontAwesomeIcon icon="file-upload" /> {fileCount} files selected
          </label>
        );
    }
  };

  return (
    <Container className={className}>
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
