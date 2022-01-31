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

export interface EditCommentSuccessPayload {
  editedComment: CommentData;
}

export interface EditCommentFailurePayload {
  error: string;
}

export interface EditCommentRequest {
  type: typeof commentTypes.EDIT_COMMENT_REQUEST;
  id: string;
  attribute: 'text';
  value: string;
}

export interface EditCommentSuccess {
  type: typeof commentTypes.EDIT_COMMENT_SUCCESS;
  payload: EditCommentSuccessPayload;
}

export interface EditCommentFailure {
  type: typeof commentTypes.EDIT_COMMENT_FAILURE;
  payload: EditCommentFailurePayload;
}

export interface DeleteACommentSuccessPayload {
  deletedId: string;
}

export interface DeleteACommentFailurePayload {
  error: string;
}

export interface DeleteACommentRequest {
  type: typeof commentTypes.DELETE_A_COMMENT_REQUEST;
  id: string;
}

export interface DeleteACommentSuccess {
  type: typeof commentTypes.DELETE_A_COMMENT_SUCCESS;
  payload: DeleteACommentSuccessPayload;
}

export interface DeleteACommentFailure {
  type: typeof commentTypes.DELETE_A_COMMENT_FAILURE;
  payload: DeleteACommentFailurePayload;
}

export type CommentAction =
  | FetchQuestionCommentsRequest
  | FetchQuestionCommentsSuccess
  | FetchQuestionCommentsFailure
  | EditCommentRequest
  | EditCommentSuccess
  | EditCommentFailure
  | DeleteACommentRequest
  | DeleteACommentSuccess
  | DeleteACommentFailure;
