import { all, fork } from 'redux-saga/effects';
import questionListSaga from './questionListSaga';
import userSaga from './userSaga';

export function* rootSaga() {
  yield all([fork(questionListSaga), fork(userSaga)]);
}
