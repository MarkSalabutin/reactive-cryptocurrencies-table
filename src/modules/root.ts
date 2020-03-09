import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import coinsReducer from './coins/reducer';
import coinsEpic from './coins/epics';
import { Coins } from './coins/types';

export interface State {
  coins: Coins;
}

export const rootReducer = combineReducers({
  coins: coinsReducer,
});

export const rootEpic = combineEpics(coinsEpic);
