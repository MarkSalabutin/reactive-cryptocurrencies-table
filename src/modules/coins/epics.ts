import { Observable, interval, pipe } from 'rxjs';
import { switchMapTo, map, takeUntil } from 'rxjs/operators';
import { ofType, Epic, StateObservable } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';

import { State } from 'modules/rootReducer';
import { ActionTypes, CoinPricesResponse, CoinPrices } from './types';
import { setCoinPrices } from './actions';
import { getCoinSymbolsList } from './selectors';

const cryptoToConvert = 'USD';

const getCoinPricesURL = (coinSyms: string[]) =>
  `${API_URL}/pricemulti?fsyms=${coinSyms}&tsyms=${cryptoToConvert}&api_key=${API_KEY}`;

const makeCoinPricesRequest = pipe(getCoinSymbolsList, getCoinPricesURL, ajax);

const extractCoinPricesFromResponse = ({
  response,
}: {
  response: CoinPricesResponse;
}) =>
  Object.entries(response).reduce<CoinPrices>(
    (result, [key, value]) => ({ ...result, [key]: value.USD }),
    {},
  );

const coinsEpic: Epic = (
  action$: Observable<Action>,
  state$: StateObservable<State>,
) =>
  action$.pipe(
    ofType(ActionTypes.START_OBSERVING_COIN_PRICES),
    switchMapTo(
      interval(10000).pipe(
        switchMapTo(
          makeCoinPricesRequest(state$.value).pipe(
            map(extractCoinPricesFromResponse),
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
