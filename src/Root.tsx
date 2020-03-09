import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';

import ContentContainer from 'components/ContentContainer';
import Header from 'components/Header';
import { Store } from 'modules/store';
import CoinsTable from './pages/CoinsTable';

export interface RootProps {
  store: Store;
}

const Root: React.FC<RootProps> = ({ store }) => (
  <Provider store={store}>
    <ContentContainer>
      <Header />
      <Router>
        <Route path="/" component={CoinsTable} />
      </Router>
    </ContentContainer>
  </Provider>
);

export default Root;
