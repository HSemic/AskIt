import { commentTypes } from '../../actiontypes/commentTypes';
import { CommentAction, CommentState } from './types';

const initialState: CommentState = {
  pending: false,
  commentList: [],
  error: null,
  requestStatus: 'failure'
};

const commentReducer = (
  state = initialState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case commentTypes.FETCH_QUESTION_COMMENTS_REQUEST ||
      commentTypes.EDIT_COMMENT_REQUEST ||
      commentTypes.DELETE_A_COMMENT_REQUEST ||
      commentTypes.ADD_COMMENT_REQUEST:
      return {
        ...state,
        pending: true
      };
    case commentTypes.FETCH_QUESTION_COMMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        commentList: action.payload.commentList,
        error: null,
        requestStatus: 'success'
      };
    case commentTypes.FETCH_QUESTION_COMMENTS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case commentTypes.EDIT_COMMENT_SUCCESS:
      const editedQuestionIndex = state.commentList
        .map((c) => c.id)
        .indexOf(action.payload.editedComment.id);

      const newCommentList = [...state.commentList];
      newCommentList[editedQuestionIndex] = action.payload.editedComment;

      return {
        ...state,
        pending: false,
        commentList: newCommentList,
        requestStatus: 'success'
      };
    case commentTypes.DELETE_A_COMMENT_SUCCESS:
      const newCommentListDeleted = state.commentList.filter(function (
        comment
      ) {
        return comment.id !== action.payload.deletedId;
      });
      // console.log(action.payload.deletedId);
      return {
        ...state,
        pending: false,
        commentList: newCommentListDeleted,
        requestStatus: 'success'
      };
    case commentTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        commentList: [...state.commentList, action.payload.newComment],
        requestStatus: 'success'
      };
    case commentTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        requestStatus: 'failure'
      };
    case commentTypes.CLEAR_COMMENTS:
      return {
        ...state,
        pending: false,
        commentList: [],
        requestStatus: 'success'
      };
    default:
      return {
        ...state
      };
  }
};

export default commentReducer;
