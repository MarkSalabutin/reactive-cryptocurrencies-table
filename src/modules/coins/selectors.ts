import { createSelector } from 'reselect';

import { State } from 'modules/rootReducer';
import { immutableSort, getComparator } from 'utils';

export const getCoinsSorting = (state: State) => state.coins.sorting;
export const getCoinsList = (state: State) => Object.values(state.coins.coins);

export const getSortedCoinsList = createSelector(
  getCoinsList,
  getCoinsSorting,
  (coins, sorting) =>
    immutableSort(coins, getComparator(sorting.order, sorting.by)),
);

export const getCoinSymbolsList = (state: State) =>
  Object.keys(state.coins.coins);

export const getCoinsFetchingState = (state: State) => state.coins.isFetching;
