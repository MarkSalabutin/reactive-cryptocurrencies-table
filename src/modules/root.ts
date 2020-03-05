import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import assetsReducer from './assets/reducer';
import assetsEpic from './assets/epics';
import { Assets } from './assets/types';

export interface State {
  assets: Assets;
}

export const rootReducer = combineReducers({
  assets: assetsReducer,
});

export const rootEpic = combineEpics(assetsEpic);
