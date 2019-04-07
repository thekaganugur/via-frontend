import React from 'react';
import { Grid, Cell } from 'styled-css-grid';

import Navigation from '../../components/Navigation';
import SearchVideo from './SearchVideo';
import SearchVideoByEx from './SearchVideoByEx';

const mainPage = props => {
  return (
    <Grid
      columns="minmax(0 , 1fr) minmax(30rem, 120rem) minmax(0 , 1fr)"
      rows=" minmax(4.5rem ,auto) 1fr minmax(45px,auto)"
      gap="0"
    >
      <Cell width={3}>
        <Navigation />
      </Cell>
      <Cell />
      <Cell>
        {props.match.path === '/search' ? (
          <SearchVideo {...props} />
        ) : (
          <SearchVideoByEx {...props} />
        )}
      </Cell>
      <Cell />
    </Grid>
  );
};
export default mainPage;
