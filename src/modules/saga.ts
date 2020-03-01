import { all } from 'redux-saga/effects';

import assetsSagas from './assets/sagas';

export default function*() {
  yield all([...assetsSagas]);
}
