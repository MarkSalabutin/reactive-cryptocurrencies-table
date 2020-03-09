import { Observable, interval } from 'rxjs';
import { switchMapTo, map, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';

import { ActionTypes, CoinPricesResponse, CoinPrices } from './types';
import { setCoinPrices } from './actions';

const coinsToWatch = [
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

const url = `${API_URL}/pricemulti?fsyms=${coinsToWatch}&tsyms=${cryptoToConvert}&api_key=${API_KEY}`;

const coinsEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(ActionTypes.START_OBSERVING_COIN_PRICES),
    switchMapTo(
      interval(10000).pipe(
        switchMapTo(
          ajax(url).pipe(
            map(({ response }: { response: CoinPricesResponse }) =>
              Object.entries(response).reduce<CoinPrices>(
                (result, [key, value]) => ({ ...result, [key]: value.USD }),
                {},
              ),
            ),
          ),
        ),
        takeUntil(
          action$.pipe(ofType(ActionTypes.FINISH_OBSERVING_COIN_PRICES)),
        ),
      ),
    ),
    map(setCoinPrices),
  );

export default coinsEpic;
