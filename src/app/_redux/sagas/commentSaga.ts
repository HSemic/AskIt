import askIt from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestionCommentsRequest,
  fetchQuestionCommentsSuccess,
  fetchQuestionCommentsFailure,
  editCommentSuccess,
  editCommentFailure,
  deleteACommentSuccess,
  deleteACommentFailure,
  addCommentSuccess,
  addCommentFailure
} from '../actions/commentActions';
import { commentTypes } from '../actiontypes/commentTypes';
import {
  AddCommentRequest,
  CommentApiData,
  CommentData,
  DeleteACommentRequest,
  EditCommentRequest,
  FetchQuestionCommentsRequest
} from '../reducers/commentReducer/types';

import { AxiosResponse } from 'axios';

import { generateRandomId } from '../../../services/uuidService';
import { UserData } from '../reducers/userReducer/types';

import * as userSelectors from '../selectors/userSelectors';

// import { verifyPassword } from '../../../services/passwordHashingService';

const config = {
  userLogInErrorMessage: 'Incorrect username or password',
  userExistsMessage: 'User already exists'
};

const getCommentsByQuestionId = (id: string) =>
  askIt.get<CommentApiData[]>(`/comments?postId=${id}&_sort=datetime`);

const addANewComment = (comment: Omit<CommentApiData, 'id'>) =>
  askIt.post<CommentApiData>('/comments', {
    ...comment,
    id: generateRandomId()
  });

const editAComment = (id: string, attribute: 'text', value: string) =>
  askIt.patch<CommentApiData>(`/comments/${id}`, {
    [attribute]: value
  });

const deleteAComment = (id: string) =>
  askIt.delete<CommentApiData>(`/comments/${id}`);

function* fetchQuestionCommentList(action: FetchQuestionCommentsRequest) {
  try {
    const response: AxiosResponse<CommentApiData[]> = yield call(() =>
      getCommentsByQuestionId(action.id)
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const results: CommentData[] = [];

    response.data.forEach((comment) => {
      results.push({
        id: comment.id,
        text: comment.text,
        authorId: comment.authorId,
        authorUsername:
          users[comment.authorId].firstName || users[comment.authorId].lastName
            ? users[comment.authorId].firstName +
              ' ' +
              users[comment.authorId].lastName
            : 'Anonymous',
        postId: comment.postId,
        datetime: comment.datetime
      });
    });

    yield put(
      fetchQuestionCommentsSuccess({
        commentList: results
      })
    );
  } catch (e: any) {
    yield put(
      fetchQuestionCommentsFailure({
        error: e.error
      })
    );
  }
}

function* addNewComment(action: AddCommentRequest) {
  try {
    const response: AxiosResponse<CommentApiData> = yield call(() =>
      addANewComment(action.newComment)
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: CommentData = {
      id: response.data.id,
      text: response.data.text,
      authorId: response.data.authorId,
      authorUsername:
        users[response.data.authorId].firstName ||
        users[response.data.authorId].lastName
          ? users[response.data.authorId].firstName +
            ' ' +
            users[response.data.authorId].lastName
          : 'Anonymous',
      postId: response.data.postId,
      datetime: response.data.datetime
    };

    yield put(
      addCommentSuccess({
        newComment: result
      })
    );
  } catch (e: any) {
    yield put(
      addCommentFailure({
        error: e
      })
    );
  }
}

function* editComment(action: EditCommentRequest) {
  try {
    const response: AxiosResponse<CommentApiData> = yield call(() =>
      editAComment(action.id, 'text', action.value)
    );

    console.log(response);

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: CommentData = {
      id: response.data.id,
      text: response.data.text,
      authorId: response.data.authorId,
      authorUsername:
        users[response.data.authorId].firstName ||
        users[response.data.authorId].lastName
          ? users[response.data.authorId].firstName +
            ' ' +
            users[response.data.authorId].lastName
          : 'Anonymous',
      postId: response.data.postId,
      datetime: response.data.datetime
    };

    yield put(
      editCommentSuccess({
        editedComment: result
      })
    );
  } catch (e: any) {
    yield put(
      editCommentFailure({
        error: e
      })
    );
  }
}

function* deleteComment(action: DeleteACommentRequest) {
  try {
    const response: AxiosResponse<CommentApiData> = yield call(() =>
      deleteAComment(action.id)
    );

    yield put(
      deleteACommentSuccess({
        deletedId: action.id
      })
    );
  } catch (e: any) {
    yield put(
      deleteACommentFailure({
        error: e
      })
    );
  }
}

function* commentSaga() {
  yield all([
    takeLatest(
      commentTypes.FETCH_QUESTION_COMMENTS_REQUEST,
      fetchQuestionCommentList
    ),
    takeLatest(commentTypes.EDIT_COMMENT_REQUEST, editComment),
    takeLatest(commentTypes.DELETE_A_COMMENT_REQUEST, deleteComment),
    takeLatest(commentTypes.ADD_COMMENT_REQUEST, addNewComment)
  ]);
}

export default commentSaga;
