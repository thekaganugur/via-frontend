import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .list {
    width: 100%;
    height: 30rem;
    overflow: hidden;
    overflow-y: scroll;

    li {
      height: 2.5em;
      padding: 0.2rem 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:last-of-type) {
        border-bottom: 1px solid #e0e0e0;
      }

      &-name {
        cursor: pointer;
      }

      button {
        padding: 0.2rem 0.8rem;
      }
    }
  }
`;
const renderList = (listType, clickedListItem) => {
  return listType.map((listItem, i) => (
    <li key={i} className="list-item">
      <div onClick={() => clickedListItem(listItem.time)}>{listItem.name}</div>
      <Button clicked={() => clickedListItem(listItem.time)}>
        Time: {listItem.time}
      </Button>
    </li>
  ));
};

const List = ({ title, listType, clickedListItem }) => (
  <Container>
    <h2>{title}</h2>
    <ul className="list">{renderList(listType, clickedListItem)}</ul>
  </Container>
);

export default List;
