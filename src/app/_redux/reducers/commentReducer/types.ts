import { commentTypes } from '../../actiontypes/commentTypes';

export interface CommentApiData {
  id: string;
  text: string;
  authorId: string;
  postId: string;
  datetime: number;
}

export interface CommentData {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  postId: string;
  datetime: number;
}

export interface CommentState {
  pending: boolean;
  commentList: CommentData[];
  error: string | null;
  requestStatus: 'success' | 'failure';
}

export interface FetchQuestionCommentsSuccessPayload {
  commentList: CommentData[];
}

export interface FetchQuestionCommentsFailurePayload {
  error: string;
}

export interface FetchQuestionCommentsRequest {
  type: typeof commentTypes.FETCH_QUESTION_COMMENTS_REQUEST;
  id: string;
}

export type FetchQuestionCommentsSuccess = {
  type: typeof commentTypes.FETCH_QUESTION_COMMENTS_SUCCESS;
  payload: FetchQuestionCommentsSuccessPayload;
};

export type FetchQuestionCommentsFailure = {
  type: typeof commentTypes.FETCH_QUESTION_COMMENTS_FAILURE;
  payload: FetchQuestionCommentsFailurePayload;
};

export type CommentAction =
  | FetchQuestionCommentsRequest
  | FetchQuestionCommentsSuccess
  | FetchQuestionCommentsFailure;
