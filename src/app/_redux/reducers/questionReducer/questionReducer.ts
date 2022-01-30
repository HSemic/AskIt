import { questionTypes } from '../../actiontypes/questionTypes';
import { QuestionAction, QuestionState } from './types';

const initialState: QuestionState = {
  pending: false,
  questionList: [],
  topQuestions: [],
  currentQuestion: null,
  error: null,
  currentPage: 1,
  requestStatus: 'failure'
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
      questionTypes.EDIT_QUESTION_REQUEST ||
      questionTypes.DELETE_A_QUESTION_REQUEST:
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
        currentPage: 1,
        requestStatus: 'failure'
      };
    case questionTypes.FETCH_QUESTIONDETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        currentQuestion: action.payload.currentQuestion,
        error: null,
        requestStatus: 'success'
      };
    case questionTypes.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        pending: false,
        currentQuestion: action.payload.editedQuestion,
        error: null,
        requestStatus: 'success'
      };
    case questionTypes.FETCH_QUESTIONDETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        currentQuestion: null,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case questionTypes.POST_QUESTION_SUCCESS:
      return {
        ...state,
        pending: false,
        currentQuestion: action.payload.newQuestion,
        questionList: [action.payload.newQuestion, ...state.questionList],
        requestStatus: 'success'
      };
    case questionTypes.POST_QUESTION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case questionTypes.FETCH_TOP_QUESTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        topQuestions: action.payload.topQuestions,
        requestStatus: 'success'
      };
    case questionTypes.FETCH_TOP_QUESTIONS_FAILURE:
      return {
        ...state,
        pending: false,
        topQuestions: [],
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case questionTypes.EDIT_QUESTION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case questionTypes.CLEAR_QUESTIONS:
      return {
        ...state,
        questionList: [],
        requestStatus: 'success'
      };
    case questionTypes.DELETE_A_QUESTION_SUCCESS:
      return {
        ...state,
        pending: false,
        requestStatus: 'success'
      };
    case questionTypes.DELETE_A_QUESTION_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    default:
      return {
        ...state
      };
  }
};
