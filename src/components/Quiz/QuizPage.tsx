import {connect} from 'react-redux';
import {State} from 'core/store/State';
import {Dispatch} from 'core/store/Store';
import * as Selectors from 'core/store/quiz/selectors/quiz';
import * as Actions from 'core/store/quiz/actions/quiz';
import Quiz, {
    QuizCallbackProps,
    QuizValueProps
} from './Quiz';
import { withRouter } from 'react-router-dom';
import history from 'core/history';

const mapStateToProps = (state: State): QuizValueProps => ({
    isQuizLoaded: Selectors.isQuizLoaded(state),
    quizCurrentQuestion: Selectors.quizCurrentQuestion(state),
    state: Selectors.getState(state),
    currentQuestion: Selectors.currentQuestion(state),
    isQuizCompleted: Selectors.isQuizCompleted(state)
});

const quitQuiz = (dispatch: Dispatch) => async () => {
    dispatch(Actions.quitQuiz() as any);
    history.push('/');
};

const storeAnswer = (dispatch: Dispatch) => async (answer: string) => {
    dispatch(Actions.storeAnswer({answer}));
};

const redirectToHomePage = () => async () =>{
    history.push('/');
};

const redirectToResultsPage = () => async () =>{
    history.push('/results');
};

const redirectToCurrentPage = () => async (qurentPage: number) =>{
    history.push(`/quiz/${qurentPage}`);
};

const mapDispatchToProps = (dispatch: Dispatch): QuizCallbackProps => ({
    quitQuiz: quitQuiz(dispatch),
    storeAnswer: storeAnswer(dispatch),
    redirectToHomePage: redirectToHomePage(),
    redirectToCurrentPage: redirectToCurrentPage(),
    redirectToResultsPage: redirectToResultsPage()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz) as any);
