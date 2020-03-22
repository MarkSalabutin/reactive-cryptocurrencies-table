import { Coin, CoinPrice, Order, CoinKey } from 'types';

export type Coins = Record<string, Coin>;
export type CoinPrices = Record<string, CoinPrice>;
export type CoinPricesResponse = Record<string, CoinPrices>;

export interface CoinsInfoResponse {
  Data: {
    CoinInfo: {
      Id: string;
      Name: string;
      FullName: string;
    };
    RAW: {
      USD: {
        PRICE: number;
        MKTCAP: number;
      };
    };
  }[];
}

export interface CoinFilters {
  name: string;
}

export interface Pagination {
  page: number;
  perPage: number;
}

export interface CoinsState {
  coins: Coins;
  isFetching: boolean;
  sorting: {
    by: CoinKey;
    order: Order;
  };
  filters: CoinFilters;
  pagination: Pagination;
}

export const enum ActionTypes {
  SET_COIN_PRICES = 'coins/SET_COIN_PRICES',
  SORT_COINS = 'coins/SORT_COINS',
  SET_COIN_FILTERS = 'coins/SET_COIN_FILTERS',
  SET_COINS_PAGINATION = 'coins/SET_COINS_PAGINATION',
  FETCH_COINS_INFO_REQUEST = 'coins/FETCH_COINS_INFO_REQUEST',
  FETCH_COINS_INFO_SUCCESS = 'coins/FETCH_COINS_INFO_SUCCESS',
  FETCH_COINS_INFO_CANCELED = 'coins/FETCH_COINS_INFO_CANCELED',
  START_OBSERVING_COIN_PRICES = 'coins/START_OBSERVING_COIN_PRICES',
  FINISH_OBSERVING_COIN_PRICES = 'coins/FINISH_OBSERVING_COIN_PRICES',
}
