import { questionTypes } from '../../actiontypes/questionTypes';

export interface QuestionApiData {
  id: string;
  title: string;
  authorId: string;
  likes: number;
  dislikes: number;
  datetime: number;
  commentNumber: number;
}

export interface QuestionState {
  pending: boolean;
  questionList: QuestionData[];
  topQuestions: QuestionData[];
  currentQuestion: QuestionData | null;
  currentPage: number;
  error: string | null;
  requestStatus: 'success' | 'failure';
}

export interface FetchQuestionListSuccessPayload {
  questionList: QuestionData[];
}

export interface FetchQuestionListFailurePayload {
  error: string;
}

export interface FetchQuestionListRequest {
  type: typeof questionTypes.FETCH_QUESTIONLIST_REQUEST;
  id: string | null;
  page: number;
}

export type FetchQuestionListSuccess = {
  type: typeof questionTypes.FETCH_QUESTIONLIST_SUCCESS;
  payload: FetchQuestionListSuccessPayload;
};

export type FetchQuestionListFailure = {
  type: typeof questionTypes.FETCH_QUESTIONLIST_FAILURE;
  payload: FetchQuestionListFailurePayload;
};

export interface FetchQuestionDetailsSuccessPayload {
  currentQuestion: QuestionData;
}

export interface FetchQuestionDetailsFailurePayload {
  error: string;
}

export interface FetchQuestionDetailsRequest {
  type: typeof questionTypes.FETCH_QUESTIONDETAILS_REQUEST;
  id: string;
}

export type FetchQuestionDetailsSuccess = {
  type: typeof questionTypes.FETCH_QUESTIONDETAILS_SUCCESS;
  payload: FetchQuestionDetailsSuccessPayload;
};

export type FetchQuestionDetailsFailure = {
  type: typeof questionTypes.FETCH_QUESTIONDETAILS_FAILURE;
  payload: FetchQuestionDetailsFailurePayload;
};

export interface PostQuestionSuccessPayload {
  newQuestion: QuestionData;
}

export interface PostQuestionFailurePayload {
  error: string;
}

export interface PostQuestionRequest {
  type: typeof questionTypes.POST_QUESTION_REQUEST;
  newQuestion: Omit<QuestionApiData, 'id'>;
}

export interface PostQuestionSuccess {
  type: typeof questionTypes.POST_QUESTION_SUCCESS;
  payload: PostQuestionSuccessPayload;
}

export interface PostQuestionFailure {
  type: typeof questionTypes.POST_QUESTION_FAILURE;
  payload: PostQuestionFailurePayload;
}

export interface FetchTopQuestionsSuccessPayload {
  topQuestions: QuestionData[];
}

export interface FetchTopQuestionsFailurePayload {
  error: string;
}

export interface FetchTopQuestionsRequest {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_REQUEST;
}

export interface FetchTopQuestionsSuccess {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_SUCCESS;
  payload: FetchTopQuestionsSuccessPayload;
}

export interface FetchTopQuestionsFailure {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_FAILURE;
  payload: FetchTopQuestionsFailurePayload;
}

export interface FetchTopQuestionsSuccessPayload {
  topQuestions: QuestionData[];
}

export interface FetchTopQuestionsFailurePayload {
  error: string;
}

export interface FetchTopQuestionsRequest {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_REQUEST;
}

export interface FetchTopQuestionsSuccess {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_SUCCESS;
  payload: FetchTopQuestionsSuccessPayload;
}

export interface FetchTopQuestionsFailure {
  type: typeof questionTypes.FETCH_TOP_QUESTIONS_FAILURE;
  payload: FetchTopQuestionsFailurePayload;
}

export interface EditQuestionSuccessPayload {
  editedQuestion: QuestionData;
}

export interface EditQuestionFailurePayload {
  error: string;
}

export interface EditQuestionRequest {
  type: typeof questionTypes.EDIT_QUESTION_REQUEST;
  id: string;
  attribute: 'title' | 'likes' | 'dislikes' | 'commentNumber';
  value: string | number;
}

export interface EditQuestionSuccess {
  type: typeof questionTypes.EDIT_QUESTION_SUCCESS;
  payload: EditQuestionSuccessPayload;
}

export interface EditQuestionFailure {
  type: typeof questionTypes.EDIT_QUESTION_FAILURE;
  payload: EditQuestionFailurePayload;
}

export interface ClearQuestions {
  type: typeof questionTypes.CLEAR_QUESTIONS;
}

export interface ClearCurrentQuestion {
  type: typeof questionTypes.CLEAR_CURRENT_QUESTION;
}

export interface DeleteAQuestionFailurePayload {
  error: string;
}

export interface DeleteAQuestionRequest {
  type: typeof questionTypes.DELETE_A_QUESTION_REQUEST;
  id: string;
}

export interface DeleteAQuestionSuccess {
  type: typeof questionTypes.DELETE_A_QUESTION_SUCCESS;
}

export interface DeleteAQuestionFailure {
  type: typeof questionTypes.DELETE_A_QUESTION_FAILURE;
  payload: DeleteAQuestionFailurePayload;
}

export type QuestionAction =
  | FetchQuestionListRequest
  | FetchQuestionListSuccess
  | FetchQuestionListFailure
  | FetchQuestionDetailsRequest
  | FetchQuestionDetailsSuccess
  | FetchQuestionDetailsFailure
  | PostQuestionRequest
  | PostQuestionSuccess
  | PostQuestionFailure
  | FetchTopQuestionsRequest
  | FetchTopQuestionsSuccess
  | FetchTopQuestionsFailure
  | EditQuestionRequest
  | EditQuestionSuccess
  | EditQuestionFailure
  | DeleteAQuestionRequest
  | DeleteAQuestionSuccess
  | DeleteAQuestionFailure
  | ClearCurrentQuestion
  | ClearQuestions;
