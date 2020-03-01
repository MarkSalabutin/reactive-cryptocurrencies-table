import { Asset } from 'types';

import { ActionTypes } from './types';

export const setAssets = (payload: { assets: Asset[] }) => ({
  type: ActionTypes.SET_ASSETS as const,
  payload,
});

export type SetAssetsPayload = Parameters<typeof setAssets>[0];
export type SetAssets = ReturnType<typeof setAssets>;

export const startObservingAssets = () => ({
  type: ActionTypes.START_OBSERVING_ASSETS as const,
});

export type StartObservingAssets = ReturnType<typeof startObservingAssets>;

export const finishObservingAssets = () => ({
  type: ActionTypes.FINISH_OBSERVING_ASSETS as const,
});

export type FinishObservingAssets = ReturnType<typeof finishObservingAssets>;

export type Action = SetAssets | StartObservingAssets | FinishObservingAssets;
