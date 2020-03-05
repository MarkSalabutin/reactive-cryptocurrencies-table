import { Observable, interval } from 'rxjs';
import { switchMapTo, tap, map, takeUntil } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';

import { ActionTypes } from './types';

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

const url = `${API_URL}/pricemulti?fsyms=${cryptoToWatch}&tsyms=USD&api_key=${API_KEY}`;

const obs$ = ajax(url);

obs$.subscribe(console.log);

const assetsEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(ActionTypes.START_OBSERVING_ASSETS),
    switchMapTo(
      interval(10000).pipe(
        takeUntil(action$.pipe(ofType(ActionTypes.FINISH_OBSERVING_ASSETS))),
      ),
    ),
    tap(val => console.log(val)),
    map(() => ({ type: '' })),
  );

export default assetsEpic;
