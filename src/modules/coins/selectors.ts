import { State } from 'modules/rootReducer';

export const getCoinsList = (state: State) => Object.values(state.coins.coins);

export const getCoinSymbolsList = (state: State) =>
  Object.keys(state.coins.coins);

export const getCoinsFetchingState = (state: State) => state.coins.isFetching;
