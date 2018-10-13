import * as React from 'react';
import {Question} from 'core/store/State';

import './Results.sass';

export interface ResultsCallbackProps {
    quitQuiz: () => void,
    redirectToHomePage: () => void,
}

export interface ResultsValueProps {
    isQuizLoaded: boolean,
    quiz: Question[],
    isQuizCompleted: boolean
}

export interface ResultsState {
    loading: boolean,
    error: any
}

export interface ResultsProps extends ResultsCallbackProps, ResultsValueProps {}

class Results extends React.Component<ResultsProps, ResultsState> {

    constructor(props: ResultsProps) {
        super(props);
        this.state = {
            error: undefined,
            loading: false
        };
    }

    public componentWillMount() {
        if (!this.props.isQuizCompleted) {
            this.props.redirectToHomePage();
        }
    }

    public renderResults = () => {
        const { quiz } = this.props;

        return quiz.map((question, index) => {
            const answerContainerCls = question.userAnswer !== question.correct_answer ? 'gray' : null;
            const answerCls = question.userAnswer === question.correct_answer ? 'fa-plus' : 'fa-minus';
            return (
                <div className={ `question-container ${answerContainerCls}` } key={ index }>
                    <i className={ `fas ${answerCls}` } /><span dangerouslySetInnerHTML={ { __html:  question.question } }/>
                </div>
            );
        });
    };

    public quitQuiz = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.quitQuiz();
    };

	public render() {
        const score = this.props.quiz.reduce((accumulator, currentValue) => {
            if (currentValue.userAnswer === currentValue.correct_answer) {
                accumulator++;
            }
            return accumulator;
        }, 0);
  		return (
			<div className='container quiz-page'>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-four-fifths'>
  				        <h1 className='title'>You scored</h1>
  				        <h2 className='title'>{ score } / 10</h2>
                        <div className='content is-large'>{ this.renderResults() }</div>
			        </div>
			    </div>
                <div className='content has-text-centered'>
                    <button className='button is-large' onClick={ this.quitQuiz }>Play Again?</button>
                </div>
			</div>
		);
	}
}

export default Results;
