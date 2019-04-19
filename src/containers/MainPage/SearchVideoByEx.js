import React from 'react';
import styled from 'styled-components';

import SelectFile from '../../components/Styled/SelectFile';
import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';

const Form = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const codes = {
  STARTED: 10,
  INTERNAL_SERVER_ERROR: 1,
  TERMINATED_BY_USER: 20,
  COMPLETED_SUCCESSFULLY: 0,
  PROGRESS: 4,
  BAD_REQUEST: 5,
  OK: 6
};
let results = [];

class SearchVideoByEx extends React.Component {
  state = {
    files: [],
    similarity: 0.1,
    from: '',
    to: ''
  };

  setQBEResult = result => {
    console.log(JSON.stringify(result, null, '   '));
  };

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleFiles();
  }

  handleChange(e) {
    this.setState({ files: e.target.files });
    // this.setState({ files: this.fileInput.current.files[0] });
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

  handleFiles(files) {
    var reader = new FileReader();

    reader.onloadend = () => {
      const socket = new WebSocket('ws://34.74.68.244:3000');

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            route: 'start-qbe',
            data: {
              userId: 1,
              videoId: parseInt(1),
              encodedImage: reader.result,
              min: parseInt(this.state.similarity),
              begin: parseInt(this.state.from),
              end: parseInt(this.state.to)
            }
          })
        );
      };

      socket.onmessage = evt => {
        let watchWS = undefined;
        const startM = JSON.parse(evt.data);

        // QBE.terminate.onclick = async () => {
        //   await (await fetch(
        //     `${endPoint}/search/terminate-qbe?operationId=${
        //       startM.data.operationId
        //     }`
        //   )).json();
        // };

        const startStatus = startM.status;
        /* eslint-disable */
        switch (startStatus) {
          case codes.INTERNAL_SERVER_ERROR:
            console.log(startM);
            break;
          case codes.COMPLETED_SUCCESSFULLY:
            console.log('Completed');
            break;
          case codes.OK:
            watchWS && watchWS.close();

            watchWS = new WebSocket('ws://34.74.68.244:3000');

            watchWS.onopen = function() {
              watchWS.send(
                JSON.stringify({
                  route: 'watch-qbe',
                  data: { operationId: startM.data.operationId }
                })
              );
            };

            watchWS.onmessage = async evt => {
              const watchM = JSON.parse(evt.data);
              const watchStatus = watchM.status;
              this.setQBEResult(watchM);
              switch (watchStatus) {
                case codes.PROGRESS:
                  if (watchM.data.results.length) {
                    results.push(...watchM.data.results);
                  }
                  this.setQBEResult({
                    progress: watchM.data.progress,
                    results: results
                  });
                  break;
                default:
                  console.log(watchM);
              }
            };
            watchWS.onclose = function() {
              console.log('Watch Connection is closed');
            };
            break;
          default:
            console.log(startM);
            break;
        }
        /* eslint-enable */
      };
      socket.onclose = function() {
        console.log('Start Connection is closed');
      };
    };

    reader.readAsDataURL(this.state.files[0]);
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <SelectFile
          ref={this.fileInput}
          files={this.state.files}
          changed={e => this.handleChange(e)}
          dragEntered={e => this.handleDragEnter(e)}
          dragOvered={e => this.handleDragOver(e)}
          droped={e => this.handleFileDrop(e)}
        />
        <label htmlFor="similarity">
          Minimum similarity (between 0.1 and 1):
          <Input
            value={this.state.similarity}
            changed={e => this.setState({ similarity: e.target.value })}
            type="number"
            min={0}
            step={0.1}
            placeHolder=""
          />
        </label>
        <label htmlFor="from">
          Search from time:
          <Input
            value={this.state.from}
            changed={e => this.setState({ from: e.target.value })}
            type="number"
            min={0}
            step={1}
            placeHolder=""
          />
        </label>
        <label htmlFor="to">
          Search untill time:
          <Input
            value={this.state.to}
            changed={e => this.setState({ to: e.target.value })}
            type="number"
            min={0}
            step={1}
            placeHolder=""
          />
        </label>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default SearchVideoByEx;
