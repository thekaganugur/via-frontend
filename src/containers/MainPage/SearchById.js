import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import GridVideo from '../../components/GridVideo';
import { media } from '../../styles';
import ButtonPlus from '../../components/Styled/ButtonPlus';
import Button from '../../components/Styled/Button';

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
    page-break-after: always; /* CSS 2.1 syntax */
    break-after: always; /* New syntax */
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

class SearchById extends Component {
  state = {
    queryElements: [
      // { type: 'Object', value: 'Human' },
      // { type: 'Relational', value: 'Hefore' },
      // { type: 'Anomality', value: 'Line crossing' },
      // { type: 'Logical', value: 'Or' },
      // { type: 'Object', value: 'Car' }
    ]
  };

  handleSelectChange(event, e, i) {
    var value = event.target.value;
    console.log(value, e.type);
    this.setState(({ queryElements }) => ({
      queryElements: [
        ...queryElements.slice(0, i),
        {
          type: e.type,
          value: value
        },
        ...queryElements.slice(i + 1)
      ]
    }));

    if (e.type === 'typeChooser') {
      switch (value) {
        case 'Logical':
          this.setState(({ queryElements }) => ({
            queryElements: [
              ...queryElements.slice(0, i),
              {
                type: value,
                value: value
              },
              ...queryElements.slice(i + 1)
            ]
          }));
          break;

        case 'Relational':
          this.setState(({ queryElements }) => ({
            queryElements: [
              ...queryElements.slice(0, i),
              {
                type: value,
                value: value
              },
              ...queryElements.slice(i + 1)
            ]
          }));
          break;

        case 'Object':
          this.setState(({ queryElements }) => ({
            queryElements: [
              ...queryElements.slice(0, i),
              {
                type: value,
                value: value
              },
              ...queryElements.slice(i + 1)
            ]
          }));
          break;

        case 'Anomality':
          this.setState(({ queryElements }) => ({
            queryElements: [
              ...queryElements.slice(0, i),
              {
                type: value,
                value: value
              },
              ...queryElements.slice(i + 1)
            ]
          }));
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
    }
  };

  handlePlusButton = () =>
    this.setState({
      queryElements: [
        ...this.state.queryElements,
        { type: 'typeChooser', value: TYPE_CHOOSER_VALUES[0] }
      ]
    });

  render() {
    return (
      <Container>
        <Form>
          <Input type="text" placeHolder="Search by title" />
          <ButtonPlus type="button" clicked={() => this.handlePlusButton()} />
          <div>{this.renderQueryElements()}</div>
          <ButtonPlus type="button" clicked={() => this.handlePlusButton()} />
        </Form>
        <Button>Submit</Button>
        <Grid>
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
          <GridVideo className="grid-item" />
        </Grid>
      </Container>
    );
  }
}

export default SearchById;
