import { questionListTypes } from '../../actiontypes/questionListTypes';
import { QuestionListAction, QuestionListState } from './types';

const initialState: QuestionListState = {
  pending: false,
  questionList: [],
  error: null
};

export default (state = initialState, action: QuestionListAction) => {
  switch (action.type) {
    case questionListTypes.FETCH_QUESTIONLIST_REQUEST:
      return {
        ...state,
        pending: true
      };
    case questionListTypes.FETCH_QUESTIONLIST_SUCCESS:
      return {
        ...state,
        pending: false,
        questionList: action.payload.questionList,
        error: null
      };
    case questionListTypes.FETCH_QUESTIONLIST_FAILURE:
      return {
        ...state,
        pending: false,
        questionList: [],
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
