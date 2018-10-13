import {connect} from 'react-redux';
import {State} from 'core/store/State';
import {Dispatch} from 'core/store/Store';
import * as Selectors from 'core/store/quiz/selectors/quiz';
import * as Actions from 'core/store/quiz/actions/quiz';
import Home, {
    HomeCallbackProps,
    HomeValueProps
} from './Home';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: State): HomeValueProps => ({
    isQuizLoaded: Selectors.isQuizLoaded(state),
    quizCurrentQuestion: Selectors.quizCurrentQuestion(state),
    state: Selectors.getState(state)
});

const initializeAndStartQuiz = (dispatch: Dispatch) => async () => {
    await dispatch(Actions.fetchQuiz() as any);
};

const redirectToCurrentPage = (dispatch: Dispatch) => () =>{
    dispatch(Actions.redirectToCurrentPage({}));
};

const mapDispatchToProps = (dispatch: Dispatch, state: State): HomeCallbackProps => ({
    initializeAndStartQuiz: initializeAndStartQuiz(dispatch),
    redirectToCurrentPage: redirectToCurrentPage(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home) as any);
