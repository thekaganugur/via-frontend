import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';

const LoginContainer = styled.div`
  padding: 5rem 0;

  .login-panel {
    padding: 5rem;
    border: 1px solid var(--color-grey-light-2);

  }
`;

const homepage = () => (
  <LoginContainer>
    <div className="login-panel">
      <form>
        <div>
          <label>Username:</label>
          <Input />
        </div>
        <div>
          <label>Password:</label>
          <Input />
        </div>
      </form>
      <Button>Submit</Button>
    </div>
  </LoginContainer>
);

export default homepage;
