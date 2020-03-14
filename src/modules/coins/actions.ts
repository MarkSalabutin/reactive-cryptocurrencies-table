import { ActionTypes, CoinPrices, Coins } from './types';

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

export const setCoinPrices = (payload: CoinPrices) => ({
  type: ActionTypes.SET_COIN_PRICES as const,
  payload,
});

export type SetCoinPricesPayload = Parameters<typeof setCoinPrices>[0];
export type SetCoinPrices = ReturnType<typeof setCoinPrices>;

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
  | FetchCoinsInfoRequest
  | FetchCoinsInfoSuccess
  | FetchCoinsInfoCanceled
  | SetCoinPrices
  | StartObservingCoinPrices
  | FinishObservingCoinPrices;
