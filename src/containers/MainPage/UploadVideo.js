import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SelectFile from '../../components/Styled/SelectFile';
import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';

const Form = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class UploadVideo extends React.Component {
  state = {
    title: '',
    files: []
  };
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('video', this.state.files);
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
    this.setState({ files: e.target.files });
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

    this.setState({ files: [files[0]] });
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)} enctype="multipart/form-data">
        <Input
          placeHolder="Title"
          changed={event => this.setState({ title: event.target.value })}
        />
        <SelectFile
          ref={this.fileInput}
          files={this.state.files}
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
