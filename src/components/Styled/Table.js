import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid grey;
`;

class Table extends Component {
  state = {
    tableConfig: {
      columnMetaData: [
        {
          columnName: 'id',
          columnValue: 'ID'
        },
        {
          columnName: 'objects',
          columnValue: 'Detected Objects'
        },
        {
          columnName: 'anormaly',
          columnValue: 'Anormaly'
        },
        {
          columnName: 'video',
          columnValue: 'Video'
        }
      ]
    }
  };

  render() {
    return <Container>Table</Container>;
  }
}

export default Table;
