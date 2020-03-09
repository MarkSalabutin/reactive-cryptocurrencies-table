import { Assets, ActionTypes } from './types';
import { Action, SetAssetPricesPayload } from './actions';

import assets from './assets.mock';

const INITIAL_STATE: Assets = assets;

const setAssetPrices = (
  state: Assets,
  payload: SetAssetPricesPayload,
): Assets =>
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

const reducer = (state: Assets = INITIAL_STATE, action: Action): Assets => {
  switch (action.type) {
    case ActionTypes.SET_ASSET_PRICES:
      return setAssetPrices(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
