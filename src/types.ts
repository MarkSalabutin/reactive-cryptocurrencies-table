export interface Coin {
  id: number;
  symbol: string;
  name: string;
  price: number;
  lastUpdate: number;
  marketCap: number;
}

export type CoinPrice = Coin['price'];
export type CoinSymbol = Coin['symbol'];
