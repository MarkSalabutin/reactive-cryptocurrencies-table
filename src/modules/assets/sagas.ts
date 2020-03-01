import { takeLatest, call } from 'redux-saga/effects';

import { ActionTypes } from './types';

export function* observeAssetsSaga() {
  yield call(console.log, 'observing assets...');
}

const sagas = [
  takeLatest(ActionTypes.START_OBSERVING_ASSETS, observeAssetsSaga),
];

export default sagas;
