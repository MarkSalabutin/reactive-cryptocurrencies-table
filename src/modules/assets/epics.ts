import { Observable, interval } from 'rxjs';
import { switchMapTo, map, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';

import { ActionTypes, AssetPricesResponse, AssetPrices } from './types';
import { setAssetPrices } from './actions';

const cryptoToWatch = [
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

const cryptoToConvert = 'USD';

const url = `${API_URL}/pricemulti?fsyms=${cryptoToWatch}&tsyms=${cryptoToConvert}&api_key=${API_KEY}`;

const assetsEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(ActionTypes.START_OBSERVING_ASSETS),
    switchMapTo(
      interval(10000).pipe(
        switchMapTo(
          ajax(url).pipe(
            map(({ response }: { response: AssetPricesResponse }) =>
              Object.entries(response).reduce<AssetPrices>(
                (result, [key, value]) => ({ ...result, [key]: value.USD }),
                {},
              ),
            ),
          ),
        ),
        takeUntil(action$.pipe(ofType(ActionTypes.FINISH_OBSERVING_ASSETS))),
      ),
    ),
    map(setAssetPrices),
  );

export default assetsEpic;
