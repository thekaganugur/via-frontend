import React from 'react';
import styled from 'styled-components';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import Table from '../../components/Styled/Table.js';

const Container = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  padding: 2rem 0 1rem 0;
  display: flex;
  justify-content: center;
  width: 100%;

  input {
    margin-right: 3rem;
  }
`;

const searchById = props => {
  const checkSearchType = props;
  console.log('NEED', checkSearchType);

  return (
    <Container>
      <p>Type to search videos by id, select an object to filter the list.</p>
      <FormContainer>
        <Input type="text" placeholder="Search by id" />
        <Select name="searchObject">
          <option value="object" defaultValue>
            Object
          </option>
          <option value="human">Human</option>
          <option value="vehicle">Vehicle</option>
        </Select>
      </FormContainer>
      <Table />
    </Container>
  );
};

export default searchById;
