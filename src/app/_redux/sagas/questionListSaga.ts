import askIt from '../../api/askIt';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestionListSuccess,
  fetchQuestionListFailure
} from '../actions/questionListActions';
import { questionListTypes } from '../actiontypes/questionListTypes';
import { QuestionApiData } from '../reducers/questionListReducer/types';
import { AxiosResponse } from 'axios';

const getQuestionListNewest = () => askIt.get<QuestionData[]>('/questions');

function* fetchQuestionListSaga() {
  try {
    const response: AxiosResponse<QuestionApiData[]> = yield call(
      getQuestionListNewest
    );
    yield put(
      fetchQuestionListSuccess({
        questionList: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchQuestionListFailure({
        error: e.error
      })
    );
  }
}

function* questionListSaga() {
  yield all([
    takeLatest(
      questionListTypes.FETCH_QUESTIONLIST_REQUEST,
      fetchQuestionListSaga
    )
  ]);
}

export default questionListSaga;
