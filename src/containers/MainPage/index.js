import React from 'react';
import { Grid, Cell } from 'styled-css-grid';

import Navigation from '../../components/Navigation';
import SearchVideo from './SearchVideo';
import SearchVideoByEx from './SearchVideoByEx';
import UploadVideo from './UploadVideo';

const ConditionalRender = props => {
  switch (props.props.match.path) {
    case '/search/byexample':
      return <SearchVideoByEx {...props} />;
    case '/search':
      return <SearchVideo {...props} />;
    case '/uploadVideo':
      return <UploadVideo {...props} />;
    default:
  }
};

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
      <ConditionalRender props={props} />
      <Cell />
      <Cell />
    </Grid>
  );
};
export default mainPage;
