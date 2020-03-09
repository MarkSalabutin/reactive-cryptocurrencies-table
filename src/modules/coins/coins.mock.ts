import { Coin } from 'types';
import { Coins } from './types';

const coinSymbols = [
  'BTC',
  'ETH',
  'XRP',
  'BCH',
  'BSV',
  'ETC',
  'LTC',
  'EOS',
  'BNB',
  'ADA',
] as const;

const coins = coinSymbols.reduce(
  (result, symbol, index) => ({
    ...result,
    [symbol]: {
      id: index,
      symbol,
      name: symbol,
      price: 0,
      marketCap: 0,
      lastUpdate: Date.now(),
    } as Coin,
  }),
  {} as Coins,
);

export default coins;
