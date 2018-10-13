import {State} from 'core/store/State';
import {createSelector} from 'reselect';

const mainState = createSelector((state: State) => state, state => state);

export const getState = (state: State) => state;

export const getQuiz = (state: State) => state.quiz;
export const isQuizLoaded = createSelector(mainState, mainState => mainState.isQuizLoaded);
export const quizCurrentQuestion = createSelector(mainState, mainState => mainState.quizCurrentQuestion);
export const currentQuestion = createSelector(mainState, mainState => mainState.quiz[mainState.quizCurrentQuestion-1]);
export const entireQuiz = createSelector(mainState, mainState => mainState.quiz);
export const isQuizCompleted = createSelector(mainState, mainState => mainState.isQuizCompleted);
