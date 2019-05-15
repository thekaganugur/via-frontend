import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SelectFile from '../../components/Styled/SelectFile';
import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';
import ProgressLine from '../../components/Styled/ProgressLine';
import { fetchQBE } from '../../store/actions/index';

const Form = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    width: auto;
    input {
      margin: 0.5rem 0 1rem 0;
      align-self: baseline;
      width: 35rem;
    }
  }
`;

class SearchVideoByEx extends React.Component {
  state = {
    id: 0,
    files: [],
    similarity: 0.1,
    from: '',
    to: ''
  };

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchQBE(this.state);
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
      <div>
        <ProgressLine
          percent={this.props.qbe.progress}
          message={this.props.qbe.message}
        />
        <Form onSubmit={e => this.handleSubmit(e)}>
          <SelectFile
            ref={this.fileInput}
            files={this.state.files}
            changed={e => this.handleChange(e)}
            dragEntered={e => this.handleDragEnter(e)}
            dragOvered={e => this.handleDragOver(e)}
            droped={e => this.handleFileDrop(e)}
          />
          <div>
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
              Search start time:
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
              Search end time:
              <Input
                value={this.state.to}
                changed={e => this.setState({ to: e.target.value })}
                type="number"
                min={0}
                step={1}
                placeHolder=""
              />
            </label>
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  qbe: state.qbe
});

const mapDispatchToProps = dispatch => ({
  fetchQBE: formData => dispatch(fetchQBE(formData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchVideoByEx);
