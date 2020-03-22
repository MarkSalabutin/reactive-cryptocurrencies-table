import { Observable, interval, pipe } from 'rxjs';
import {
  switchMapTo,
  switchMap,
  map,
  takeUntil,
  withLatestFrom,
  mapTo,
} from 'rxjs/operators';
import { ofType, Epic, StateObservable, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';

import { State } from 'modules/rootReducer';
import {
  ActionTypes,
  CoinPricesResponse,
  CoinPrices,
  CoinsInfoResponse,
  Coins,
} from './types';
import {
  setCoinPrices,
  fetchCoinsInfoSuccess,
  setCoinsPaginationPage,
} from './actions';
import { getCoinSymbolsList } from './selectors';

const cryptoToConvert = 'USD';

const getCoinPricesURL = (coinSyms: string[]) =>
  `${API_URL}/pricemulti?fsyms=${coinSyms}&tsyms=${cryptoToConvert}&api_key=${API_KEY}`;

const coinsInfoURL = `${API_URL}/top/mktcapfull?limit=70&tsym=USD`;

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

const extractCoinInfoFromResponse = ({
  response,
}: {
  response: CoinsInfoResponse;
}): Coins =>
  response.Data.reduce((coins, coin) => {
    const symbol = coin.CoinInfo.Name;

    return {
      ...coins,
      [symbol]: {
        id: Number(coin.CoinInfo.Id),
        name: coin.CoinInfo.FullName,
        symbol,
        price: coin.RAW.USD.PRICE,
        marketCap: coin.RAW.USD.MKTCAP,
        lastUpdate: Date.now(),
      },
    };
  }, {} as Coins);

const coinsInfoEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(ActionTypes.FETCH_COINS_INFO_REQUEST),
    switchMapTo(
      ajax(coinsInfoURL).pipe(
        map(extractCoinInfoFromResponse),
        takeUntil(action$.pipe(ofType(ActionTypes.FETCH_COINS_INFO_CANCELED))),
      ),
    ),
    map(fetchCoinsInfoSuccess),
  );

const observingCoinPricesEpic: Epic = (
  action$: Observable<Action>,
  state$: StateObservable<State>,
) =>
  action$.pipe(
    ofType(ActionTypes.START_OBSERVING_COIN_PRICES),
    switchMapTo(
      interval(10000).pipe(
        withLatestFrom(state$),
        switchMap(([, state]) =>
          makeCoinPricesRequest(state).pipe(map(extractCoinPricesFromResponse)),
        ),
        takeUntil(
          action$.pipe(ofType(ActionTypes.FINISH_OBSERVING_COIN_PRICES)),
        ),
      ),
    ),
    map(setCoinPrices),
  );

const coinsPaginationEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(
      ActionTypes.SET_COINS_PAGINATION_PER_PAGE,
      ActionTypes.SET_COIN_FILTERS,
    ),
    mapTo(setCoinsPaginationPage(0)),
  );

const coinsEpic = combineEpics(
  coinsInfoEpic,
  observingCoinPricesEpic,
  coinsPaginationEpic,
);

export default coinsEpic;
