import { commentTypes } from '../actiontypes/commentTypes';
import {
  FetchQuestionCommentsSuccessPayload,
  FetchQuestionCommentsFailurePayload,
  FetchQuestionCommentsSuccess,
  FetchQuestionCommentsRequest,
  FetchQuestionCommentsFailure,
  EditCommentSuccessPayload,
  EditCommentFailurePayload,
  EditCommentRequest,
  EditCommentSuccess,
  EditCommentFailure
} from '../reducers/commentReducer/types';

export const fetchQuestionCommentsRequest = (
  id: string
): FetchQuestionCommentsRequest => ({
  type: commentTypes.FETCH_QUESTION_COMMENTS_REQUEST,
  id
});

export const fetchQuestionCommentsSuccess = (
  payload: FetchQuestionCommentsSuccessPayload
): FetchQuestionCommentsSuccess => ({
  type: commentTypes.FETCH_QUESTION_COMMENTS_SUCCESS,
  payload
});

export const fetchQuestionCommentsFailure = (
  payload: FetchQuestionCommentsFailurePayload
): FetchQuestionCommentsFailure => ({
  type: commentTypes.FETCH_QUESTION_COMMENTS_FAILURE,
  payload
});

export const editCommentRequest = (
  id: string,
  attribute: 'text',
  value: string
): EditCommentRequest => ({
  type: commentTypes.EDIT_COMMENT_REQUEST,
  id,
  attribute,
  value
});

export const editCommentSuccess = (
  payload: EditCommentSuccessPayload
): EditCommentSuccess => ({
  type: commentTypes.EDIT_COMMENT_SUCCESS,
  payload
});

export const editCommentFailure = (
  payload: EditCommentFailurePayload
): EditCommentFailure => ({
  type: commentTypes.EDIT_COMMENT_FAILURE,
  payload
});
