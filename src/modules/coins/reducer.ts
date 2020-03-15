import { Order } from 'types';

import { CoinsState, ActionTypes } from './types';
import {
  Action,
  SetCoinPricesPayload,
  FetchCoinsInfoSuccessPayload,
  SortCoinsPayload,
} from './actions';

const INITIAL_STATE: CoinsState = {
  coins: {},
  isFetching: false,
  sorting: {
    by: 'marketCap',
    order: Order.desc,
  },
};

const setCoinPrices = (
  state: CoinsState,
  payload: SetCoinPricesPayload,
): CoinsState => {
  const updatedCoins = Object.keys(payload).reduce(
    (coins, coinName) => ({
      ...coins,
      [coinName]: {
        ...coins[coinName],
        price: payload[coinName],
        lastUpdate: Date.now(),
      },
    }),
    state.coins,
  );

  return {
    ...state,
    coins: updatedCoins,
  };
};

const sortCoins = (state: CoinsState, sortBy: SortCoinsPayload): CoinsState => {
  const { sorting } = state;
  const order =
    sorting.by === sortBy && sorting.order === Order.desc
      ? Order.asc
      : Order.desc;

  return {
    ...state,
    sorting: {
      ...sorting,
      by: sortBy,
      order,
    },
  };
};

const fetchCoinsInfoRequest = (state: CoinsState): CoinsState => ({
  ...state,
  isFetching: true,
});

const fetchCoinsInfoSuccess = (
  state: CoinsState,
  payload: FetchCoinsInfoSuccessPayload,
): CoinsState => ({
  ...state,
  isFetching: false,
  coins: payload,
});

const fetchCoinsInfoCanceled = (state: CoinsState): CoinsState => ({
  ...state,
  isFetching: false,
});

const reducer = (
  state: CoinsState = INITIAL_STATE,
  action: Action,
): CoinsState => {
  switch (action.type) {
    case ActionTypes.SET_COIN_PRICES:
      return setCoinPrices(state, action.payload);
    case ActionTypes.SORT_COINS:
      return sortCoins(state, action.payload);
    case ActionTypes.FETCH_COINS_INFO_REQUEST:
      return fetchCoinsInfoRequest(state);
    case ActionTypes.FETCH_COINS_INFO_SUCCESS:
      return fetchCoinsInfoSuccess(state, action.payload);
    case ActionTypes.FETCH_COINS_INFO_CANCELED:
      return fetchCoinsInfoCanceled(state);
    default:
      return state;
  }
};

export default reducer;
