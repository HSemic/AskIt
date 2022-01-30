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
  FetchQuestionDetailsSuccessPayload,
  PostQuestionFailurePayload,
  PostQuestionSuccessPayload,
  PostQuestionRequest,
  PostQuestionSuccess,
  PostQuestionFailure,
  FetchTopQuestionsSuccessPayload,
  FetchTopQuestionsFailurePayload,
  FetchTopQuestionsRequest,
  FetchTopQuestionsSuccess,
  FetchTopQuestionsFailure,
  QuestionApiData
} from '../reducers/questionReducer/types';

export const fetchQuestionListRequest = (
  page: number
): FetchQuestionListRequest => ({
  type: questionTypes.FETCH_QUESTIONLIST_REQUEST,
  page
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

export const postQuestionRequest = (
  newQuestion: Omit<QuestionApiData, 'id'>
): PostQuestionRequest => ({
  type: questionTypes.POST_QUESTION_REQUEST,
  newQuestion
});

export const postQuestionSuccess = (
  payload: PostQuestionSuccessPayload
): PostQuestionSuccess => ({
  type: questionTypes.POST_QUESTION_SUCCESS,
  payload
});

export const postQuestionFailure = (
  payload: PostQuestionFailurePayload
): PostQuestionFailure => ({
  type: questionTypes.POST_QUESTION_FAILURE,
  payload
});

export const fetchTopQuestionsRequest = (): FetchTopQuestionsRequest => ({
  type: questionTypes.FETCH_TOP_QUESTIONS_REQUEST
});

export const fetchTopQuestionsSuccess = (
  payload: FetchTopQuestionsSuccessPayload
): FetchTopQuestionsSuccess => ({
  type: questionTypes.FETCH_TOP_QUESTIONS_SUCCESS,
  payload
});

export const fetchTopQuestionsFailure = (
  payload: FetchTopQuestionsFailurePayload
): FetchTopQuestionsFailure => ({
  type: questionTypes.FETCH_TOP_QUESTIONS_FAILURE,
  payload
});