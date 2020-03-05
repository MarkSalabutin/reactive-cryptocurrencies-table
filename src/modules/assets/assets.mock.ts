import { AssetType } from '../../types';

const cryptos = [
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

const assets = cryptos.reduce(
  (result, name, index) => ({
    ...result,
    [name]: {
      id: index,
      name,
      price: 0,
      lastUpdate: Date.now(),
      type: AssetType.Crypto,
    },
  }),
  {},
);

export default assets;
