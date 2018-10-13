
import {
    FETCH_QUIZ,
    FETCH_QUIZ_FAILED,
    FETCH_QUIZ_SUCCESS,
    QUIT_QUIZ,
    STORE_ANSWER,
    QUIZ_FINISHED
  } from 'core/constants/quiz';
import {thunkCreator} from 'core/store/Actions';
import {QUIZ_AMOUNT} from 'core/constants/quiz';
import history from 'core/history';

export const fetchQuiz = () => ({
    type: FETCH_QUIZ
});

export const fetchQuizSuccess = (quiz: any) => ({
    payload: { quiz },
    type: FETCH_QUIZ_SUCCESS
});

export const fetchQuizFailed = () => ({
    type: FETCH_QUIZ_FAILED
});

export const redirectToCurrentPage = thunkCreator<{}>(
    async ({payload, dispatch, getState}) => {
        const state = getState();

        const quizCurrentQuestion = state.quizCurrentQuestion;

        if (quizCurrentQuestion) {
            history.push('/quiz/'+quizCurrentQuestion);
        }
    }
);

export const quitQuiz = () => ({
    type: QUIT_QUIZ
});

export const storeSingleAnswer = (id: number, answer: string, nextQuestionId: number) => ({
    payload: {id, answer, nextQuestionId},
    type: STORE_ANSWER
});

export const quizHasBeenFinished = () => ({
    payload: {},
    type: QUIZ_FINISHED
});

export const storeAnswer = thunkCreator<{ answer: string }>(
    async ({payload, dispatch, getState}) => {
        const state = getState();

        const currentQuestionID = state.quizCurrentQuestion;
        const nextId = Number(currentQuestionID)+1;

        dispatch(storeSingleAnswer(currentQuestionID-1, payload.answer, nextId));
        if (nextId <= QUIZ_AMOUNT) {
            history.push('/quiz/' + nextId);
        } else {
            dispatch(quizHasBeenFinished());
            history.push('/results');
        }
    }
);
