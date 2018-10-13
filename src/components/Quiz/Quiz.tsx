import * as React from 'react';
import {State, Question as QuestionModel} from 'core/store/State';
import {RouteComponentProps} from 'react-router';
import Question from 'components/Quiz/Question';
import {ANSWERS, QUIZ_AMOUNT} from 'core/constants/quiz';

import './Quiz.sass';

const uuidv1 = require('uuid/v1');

export interface QuizCallbackProps {
    quitQuiz: () => void,
    storeAnswer: (answer: string) => void,
    redirectToHomePage: () => void,
    redirectToCurrentPage: (currenPage: number) => void,
    redirectToResultsPage: () => void,
}

export interface QuizValueProps {
    isQuizLoaded: boolean,
    quizCurrentQuestion: number,
    currentQuestion: QuestionModel,
    state: State,
    isQuizCompleted: boolean
}

export interface QuizState {
    answerStoring: boolean,
    error: any
}

export interface QuizRouteParameters {
    id: string | undefined
}

export interface QuizProps extends QuizCallbackProps, QuizValueProps, RouteComponentProps<QuizRouteParameters, {}> {}

class Quiz extends React.Component<QuizProps, QuizState> {

    constructor(props: QuizProps) {
        super(props);
        this.state = {
            error: undefined,
            answerStoring: false
        };
    }

    public componentWillMount() {
        if (!this.props.isQuizLoaded || !this.props.match.params.id || !Number(this.props.match.params.id)) {
            this.props.redirectToHomePage();
        } else if (Number(this.props.match.params.id) !== this.props.quizCurrentQuestion) {
            this.props.redirectToCurrentPage(this.props.quizCurrentQuestion);
        } else if (this.props.isQuizCompleted) {
            this.props.redirectToResultsPage();
        }
    }

    public quitQuiz = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.quitQuiz();
    };

    public recordAnswer = (answer: string) => {
        this.setState({answerStoring: true});
        this.props.storeAnswer(answer);
        this.setState({answerStoring: false});
    }

	public render() {
  		return (
            <div className='container quiz-page'>
                <div className='columns is-mobile is-centered quiz-question-container'>
                    <div className='column is-half'>
                        { this.props.currentQuestion && <Question question={ this.props.currentQuestion }/> }
                        <div className='buttons is-centered'>
                            <button
                                key={ uuidv1() }
                                className='button is-primary is-rounded is-outlined is-large'
                                onClick={ () => this.recordAnswer(ANSWERS.TRUE) }
                                disabled={ this.state.answerStoring }
                            >True</button>
                            <button
                                key={ uuidv1() }
                                className='button is-primary is-rounded is-outlined is-large'
                                onClick={ () => this.recordAnswer(ANSWERS.FALSE) }
                                disabled={ this.state.answerStoring }
                            >False</button>
                        </div>
                        { this.props.currentQuestion &&
                            <div className='column'>
                                Question <strong>{ this.props.match.params.id }</strong> of <strong>{ QUIZ_AMOUNT }</strong>
                            </div>
                        }
                    </div>
                </div>
                <div className='content has-text-centered quit-quiz'>
                    <a className='button' onClick={ this.quitQuiz }>Quit Quiz?</a>
                </div>
            </div>
		);
	}
}

export default Quiz;
