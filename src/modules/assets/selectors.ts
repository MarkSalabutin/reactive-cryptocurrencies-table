import { State } from 'modules/root';

export const getAssetsList = (state: State) => Object.values(state.assets);
