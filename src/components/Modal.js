import React from 'react';
import styled from 'styled-components';
import Button from './Styled/Button';

const Container = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }

  .modal-main {
    position: fixed;
    background: #fafafa;
    padding: 2rem 1rem;
    width: 70%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;

const modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <Container>
      <div className={showHideClassName}>
        <div className="modal-main">
          {children}
          <Button deletion clicked={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default modal;
