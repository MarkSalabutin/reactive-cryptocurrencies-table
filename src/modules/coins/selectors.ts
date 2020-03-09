import { State } from 'modules/rootReducer';

export const getCoinsList = (state: State) => Object.values(state.coins);
