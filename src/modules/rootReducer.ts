import { combineReducers } from 'redux';

import coinsReducer from './coins/reducer';
import { CoinsState } from './coins/types';

export interface State {
  coins: CoinsState;
}

const rootReducer = combineReducers({
  coins: coinsReducer,
});

export default rootReducer;
