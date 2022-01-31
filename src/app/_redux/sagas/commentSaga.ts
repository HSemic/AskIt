import askIt from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestionCommentsRequest,
  fetchQuestionCommentsSuccess,
  fetchQuestionCommentsFailure
} from '../actions/commentActions';
import { commentTypes } from '../actiontypes/commentTypes';
import {
  CommentApiData,
  CommentData,
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
  askIt.get<CommentApiData[]>(`/comments?postId=${id}`);

function* fetchQuestionCommentList(action: FetchQuestionCommentsRequest) {
  try {
    const response: AxiosResponse<CommentApiData[]> = yield call(() =>
      getCommentsByQuestionId(action.id)
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    console.log(response.data);

    const results: CommentData[] = [];

    response.data.forEach((question) => {
      results.push({
        id: question.id,
        text: question.text,
        authorId: question.authorId,
        authorUsername:
          users[question.authorId].firstName ||
          users[question.authorId].lastName
            ? users[question.authorId].firstName +
              ' ' +
              users[question.authorId].lastName
            : 'Anonymous',
        postId: question.postId,
        datetime: question.datetime
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

function* commentSaga() {
  yield all([
    takeLatest(
      commentTypes.FETCH_QUESTION_COMMENTS_REQUEST,
      fetchQuestionCommentList
    )
  ]);
}

export default commentSaga;
