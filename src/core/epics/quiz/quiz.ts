import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';

import { QUIZ_API } from 'core/constants/general';
import { FETCH_QUIZ } from 'core/constants/quiz';

import {
    fetchQuizFailed,
    fetchQuizSuccess
} from 'core/store/quiz/actions/quiz';

export const fetchQuizes = (action$: any) =>
    action$.pipe(
        ofType(FETCH_QUIZ),
        mergeMap(action =>
            ajax(`${QUIZ_API}`).pipe(
                map(quiz => fetchQuizSuccess(quiz.response)),
                retry(2),
                catchError(error => of(fetchQuizFailed()))
            )
        )
    );
