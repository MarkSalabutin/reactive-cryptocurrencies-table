import { Order } from 'types';

import { CoinsState, ActionTypes } from './types';
import {
  Action,
  SetCoinPricesPayload,
  FetchCoinsInfoSuccessPayload,
  SortCoinsPayload,
  SetCoinFiltersPayload,
  SetCoinsPaginationPayload,
} from './actions';

const INITIAL_STATE: CoinsState = {
  coins: {},
  isFetching: false,
  sorting: {
    by: 'marketCap',
    order: Order.desc,
  },
  filters: {
    name: '',
  },
  pagination: {
    page: 0,
    perPage: 10,
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

const setCoinFilters = (
  state: CoinsState,
  payload: SetCoinFiltersPayload,
): CoinsState => ({
  ...state,
  filters: {
    ...state.filters,
    ...payload,
  },
});

const setCoinsPagination = (
  state: CoinsState,
  payload: SetCoinsPaginationPayload,
): CoinsState => ({
  ...state,
  pagination: {
    ...payload,
  },
});

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
    case ActionTypes.SET_COIN_FILTERS:
      return setCoinFilters(state, action.payload);
    case ActionTypes.SET_COINS_PAGINATION:
      return setCoinsPagination(state, action.payload);
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
