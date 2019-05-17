import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SelectFile from '../../components/Styled/SelectFile';
import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';
import Spinner from '../../components/Styled/Spinner';

const Form = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class UploadVideo extends React.Component {
  state = {
    title: '',
    files: [],
    uploadingVideo: false
  };
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('videoFile', this.state.files[0]);

    this.setState({ uploadingVideo: true });
    axios
      .post('/video', formData, { mode: 'no-cors' })
      .then(response => {
        this.setState({ uploadingVideo: false });
        console.log(response);
      })
      .catch(error => {
        this.setState({ uploadingVideo: false });
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
    let videos;
    if (this.state.uploadingVideo) {
      videos = <Spinner />;
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
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
        {videos}
      </Form>
    );
  }
}

export default UploadVideo;
