import * as React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'components/Home/HomePage';
import QuizPage from 'components/Quiz/QuizPage';
import NotFound from 'components/NotFound/NotFound';
import ResultsPage from 'components/Results/ResultsPage';


export default class Main extends React.Component<{}, {}>  {

	public render() {
		return (
			<div className="main-container">
				<Switch>
					<Route exact path="/" component={ HomePage }/>
					<Route exact path="/quiz/:id" component={ QuizPage }/>
					<Route exact path="/results" component={ ResultsPage }/>
					<Route path="*" component={ NotFound }/>
				</Switch>
			</div>
		);
	}
}
