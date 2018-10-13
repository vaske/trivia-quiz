import * as React from 'react';
import {Question as QuestionModel} from 'core/store/State';
import './Question.sass';

export interface QuestionProps {
    question: QuestionModel
}

class Question extends React.Component<QuestionProps, {}> {

    constructor(props: QuestionProps) {
        super(props);
    }

	public render() {
        const { question } = this.props;
  		return (
            <div className=''>
                <h1 className='title'>{ question.category }</h1>
                <p className='title question-box' dangerouslySetInnerHTML={ { __html:  question.question } }/>
            </div>
		);
	}
}

export default Question;
