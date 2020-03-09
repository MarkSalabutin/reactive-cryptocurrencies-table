import { combineEpics } from 'redux-observable';

import coinsEpic from './coins/epics';

const rootEpic = combineEpics(coinsEpic);

export default rootEpic;
