import { Assets, ActionTypes } from './types';
import { Action, SetAssetsPricePayload } from './actions';

import assets from './assets.mock';

const INITIAL_STATE: Assets = assets;

const setAssetsPrice = (
  state: Assets,
  payload: SetAssetsPricePayload,
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
    case ActionTypes.SET_ASSETS:
      return setAssetsPrice(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
