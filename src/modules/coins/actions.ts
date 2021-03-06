import { CoinKey } from 'types';

import {
  ActionTypes,
  CoinPrices,
  Coins,
  CoinFilters,
  Pagination,
} from './types';

export type SetCoinPricePayload = CoinPrices;

export const setCoinPrices = (payload: CoinPrices) => ({
  type: ActionTypes.SET_COIN_PRICES as const,
  payload,
});

export type SetCoinPricesPayload = Parameters<typeof setCoinPrices>[0];
export type SetCoinPrices = ReturnType<typeof setCoinPrices>;

export const sortCoins = (payload: CoinKey) => ({
  type: ActionTypes.SORT_COINS as const,
  payload,
});

export type SortCoinsPayload = Parameters<typeof sortCoins>[0];
export type SortCoins = ReturnType<typeof sortCoins>;

export const setCoinFilters = (payload: Partial<CoinFilters>) => ({
  type: ActionTypes.SET_COIN_FILTERS as const,
  payload,
});

export type SetCoinFiltersPayload = Parameters<typeof setCoinFilters>[0];
export type SetCoinFilters = ReturnType<typeof setCoinFilters>;

export const setCoinsPaginationPerPage = (payload: Pagination['perPage']) => ({
  type: ActionTypes.SET_COINS_PAGINATION_PER_PAGE as const,
  payload,
});

export type SetCoinsPaginationPerPage = ReturnType<
  typeof setCoinsPaginationPerPage
>;
export type SetCoinsPaginationPerPagePayload = Parameters<
  typeof setCoinsPaginationPerPage
>[0];

export const setCoinsPaginationPage = (payload: Pagination['page']) => ({
  type: ActionTypes.SET_COINS_PAGINATION_PAGE as const,
  payload,
});

export type SetCoinsPaginationPage = ReturnType<typeof setCoinsPaginationPage>;
export type SetCoinsPaginationPagePayload = Parameters<
  typeof setCoinsPaginationPage
>[0];

export const fetchCoinsInfoRequest = () => ({
  type: ActionTypes.FETCH_COINS_INFO_REQUEST as const,
});

export type FetchCoinsInfoRequest = ReturnType<typeof fetchCoinsInfoRequest>;

export const fetchCoinsInfoSuccess = (payload: Coins) => ({
  type: ActionTypes.FETCH_COINS_INFO_SUCCESS as const,
  payload,
});

export type FetchCoinsInfoSuccessPayload = Parameters<
  typeof fetchCoinsInfoSuccess
>[0];
export type FetchCoinsInfoSuccess = ReturnType<typeof fetchCoinsInfoSuccess>;

export const fetchCoinsInfoCanceled = () => ({
  type: ActionTypes.FETCH_COINS_INFO_CANCELED as const,
});

export type FetchCoinsInfoCanceled = ReturnType<typeof fetchCoinsInfoCanceled>;

export const startObservingCoinPrices = () => ({
  type: ActionTypes.START_OBSERVING_COIN_PRICES as const,
});

export type StartObservingCoinPrices = ReturnType<
  typeof startObservingCoinPrices
>;

export const finishObservingCoinPrices = () => ({
  type: ActionTypes.FINISH_OBSERVING_COIN_PRICES as const,
});

export type FinishObservingCoinPrices = ReturnType<
  typeof finishObservingCoinPrices
>;

export type Action =
  | SetCoinPrices
  | SortCoins
  | SetCoinFilters
  | SetCoinsPaginationPerPage
  | SetCoinsPaginationPage
  | FetchCoinsInfoRequest
  | FetchCoinsInfoSuccess
  | FetchCoinsInfoCanceled
  | StartObservingCoinPrices
  | FinishObservingCoinPrices;
