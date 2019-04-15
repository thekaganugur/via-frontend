import React from 'react';

import Layout from '../../components/Layout';
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
    <Layout>
      <ConditionalRender props={props} />
    </Layout>
  );
};
export default mainPage;
