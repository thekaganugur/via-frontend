import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Styled/Button';
import Input from '../../components/Styled/Input';
import { secondaryColor, secondaryColorLight, greyColor } from '../../styles';

const LoginContainer = styled.div`
  width: 38rem;
  padding: 20rem 0;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  h2 {
    margin-bottom: 2rem;
  }

  .loginPanel {
    width: 100%;
    padding: 4rem 2rem;
    border: 1px solid ${greyColor};
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    border-radius: 5px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  input {
    margin-bottom: 1.5rem;
    width: 90%;
  }

  .new {
    font-size: 0.9em;
    margin-top: 3rem;

    span {
      margin-right: 0.8rem;
    }
    a {
      text-decoration: none;
      color: #0366d6;
    }
  }
`;

const homepage = () => (
  <LoginContainer>
    <h2>Sign in to Via</h2>
    <div className="loginPanel">
      <form>
        <Input
          type={'text'}
          borderColor={secondaryColorLight}
          hoverColor={secondaryColor}
          placeHolder="Username"
        />
        <Input
          type={'password'}
          borderColor={secondaryColorLight}
          hoverColor={secondaryColor}
          placeHolder="Password"
        />
        <Button>Submit</Button>
      </form>
      <span className="new">
        New to Via? <a href="#">Create an account.</a>
      </span>
    </div>
  </LoginContainer>
);

export default homepage;
