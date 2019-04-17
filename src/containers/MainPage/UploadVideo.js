import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SelectFile from '../../components/Styled/SelectFile';
import Button from '../../components/Styled/Button';

const Form = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class UploadVideo extends React.Component {
  state = {
    file: null,
    fileCount: 0
  };
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', this.state.file);
    axios
      .post('/video/upload', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ fileCount: e.target.files.length });
    this.setState({ file: e.target.files[0] });
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    //CHECK FOR MULTIPLE FILE RESTRICTION
    this.setState({ fileCount: files.length });
    this.setState({ file: files[0] });
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)} enctype="multipart/form-data">
        <SelectFile
          ref={this.fileInput}
          file={this.state.file}
          fileCount={this.state.fileCount}
          changed={e => this.handleChange(e)}
          dragEntered={e => this.handleDragEnter(e)}
          dragOvered={e => this.handleDragOver(e)}
          droped={e => this.handleFileDrop(e)}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default UploadVideo;
