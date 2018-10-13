export interface State {
    quiz: Question[],
    isQuizLoaded: boolean,
    quizSize: number,
    quizCurrentQuestion: number,
    isQuizCompleted: boolean
}

export const initialState = {
    isQuizLoaded: false,
    quiz: [],
    quizCurrentQuestion: undefined,
    quizSize: undefined,
    isQuizCompleted: false
};

export interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
    userAnswer?: string
}
