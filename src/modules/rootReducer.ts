import { combineReducers } from 'redux';

import coinsReducer from './coins/reducer';
import { Coins } from './coins/types';

export interface State {
  coins: Coins;
}

const rootReducer = combineReducers({
  coins: coinsReducer,
});

export default rootReducer;
