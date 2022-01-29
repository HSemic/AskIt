import { all, fork } from 'redux-saga/effects';
import questionSaga from './questionSaga';
import userSaga from './userSaga';

export function* rootSaga() {
  yield all([fork(questionSaga), fork(userSaga)]);
}
