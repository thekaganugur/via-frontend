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
    fileCount: 0,
    fileName: ''
  };
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleChange() {
    this.setState({ fileCount: this.fileInput.current.files.length });
    this.setState({ fileName: this.fileInput.current.files[0].name });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', this.fileInput.current.files[0]);
    axios
      .post('http://localhost:3000/video/upload', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)} enctype="multipart/form-data">
        <SelectFile
          ref={this.fileInput}
          changed={() => this.handleChange()}
          fileName={this.state.fileName}
          fileCount={this.state.fileCount}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default UploadVideo;
