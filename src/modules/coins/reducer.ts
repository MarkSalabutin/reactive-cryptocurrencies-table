import { Coins, ActionTypes } from './types';
import { Action, SetCoinPricesPayload } from './actions';

import coins from './coins.mock';

const INITIAL_STATE: Coins = coins;

const setCoinPrices = (state: Coins, payload: SetCoinPricesPayload): Coins =>
  Object.keys(payload).reduce(
    (result, cryptoName) => ({
      ...result,
      [cryptoName]: {
        ...state[cryptoName],
        price: payload[cryptoName],
        lastUpdate: Date.now(),
      },
    }),
    state,
  );

const reducer = (state: Coins = INITIAL_STATE, action: Action): Coins => {
  switch (action.type) {
    case ActionTypes.SET_COIN_PRICES:
      return setCoinPrices(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
