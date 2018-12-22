import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { primaryColorLight } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .dropArea {
    display: flex;
    justify-content: center;
    width: 35rem;
    height: 15rem;
    padding: 1rem;
    border: 2px ${primaryColorLight} solid;
    border-radius: 10px;
    cursor: pointer;

    #icon_hand {
      color: inherit;
      margin-left: 5px;
    }
  }

  h4 {
  }
`;

class fileSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Container>
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          onFileDialogCancel={this.onCancel.bind(this)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} class="dropArea">
              <input {...getInputProps()} />
              <p>
                Drop files here, or click to select files
                <FontAwesomeIcon id="icon_hand" icon="hand-pointer" />
              </p>
            </div>
          )}
        </Dropzone>
        <aside>
          {files.length !== 0 ? <h4>Selected files</h4> : <h4 />}
          <ul>{files}</ul>
        </aside>
      </Container>
    );
  }
}

export default fileSelect;
