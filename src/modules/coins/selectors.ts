import { createSelector } from 'reselect';

import { Coin } from 'types';
import { State } from 'modules/rootReducer';
import { immutableSort, getComparator } from 'utils';

import { CoinFilters } from './types';

export const getCoinsSorting = (state: State) => state.coins.sorting;
export const getCoinsList = (state: State) => Object.values(state.coins.coins);
export const getCoinsFilters = (state: State) => state.coins.filters;

export const getFilteredSortedCoinsList = createSelector(
  getCoinsList,
  getCoinsFilters,
  getCoinsSorting,
  (coins, filters: CoinFilters, sorting) => {
    const filteredCoins = Object.keys(filters).reduce<Coin[]>(
      (result, filterKey) => {
        return result.filter(coin =>
          coin[filterKey as keyof CoinFilters].includes(
            filters[filterKey as keyof CoinFilters],
          ),
        );
      },
      coins,
    );

    return immutableSort(
      filteredCoins,
      getComparator(sorting.order, sorting.by),
    );
  },
);

export const getCoinSymbolsList = (state: State) =>
  Object.keys(state.coins.coins);

export const getCoinsFetchingState = (state: State) => state.coins.isFetching;
