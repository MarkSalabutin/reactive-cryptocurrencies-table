import { ActionTypes, CoinPrices } from './types';

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
  | SetCoinPrices
  | StartObservingCoinPrices
  | FinishObservingCoinPrices;
