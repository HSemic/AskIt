import { questionListTypes } from '../../actiontypes/questionListTypes';

export interface QuestionApiData {
  id: number;
  title: string;
  authorId: number;
}

export interface QuestionListState {
  pending: boolean;
  questionList: QuestionApiData[];
  error: string | null;
}

export interface FetchQuestionListSuccessPayload {
  questionList: QuestionApiData[];
}

export interface FetchQuestionListFailurePayload {
  error: string;
}

export interface FetchQuestionListRequest {
  type: typeof questionListTypes.FETCH_QUESTIONLIST_REQUEST;
}

export type FetchQuestionListSuccess = {
  type: typeof questionListTypes.FETCH_QUESTIONLIST_SUCCESS;
  payload: FetchQuestionListSuccessPayload;
};

export type FetchQuestionListFailure = {
  type: typeof questionListTypes.FETCH_QUESTIONLIST_FAILURE;
  payload: FetchQuestionListFailurePayload;
};

export type QuestionListAction =
  | FetchQuestionListRequest
  | FetchQuestionListSuccess
  | FetchQuestionListFailure;
