import { questionTypes } from '../../actiontypes/questionTypes';

export interface QuestionApiData {
  id: string;
  title: string;
  authorId: string;
  datetime: number;
}

export interface QuestionState {
  pending: boolean;
  questionList: QuestionData[];
  currentQuestion: QuestionApiData | null;
  currentPage: number;
  error: string | null;
}

export interface FetchQuestionListSuccessPayload {
  questionList: QuestionData[];
}

export interface FetchQuestionListFailurePayload {
  error: string;
}

export interface FetchQuestionListRequest {
  type: typeof questionTypes.FETCH_QUESTIONLIST_REQUEST;
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
  currentQuestion: QuestionApiData;
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
  newQuestion: QuestionApiData;
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

export type QuestionAction =
  | FetchQuestionListRequest
  | FetchQuestionListSuccess
  | FetchQuestionListFailure
  | FetchQuestionDetailsRequest
  | FetchQuestionDetailsSuccess
  | FetchQuestionDetailsFailure
  | PostQuestionRequest
  | PostQuestionSuccess
  | PostQuestionFailure;
