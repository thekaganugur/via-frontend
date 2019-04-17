import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../../components/Layout';
import SearchVideo from './SearchVideo';
import SearchVideoByEx from './SearchVideoByEx';
import UploadVideo from './UploadVideo';

const mainPage = () => {
  return (
    <Layout>
      <Switch>
        <Route path={'/search/byexample'} component={SearchVideoByEx} />
        <Route path={'/search'} component={SearchVideo} />
        <Route path={'/uploadVideo'} component={UploadVideo} />
      </Switch>
    </Layout>
  );
};
export default mainPage;
