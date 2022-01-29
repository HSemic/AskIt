import { questionTypes } from '../actiontypes/questionTypes';
import {
  FetchQuestionListFailure,
  FetchQuestionListFailurePayload,
  FetchQuestionListRequest,
  FetchQuestionListSuccess,
  FetchQuestionListSuccessPayload,
  FetchQuestionDetailsFailure,
  FetchQuestionDetailsFailurePayload,
  FetchQuestionDetailsRequest,
  FetchQuestionDetailsSuccess,
  FetchQuestionDetailsSuccessPayload
} from '../reducers/questionReducer/types';

export const fetchQuestionListRequest = (): FetchQuestionListRequest => ({
  type: questionTypes.FETCH_QUESTIONLIST_REQUEST
});

export const fetchQuestionListSuccess = (
  payload: FetchQuestionListSuccessPayload
): FetchQuestionListSuccess => ({
  type: questionTypes.FETCH_QUESTIONLIST_SUCCESS,
  payload
});

export const fetchQuestionListFailure = (
  payload: FetchQuestionListFailurePayload
): FetchQuestionListFailure => ({
  type: questionTypes.FETCH_QUESTIONLIST_FAILURE,
  payload
});

export const fetchQuestionDetailsRequest = (
  id: string
): FetchQuestionDetailsRequest => ({
  type: questionTypes.FETCH_QUESTIONDETAILS_REQUEST,
  id
});

export const fetchQuestionDetailsSuccess = (
  payload: FetchQuestionDetailsSuccessPayload
): FetchQuestionDetailsSuccess => ({
  type: questionTypes.FETCH_QUESTIONDETAILS_SUCCESS,
  payload
});

export const fetchQuestionDetailsFailure = (
  payload: FetchQuestionDetailsFailurePayload
): FetchQuestionDetailsFailure => ({
  type: questionTypes.FETCH_QUESTIONDETAILS_FAILURE,
  payload
});
