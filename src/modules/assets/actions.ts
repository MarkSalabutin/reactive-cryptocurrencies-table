import { ActionTypes, AssetPrices } from './types';

export const setAssetPrices = (payload: AssetPrices) => ({
  type: ActionTypes.SET_ASSET_PRICES as const,
  payload,
});

export type SetAssetPricesPayload = Parameters<typeof setAssetPrices>[0];
export type SetAssetPrices = ReturnType<typeof setAssetPrices>;

export const startObservingAssets = () => ({
  type: ActionTypes.START_OBSERVING_ASSETS as const,
});

export type StartObservingAssets = ReturnType<typeof startObservingAssets>;

export const finishObservingAssets = () => ({
  type: ActionTypes.FINISH_OBSERVING_ASSETS as const,
});

export type FinishObservingAssets = ReturnType<typeof finishObservingAssets>;

export type Action =
  | SetAssetPrices
  | StartObservingAssets
  | FinishObservingAssets;
