export enum AssetType {
  Currency = 'Currency',
  Stock = 'Stock',
}

export const currencyAssetNames = ['USD', 'EUR', 'JPY', 'CHF', 'CAD'] as const;
export const stockAssetNames = ['MSFT', 'AAPL', 'AMZN', 'GOOG', 'FB'] as const;

interface AssetBase {
  id: number;
  price: number;
  lastUpdate: number;
}

export interface CurrencyAsset extends AssetBase {
  type: AssetType.Currency;
  name: typeof currencyAssetNames[number];
}

export interface StockAsset extends AssetBase {
  type: AssetType.Stock;
  name: typeof stockAssetNames[number];
}

export type Asset = CurrencyAsset | StockAsset;
