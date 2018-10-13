import * as React from 'react';

import './Home.sass';

export interface HomeCallbackProps {
    initializeAndStartQuiz: () => void,
    redirectToCurrentPage: () => void
}

export interface HomeValueProps {
    isQuizLoaded: boolean,
    state: object,
    quizCurrentQuestion: number
}

export interface HomeState {
    loading: boolean,
    error: any
}

export interface HomeProps extends HomeCallbackProps, HomeValueProps {}

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            error: undefined,
            loading: false
        };
    }

    public componentWillMount() {
        if (this.props.isQuizLoaded) {
            this.props.redirectToCurrentPage();
        }
    }

    public componentWillReceiveProps(newProps: HomeProps){
        if (newProps.isQuizLoaded) {
            newProps.redirectToCurrentPage();
        }
    }

    public renderError() {
        if (!this.state.error) {
            return null;
        }
        return <div className='error'>{ this.state.error }</div>;
    }

    public startGame = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.props.initializeAndStartQuiz();
    }

	public render() {

        const playButtonText = this.state.loading ? 'Loading' : 'Begin';

  		return (
            <div className='container start-page'>
                <div className='columns is-mobile is-centered'>
                    <div className='column is-four-fifths start-page-content'>
                        <h1 className='title'>Welcome to the Trivia Challenge!</h1>
                        <h3 className='title'>You will be presented with 10 questions.</h3>
                        <h3 className='title'>Can you score 100%?</h3>
                        <button
                            className='play-button'
                            disabled={ this.state.loading }
                            onClick={ this.startGame }
                        >{ playButtonText }</button>
                        { this.renderError() }
                    </div>
                </div>
            </div>
		);
	}
}

export default Home;
