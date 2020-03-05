import { ActionTypes } from './types';

export const setAssetsPrice = (payload: Record<string, number>) => ({
  type: ActionTypes.SET_ASSETS as const,
  payload,
});

export type SetAssetsPricePayload = Parameters<typeof setAssetsPrice>[0];
export type SetAssetsPrice = ReturnType<typeof setAssetsPrice>;

export const startObservingAssets = () => ({
  type: ActionTypes.START_OBSERVING_ASSETS as const,
});

export type StartObservingAssets = ReturnType<typeof startObservingAssets>;

export const finishObservingAssets = () => ({
  type: ActionTypes.FINISH_OBSERVING_ASSETS as const,
});

export type FinishObservingAssets = ReturnType<typeof finishObservingAssets>;

export type Action =
  | SetAssetsPrice
  | StartObservingAssets
  | FinishObservingAssets;
