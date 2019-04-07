import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import GridVideo from '../../components/GridVideo';
import { media } from '../../styles';
import ButtonPlus from '../../components/Styled/ButtonPlus';
import Button from '../../components/Styled/Button';
import { fetchVideos } from '../../store/actions/index';

const LOGICAL_VALUES = ['Or', 'And'];
const RELATIONAL_VALUES = ['Before', 'During', 'After'];
const OBJECT_VALUES = ['Human', 'Car', 'Cat', 'Dog'];
const ANOMALITY_VALUES = ['Line crossing', 'Fighting', 'Car chrash'];
const TYPE_CHOOSER_VALUES = [
  'Choose',
  'Logical',
  'Relational',
  'Object',
  'Anomality'
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-flow: row wrap;
  padding: 1rem;
  width: 100%;

  input {
    width: 450px;
    margin-bottom: 1rem;
    page-break-after: always;
    break-after: always;
  }

  button {
    margin: 0 2rem;
  }

  select:not(:last-child) {
    margin-right: 1rem;
  }

  ${media.phone`
    flex-flow: nowrap;
    flex-direction: column;
    width: 95%;

    input {
      width: 100%;
      margin: 0 0 2rem 0;
    }

    button {
      margin: 0 0 1rem 0;
      align-self:center;
    }

    select {
      margin: 0 0 1rem 0;
    }
  `};
`;

const Grid = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .grid-item {
    margin: 0 2rem 2rem 0;

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
  }
`;

class SearchVideo extends Component {
  state = {
    titleTerm: '',
    queryElements: []
  };

  componentDidMount() {
    this.props.fetchVideos();
  }

  updateQueryElementState = (type, value, i) => {
    this.setState(({ queryElements }) => ({
      queryElements: [
        ...queryElements.slice(0, i),
        {
          type,
          value
        },
        ...queryElements.slice(i + 1)
      ]
    }));
  };

  handleSelectChange(event, e, i) {
    var value = event.target.value;

    this.updateQueryElementState(e.type, value, i);

    if (e.type === 'typeChooser') {
      switch (value) {
        case 'Logical':
          this.updateQueryElementState(value, LOGICAL_VALUES[0], i);
          break;
        case 'Relational':
          this.updateQueryElementState(value, RELATIONAL_VALUES[0], i);
          break;
        case 'Object':
          this.updateQueryElementState(value, OBJECT_VALUES[0], i);
          break;
        case 'Anomality':
          this.updateQueryElementState(value, ANOMALITY_VALUES[0], i);
          break;
        default:
          break;
      }
    }
  }

  renderQueryElements = () =>
    this.state.queryElements.map((e, i) => {
      return (
        <Select
          value={e.value}
          changed={event => this.handleSelectChange(event, e, i)}
        >
          {this.renderQueryElementOptions(e.type, e.value)}
        </Select>
      );
    });

  renderQueryElementOptions = type => {
    switch (type) {
      case 'Logical':
        return LOGICAL_VALUES.map(val => <option>{val}</option>);
      case 'Relational':
        return RELATIONAL_VALUES.map(val => <option>{val}</option>);
      case 'Object':
        return OBJECT_VALUES.map(val => <option>{val}</option>);
      case 'Anomality':
        return ANOMALITY_VALUES.map(val => <option>{val}</option>);
      case 'typeChooser':
        return TYPE_CHOOSER_VALUES.map(val => <option>{val}</option>);
      default:
        break;
    }
  };

  handlePlusButton = () =>
    this.setState({
      queryElements: [
        ...this.state.queryElements,
        { type: 'typeChooser', value: TYPE_CHOOSER_VALUES[0] }
      ]
    });

  renderVideoGrids = () => {
    var filteredVideos = this.props.videos.filter(video =>
      video.title.includes(this.state.titleTerm)
    );
    return filteredVideos.map(v => (
      <GridVideo
        className="grid-item"
        title={v.title}
        objects={v.objects}
        anomalities={v.anomalities}
      />
    ));
  };

  render() {
    return (
      <Container>
        <Form>
          <Input
            changed={event => this.setState({ titleTerm: event.target.value })}
            type="text"
            placeHolder="Search by title"
          />
          <ButtonPlus type="button" clicked={() => this.handlePlusButton()} />
          {this.renderQueryElements()}
          <ButtonPlus type="button" clicked={() => this.handlePlusButton()} />
        </Form>
        <Button>Submit</Button>
        <Grid>{this.renderVideoGrids()}</Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: bindActionCreators(fetchVideos, dispatch)
  //dispatch: basicly means call a function, dispatch is the only way to trigger a state change.
  //bindActionCreators: when you want to pass some action creators down
  //to a component that isn't aware of Redux
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchVideo);
