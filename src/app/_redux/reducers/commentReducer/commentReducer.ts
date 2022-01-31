import { commentTypes } from '../../actiontypes/commentTypes';
import { CommentAction, CommentState } from './types';

const initialState: CommentState = {
  pending: false,
  commentList: [],
  error: null,
  requestStatus: 'failure'
};

export default (state = initialState, action: CommentAction): CommentState => {
  switch (action.type) {
    case commentTypes.FETCH_QUESTION_COMMENTS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case commentTypes.FETCH_QUESTION_COMMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        commentList: action.payload.commentList,
        error: null
      };
    case commentTypes.FETCH_QUESTION_COMMENTS_FAILURE:
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
