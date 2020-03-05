import { Asset } from 'types';

export type Assets = Record<string, Asset>;

export const enum ActionTypes {
  SET_ASSETS = 'assets/SET_ASSETS',
  START_OBSERVING_ASSETS = 'assets/START_OBSERVING_ASSETS',
  FINISH_OBSERVING_ASSETS = 'assets/FINISH_OBSERVING_ASSETS',
}
