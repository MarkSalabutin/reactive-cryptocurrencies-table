import { AssetsState, ActionTypes } from './types';
import { Action, SetAssetsPayload } from './actions';

const INITIAL_STATE: AssetsState = {
  list: [],
};

const setAssets = (
  state: AssetsState,
  payload: SetAssetsPayload,
): AssetsState => ({
  ...state,
  list: payload.assets,
});

const reducer = (
  state: AssetsState = INITIAL_STATE,
  action: Action,
): AssetsState => {
  switch (action.type) {
    case ActionTypes.SET_ASSETS:
      return setAssets(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
