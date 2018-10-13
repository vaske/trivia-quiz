import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Question from './Question';
import {Question as QuestionModel} from 'core/store/State';

it('renders without crashing', () => {
    const sampleQuestion: QuestionModel = {
        category: '',
        correct_answer: '',
        difficulty: '',
        incorrect_answers: [],
        question: '',
        type: ''
    };
    const div = document.createElement('div');
    ReactDOM.render(<Question question={ sampleQuestion }/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
