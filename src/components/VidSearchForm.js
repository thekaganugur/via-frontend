import React from 'react';
import styled from 'styled-components';

import Input from './Styled/Input';
import Select from './Styled/Select';

const FormContainer = styled.form`
  padding: 4rem 0 2rem 0;
  display: flex;
  width: 100%;
`;

const vidSearchForm = props => (
  <div>
    <FormContainer>
      <Input type="text" />
      <Select 
      name="searchObject">
        <option value="human">Human</option>
        <option value="vehicle">Vehicle</option>
      </Select>
    </FormContainer>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
);

export default vidSearchForm;
