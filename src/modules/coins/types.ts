import { Coin, CoinPrice } from 'types';

export type Coins = Record<string, Coin>;
export type CoinPrices = Record<string, CoinPrice>;
export type CoinPricesResponse = Record<string, CoinPrices>;

export const enum ActionTypes {
  SET_COINS = 'coins/SET_COINS',
  SET_COIN_PRICES = 'coins/SET_COIN_PRICES',
  START_OBSERVING_COIN_PRICES = 'coins/START_OBSERVING_COIN_PRICES',
  FINISH_OBSERVING_COIN_PRICES = 'coins/FINISH_OBSERVING_COIN_PRICES',
}
