export interface Coin {
  id: number;
  symbol: string;
  name: string;
  price: number;
  lastUpdate: number;
  marketCap: number;
}

export type CoinKey = keyof Coin;

export type CoinPrice = Coin['price'];
export type CoinSymbol = Coin['symbol'];

export const enum Order {
  asc = 'asc',
  desc = 'desc',
}

export type Comparator<T> = (a: T, b: T) => number;
