export enum AssetType {
  Currency = 'Currency',
  Stock = 'Stock',
  Crypto = 'Crypto',
}

export type AssetName = string;
export type AssetPrice = number;

export interface Asset {
  id: number;
  price: AssetPrice;
  lastUpdate: number;
  type: AssetType;
  name: AssetName;
}
