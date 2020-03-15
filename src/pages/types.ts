import { CoinKey, Coin } from 'types';

export interface TableItem {
  name: CoinKey;
  label: string;
  numeric?: boolean;
  format?(value: Coin[CoinKey]): string;
}
