import {connect} from 'react-redux';
import {State} from 'core/store/State';
import {Dispatch} from 'core/store/Store';
import * as Selectors from 'core/store/quiz/selectors/quiz';
import * as Actions from 'core/store/quiz/actions/quiz';
import Results, {
    ResultsCallbackProps,
    ResultsValueProps
} from './Results';
import { withRouter } from 'react-router-dom';
import history from 'core/history';

const mapStateToProps = (state: State): ResultsValueProps => ({
    isQuizLoaded: Selectors.isQuizLoaded(state),
    quiz: Selectors.entireQuiz(state),
    isQuizCompleted: Selectors.isQuizCompleted(state)
});

const quitQuiz = (dispatch: Dispatch) => async () => {
    dispatch(Actions.quitQuiz() as any);
    history.push('/');
};

const redirectToHomePage = () => async () =>{
    history.push('/');
};

const mapDispatchToProps = (dispatch: Dispatch): ResultsCallbackProps => ({
    quitQuiz: quitQuiz(dispatch),
    redirectToHomePage: redirectToHomePage()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results) as any);
