import { combineEpics } from 'redux-observable';

import {
    fetchQuizes
} from 'core/epics/quiz/quiz';


export const rootEpic = combineEpics(
    fetchQuizes
);
