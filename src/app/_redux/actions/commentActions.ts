import { commentTypes } from '../actiontypes/commentTypes';
import {
  FetchQuestionCommentsSuccessPayload,
  FetchQuestionCommentsFailurePayload,
  FetchQuestionCommentsSuccess,
  FetchQuestionCommentsRequest,
  FetchQuestionCommentsFailure
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
