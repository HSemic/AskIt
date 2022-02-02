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
  QuestionApiData,
  EditQuestionRequest,
  EditQuestionSuccessPayload,
  EditQuestionSuccess,
  EditQuestionFailurePayload,
  EditQuestionFailure,
  ClearQuestions,
  DeleteAQuestionRequest,
  DeleteAQuestionSuccess,
  DeleteAQuestionFailurePayload,
  DeleteAQuestionFailure,
  ClearCurrentQuestion
} from '../reducers/questionReducer/types';

export const fetchQuestionListRequest = (
  page: number,
  id: string | null
): FetchQuestionListRequest => ({
  type: questionTypes.FETCH_QUESTIONLIST_REQUEST,
  id,
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

export const editQuestionRequest = (
  id: string,
  attribute: 'title' | 'likes' | 'dislikes' | 'commentNumber',
  value: string | number
): EditQuestionRequest => ({
  type: questionTypes.EDIT_QUESTION_REQUEST,
  id,
  attribute,
  value
});

export const editQuestionSuccess = (
  payload: EditQuestionSuccessPayload
): EditQuestionSuccess => ({
  type: questionTypes.EDIT_QUESTION_SUCCESS,
  payload
});

export const editQuestionFailure = (
  payload: EditQuestionFailurePayload
): EditQuestionFailure => ({
  type: questionTypes.EDIT_QUESTION_FAILURE,
  payload
});

export const clearQuestions = (): ClearQuestions => ({
  type: questionTypes.CLEAR_QUESTIONS
});

export const clearCurrentQuestion = (): ClearCurrentQuestion => ({
  type: questionTypes.CLEAR_CURRENT_QUESTION
});

export const deleteAQuestionRequest = (id: string): DeleteAQuestionRequest => ({
  type: questionTypes.DELETE_A_QUESTION_REQUEST,
  id
});

export const deleteAQuestionSuccess = (): DeleteAQuestionSuccess => ({
  type: questionTypes.DELETE_A_QUESTION_SUCCESS
});

export const deleteAQuestionFailure = (
  payload: DeleteAQuestionFailurePayload
): DeleteAQuestionFailure => ({
  type: questionTypes.DELETE_A_QUESTION_FAILURE,
  payload
});
