import { Asset, AssetPrice } from 'types';

export type Assets = Record<string, Asset>;
export type AssetPrices = Record<string, AssetPrice>;
export type AssetPricesResponse = Record<string, AssetPrices>;

export const enum ActionTypes {
  SET_ASSETS = 'assets/SET_ASSETS',
  SET_ASSET_PRICES = 'assets/SET_ASSET_PRICES',
  START_OBSERVING_ASSETS = 'assets/START_OBSERVING_ASSETS',
  FINISH_OBSERVING_ASSETS = 'assets/FINISH_OBSERVING_ASSETS',
}
