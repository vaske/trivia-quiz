import {initialState} from 'core/store/State';
import {Question} from 'core/store/State';

import {
    FETCH_QUIZ_SUCCESS,
    QUIT_QUIZ,
    STORE_ANSWER,
    QUIZ_FINISHED
} from 'core/constants/quiz';

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                isQuizLoaded: true,
                quiz: action.payload.quiz.results,
                quizSize: action.payload.quiz.results.length,
                quizCurrentQuestion: 1,
                isQuizCompleted: false
            };
        case QUIT_QUIZ:
            return {
                ...state,
                isQuizLoaded: false,
                quiz: [],
                quizCurrentQuestion: undefined,
                quizSize: undefined,
                isQuizCompleted: false
            };
        case STORE_ANSWER:
            return {
                ...state,
                quiz: state.quiz.map(
                    (content: Question, i: number) => i === action.payload.id ? {...content, userAnswer: action.payload.answer}
                        : content),
                quizCurrentQuestion: action.payload.nextQuestionId
            };
        case QUIZ_FINISHED:
            return {
                ...state,
                isQuizCompleted: true
            };
        default:
            return state;
    }
};

export default reducer;
