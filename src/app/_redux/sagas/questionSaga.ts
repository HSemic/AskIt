import askIt from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestionListSuccess,
  fetchQuestionListFailure,
  fetchQuestionDetailsSuccess,
  fetchQuestionDetailsFailure
} from '../actions/questionActions';
import { questionTypes } from '../actiontypes/questionTypes';
import {
  FetchQuestionDetailsRequest,
  QuestionApiData
} from '../reducers/questionReducer/types';

import { UserData } from '../reducers/userReducer/types';

import { AxiosResponse } from 'axios';

import * as questionSelectors from '../selectors/questionSelectors';
import * as userSelectors from '../selectors/userSelectors';

const getQuestionListNewest = (page: number) => {
  askIt.get<QuestionApiData[]>(`/questions?_page=${page}&_limit=20`);
};

const getQuestionDetails = (id: string) => {
  askIt.get<QuestionData>(`/questions/${id}`);
};

function* fetchNewQuestionList() {
  try {
    const currentPage: number = yield select(questionSelectors.currentPage);
    console.log(currentPage);
    const response: AxiosResponse<QuestionApiData[]> = yield call(
      getQuestionListNewest,
      currentPage
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );
    const results: QuestionData[] = [];

    response.data.map((question) => {
      const author: UserData = users[question.authorId];

      results.push({
        id: question.id,
        questionText: question.title,
        author:
          author.firstName.length > 0 || author.lastName.length > 0
            ? author.firstName + ' ' + author.lastName
            : 'Unknown',
        datetime: question.datetime,
        variant: 'card'
      });
    });

    yield put(
      fetchQuestionListSuccess({
        questionList: results
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

function* fetchQuestionDetails(action: FetchQuestionDetailsRequest) {
  try {
    const response: AxiosResponse<QuestionApiData> = yield call(
      getQuestionDetails,
      action.id
    );
    yield put(
      fetchQuestionDetailsSuccess({
        currentQuestion: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchQuestionDetailsFailure({
        error: e.error
      })
    );
  }
}

function* questionListSaga() {
  yield all([
    takeLatest(questionTypes.FETCH_QUESTIONLIST_REQUEST, fetchNewQuestionList),
    takeLatest(
      questionTypes.FETCH_QUESTIONDETAILS_REQUEST,
      fetchQuestionDetails
    )
  ]);
}

export default questionListSaga;
