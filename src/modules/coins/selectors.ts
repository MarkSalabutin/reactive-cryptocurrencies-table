import { State } from 'modules/root';

export const getCoinsList = (state: State) => Object.values(state.coins);
