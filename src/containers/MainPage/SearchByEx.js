import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const searchByEx = props => {
  return (
    <Container>
      <p>Upload an video to search by video sample.</p>
      <form action="/action_page.php">
        <input type="file" name="pic" accept="image/*" />
        <input type="submit" />
      </form>
    </Container>
  );
};

export default searchByEx;
