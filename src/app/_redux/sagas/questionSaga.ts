import askIt from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestionListSuccess,
  fetchQuestionListFailure,
  fetchQuestionDetailsSuccess,
  fetchQuestionDetailsFailure,
  postQuestionSuccess,
  postQuestionFailure,
  fetchTopQuestionsSuccess,
  fetchTopQuestionsFailure,
  editQuestionSuccess
} from '../actions/questionActions';
import { questionTypes } from '../actiontypes/questionTypes';
import {
  EditQuestionRequest,
  FetchQuestionDetailsRequest,
  FetchQuestionListRequest,
  PostQuestionRequest,
  QuestionApiData
} from '../reducers/questionReducer/types';

import { UserData } from '../reducers/userReducer/types';

import { AxiosResponse } from 'axios';

import * as userSelectors from '../selectors/userSelectors';
import { generateRandomId } from '../../../services/uuidService';
import { localizeDate } from '../../../services/localization';
import { validateQuestionText } from '../../../services/validationService';

const getQuestionListNewest = (page: number) =>
  askIt.get<QuestionApiData[]>(
    `/questions?_page=${page}&_limit=20&_sort=datetime&_order=desc`
  );

const getQuestionListByUserId = (page: number, userId: string) =>
  askIt.get<QuestionApiData[]>(`/questions?_page=${page}&_limit=20`);

const getTopQuestions = () =>
  askIt.get<QuestionApiData[]>(`/questions?_sort=likes&_limit=5`);

const getQuestionDetails = (id: string) =>
  askIt.get<QuestionData>(`/questions/${id}`);

const editAQuestion = (id: string, text: string) =>
  askIt.patch<QuestionApiData>(`/questions/${id}`, {
    title: text
  });

const addNewQuestion = (question: Omit<QuestionApiData, 'id'>) =>
  askIt.post<QuestionApiData>('/questions', {
    ...question,
    id: generateRandomId()
  });

function* fetchNewQuestionList(action: FetchQuestionListRequest) {
  try {
    const response: AxiosResponse<QuestionApiData[]> = yield call(
      getQuestionListNewest,
      action.page
    );

    console.log(response);

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const results: QuestionData[] = [];

    response.data.forEach((question) => {
      const user: UserData = users[question.authorId];

      results.push({
        id: question.id,
        questionText: question.title,
        author:
          user.firstName.length > 0 || user.lastName.length > 0
            ? user.firstName + ' ' + user.lastName
            : 'Unknown',
        authorId: question.authorId,
        datetime: localizeDate(question.datetime),
        likes: question.likes,
        dislikes: question.dislikes,
        variant: 'card'
      });
    });

    console.log(results);

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

function* fetchTopQuestions() {
  try {
    const response: AxiosResponse<QuestionApiData[]> = yield call(
      getTopQuestions
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const results: QuestionData[] = [];

    response.data.forEach((question) => {
      const user: UserData = users[question.authorId];

      results.push({
        id: question.id,
        questionText: question.title,
        author:
          user.firstName.length > 0 || user.lastName.length > 0
            ? user.firstName + ' ' + user.lastName
            : 'Unknown',
        authorId: question.authorId,
        datetime: localizeDate(question.datetime),
        likes: question.likes,
        dislikes: question.dislikes,
        variant: 'card'
      });
    });

    yield put(
      fetchTopQuestionsSuccess({
        topQuestions: results
      })
    );
  } catch (e: any) {
    yield put(
      fetchTopQuestionsFailure({
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

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const addedQuestion: QuestionData = {
      id: response.data.id,
      questionText: response.data.title,
      author:
        users[response.data.authorId].firstName +
        ' ' +
        users[response.data.authorId].lastName,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      variant: 'card'
    };

    yield put(
      fetchQuestionDetailsSuccess({
        currentQuestion: addedQuestion
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

function* postNewQuestion(action: PostQuestionRequest) {
  try {
    if (!validateQuestionText(action.newQuestion.title))
      throw 'Question text must be between 8 and 150 characters long.';

    const response: AxiosResponse<QuestionApiData> = yield call(() =>
      addNewQuestion(action.newQuestion)
    );

    console.log(response);

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const addedQuestion: QuestionData = {
      id: response.data.id,
      questionText: response.data.title,
      author:
        users[response.data.authorId].firstName +
        ' ' +
        users[response.data.authorId].lastName,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      variant: 'card'
    };

    yield put(
      postQuestionSuccess({
        newQuestion: addedQuestion
      })
    );
  } catch (e: any) {
    yield put(
      postQuestionFailure({
        error: e
      })
    );
  }
}

function* editQuestion(action: EditQuestionRequest) {
  try {
    if (!validateQuestionText(action.text))
      throw 'Question text must be between 8 and 150 characters long.';

    const response: AxiosResponse<QuestionApiData> = yield call(() =>
      editAQuestion(action.id, action.text)
    );

    console.log(response);

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: QuestionData = {
      id: response.data.id,
      questionText: response.data.title,
      author:
        users[response.data.authorId].firstName +
        ' ' +
        users[response.data.authorId].lastName,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      variant: 'card'
    };

    yield put(
      editQuestionSuccess({
        editedQuestion: result
      })
    );
  } catch (e: any) {
    yield put(
      postQuestionFailure({
        error: e
      })
    );
  }
}

function* questionSaga() {
  yield all([
    takeLatest(questionTypes.FETCH_QUESTIONLIST_REQUEST, fetchNewQuestionList),
    takeLatest(
      questionTypes.FETCH_QUESTIONDETAILS_REQUEST,
      fetchQuestionDetails
    ),
    takeLatest(questionTypes.POST_QUESTION_REQUEST, postNewQuestion),
    takeLatest(questionTypes.FETCH_TOP_QUESTIONS_REQUEST, fetchTopQuestions),
    takeLatest(questionTypes.EDIT_QUESTION_REQUEST, editQuestion)
  ]);
}

export default questionSaga;
