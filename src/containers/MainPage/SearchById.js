import React from 'react';
import styled from 'styled-components';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import GridVideo from '../../components/GridVideo';
import { media } from '../../styles';
import ButtonPlus from '../../components/Styled/ButtonPlus';

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
    margin-right: 1rem;
  }

  select {
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

const searchById = props => {
  return (
    <Container>
      <Form>
        <Input type="text" placeHolder="Search by title" />
        <ButtonPlus />
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
        <ButtonPlus />
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
