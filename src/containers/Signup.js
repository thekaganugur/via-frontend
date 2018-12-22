import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Input from '../../components/Styled/Input';
import { greyColor, media } from '../../styles';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20rem 0;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  h2 {
    margin-bottom: 2rem;
  }

  .signupPanel {
    width: 50rem;
    padding: 8rem 4rem;
    border: 1px solid ${greyColor};
    box-shadow: 0px 0px 7px 0px #a2a2a2;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    border-radius: 5px;

    .signupButton {
      text-decoration: none;
      border: none;
      font: inherit;
      color: #fff;
      padding: 0.8rem 2rem;
      border-radius: 5px;
      background-color: #268bd2;
      transition: background-color 0.4s;

      &:hover {
        background-color: #3e9bdc;
      }
    }

    ${media.phone`
    width: 80%;
    padding: 5rem 2rem;`};
    ${media.smPhone`
    width: 90%;
    padding: 4rem 1rem;`};
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

  .login {
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

class signup extends Component {
  state = {
    userNameTerm: '',
    passwordTerm: ''
  };

  render() {
    const { userNameTerm, passwordTerm } = this.state;
    return (
      <Container>
        <h2>Sign in to VIA.</h2>
        <div className="signupPanel">
          <form>
            <Input
              changed={e => this.setState({ userNameTerm: e.target.value })}
              value={userNameTerm}
              type="text"
              placeHolder="Username"
            />
            <Input
              changed={e => this.setState({ passwordTerm: e.target.value })}
              value={passwordTerm}
              type="password"
              placeHolder="Password"
            />
            <Link className="signupButton" to="/search/byidandnobj">
              Submit
            </Link>
          </form>
          <span className="login">
            Already have an account?<a href="#section-2">Login.</a>
          </span>
        </div>
      </Container>
    );
  }
}

export default signup;
