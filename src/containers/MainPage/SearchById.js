import React from 'react';
import styled from 'styled-components';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import GridVideo from '../../components/GridVideo';
import { media } from '../../styles';

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
  padding: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;

  input {
    margin-right: 3rem;
  }

  select {
    margin-right: 1rem;
  }

  ${media.phone`
    flex-direction: column;

    input {
      margin: 0rem 1rem 1rem 1rem;
    }

    select {
      margin: 0rem 1rem .75rem 1rem;
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

    &:hover {
      cursor: pointer;
    }
  }
`;

const searchById = props => {
  return (
    <Container>
      <Form>
        <Input type="text" placeHolder="Search by title" />
        <Select name="filterObject">
          <option value="object" defaultValue>
            Object
          </option>
          <option value="human">Human</option>
          <option value="vehicle">Vehicle</option>
        </Select>
        <Select name="filterObject">
          <option value="before">Before</option>
          <option value="during" defaultValue>
            During
          </option>
          <option value="after">After</option>
        </Select>
        <Select name="filterObject">
          <option value="anomality" defaultValue>
            Anomality
          </option>
          <option value="human">Line Crosing</option>
          <option value="vehicle">Something</option>
        </Select>
      </Form>
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
};

export default searchById;
