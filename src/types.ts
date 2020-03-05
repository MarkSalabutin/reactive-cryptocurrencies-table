export enum AssetType {
  Currency = 'Currency',
  Stock = 'Stock',
  Crypto = 'Crypto',
}
export interface Asset {
  id: number;
  price: number;
  lastUpdate: number;
  type: AssetType;
  name: string;
}
