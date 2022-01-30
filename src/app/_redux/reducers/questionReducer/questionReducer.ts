import { questionTypes } from '../../actiontypes/questionTypes';
import { QuestionAction, QuestionState } from './types';

const initialState: QuestionState = {
  pending: false,
  questionList: [],
  topQuestions: [],
  currentQuestion: null,
  error: null,
  currentPage: 1
};

export default (
  state = initialState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case questionTypes.FETCH_QUESTIONLIST_REQUEST ||
      questionTypes.FETCH_QUESTIONDETAILS_REQUEST ||
      questionTypes.POST_QUESTION_REQUEST ||
      questionTypes.FETCH_TOP_QUESTIONS_REQUEST ||
      questionTypes.EDIT_QUESTION_REQUEST:
      return {
        ...state,
        pending: true
      };
    case questionTypes.FETCH_QUESTIONLIST_SUCCESS:
      return {
        ...state,
        pending: false,
        questionList: [...state.questionList, ...action.payload.questionList],
        // questionList: action.payload.questionList,
        error: null,
        currentPage: state.currentPage + 1
      };
    case questionTypes.FETCH_QUESTIONLIST_FAILURE:
      return {
        ...state,
        pending: false,
        questionList: [],
        error: action.payload.error,
        currentPage: 1
      };
    case questionTypes.FETCH_QUESTIONDETAILS_SUCCESS ||
      questionTypes.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        pending: false,
        currentQuestion: action.payload.currentQuestion,
        error: null
      };
    case questionTypes.FETCH_QUESTIONDETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        currentQuestion: null,
        error: action.payload.error
      };
    case questionTypes.POST_QUESTION_SUCCESS:
      return {
        ...state,
        pending: false,
        currentQuestion: action.payload.newQuestion,
        questionList: [action.payload.newQuestion, ...state.questionList]
      };
    case questionTypes.POST_QUESTION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    case questionTypes.FETCH_TOP_QUESTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        topQuestions: action.payload.topQuestions
      };
    case questionTypes.FETCH_TOP_QUESTIONS_FAILURE:
      return {
        ...state,
        pending: false,
        topQuestions: [],
        error: action.payload.error
      };
    case questionTypes.EDIT_QUESTION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
