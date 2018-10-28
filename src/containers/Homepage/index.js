import React from 'react';

import HeroHeader from './HeroHeader';
import Login from './Login';
import { Grid, Cell } from 'styled-css-grid';
import Footer from '../../components/Styled/Footer';

/**Holy Grail Layout using styled-css-grid*/
const homepage = () => (
  <Grid
    columns={'minmax(0 , 1fr) minmax(min-content, 14rem) minmax(0 , 1fr)'}
    rows={'100vh 1fr minmax(45px,auto)'}
    gap={'0'}>
    <Cell width={3}>
      <HeroHeader />
    </Cell>
    <Cell />
    <Cell id="section-2">
      <Login />
    </Cell>
    <Cell />
    <Cell width={3}>
      <Footer />
    </Cell>
  </Grid>
);

export default homepage;
