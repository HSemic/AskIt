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
    case commentTypes.FETCH_QUESTION_COMMENTS_REQUEST ||
      commentTypes.EDIT_COMMENT_REQUEST ||
      commentTypes.DELETE_A_COMMENT_REQUEST:
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
    case commentTypes.EDIT_COMMENT_SUCCESS:
      const editedQUestionIndex = state.commentList
        .map((c) => c.id)
        .indexOf(action.payload.editedComment.id);

      const newCommentList = [...state.commentList];
      newCommentList[editedQUestionIndex] = action.payload.editedComment;

      return {
        ...state,
        pending: false,
        commentList: newCommentList
      };
    case commentTypes.DELETE_A_COMMENT_SUCCESS:
      const newCommentListDeleted = state.commentList.filter(function (
        comment
      ) {
        return comment.id !== action.payload.deletedId;
      });
      console.log(action.payload.deletedId);
      return {
        ...state,
        pending: false,
        commentList: newCommentListDeleted
      };

    default:
      return {
        ...state
      };
  }
};
