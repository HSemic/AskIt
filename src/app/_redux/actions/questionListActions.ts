import { questionListTypes } from '../actiontypes/questionListTypes';
import {
  FetchQuestionListFailure,
  FetchQuestionListFailurePayload,
  FetchQuestionListRequest,
  FetchQuestionListSuccess,
  FetchQuestionListSuccessPayload
} from '../reducers/questionListReducer/types';

export const fetchQuestionListRequest = (): FetchQuestionListRequest => ({
  type: questionListTypes.FETCH_QUESTIONLIST_REQUEST
});

export const fetchQuestionListSuccess = (
  payload: FetchQuestionListSuccessPayload
): FetchQuestionListSuccess => ({
  type: questionListTypes.FETCH_QUESTIONLIST_SUCCESS,
  payload
});

export const fetchQuestionListFailure = (
  payload: FetchQuestionListFailurePayload
): FetchQuestionListFailure => ({
  type: questionListTypes.FETCH_QUESTIONLIST_FAILURE,
  payload
});
