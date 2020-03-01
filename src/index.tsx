import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import store from './modules/store';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
