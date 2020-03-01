import { Asset, AssetType, currencyAssetNames, stockAssetNames } from './types';

const assets = [...Array(5)].reduce<Asset[]>((assetsAccum, _, index) => {
  const currencyAsset = {
    id: assetsAccum.length,
    name: currencyAssetNames[index],
    price: Math.random() * 10,
    lastUpdate: Date.now(),
    type: AssetType.Currency as const,
  };

  const stockAsset = {
    id: assetsAccum.length + 1,
    name: stockAssetNames[index],
    price: Math.random() * 10,
    lastUpdate: Date.now(),
    type: AssetType.Stock as const,
  };

  return [...assetsAccum, currencyAsset, stockAsset];
}, []);

export default assets;
