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
  editQuestionSuccess,
  deleteAQuestionSuccess,
  deleteAQuestionFailure
} from '../actions/questionActions';
import { questionTypes } from '../actiontypes/questionTypes';
import {
  DeleteAQuestionRequest,
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

const getQuestionListNewest = (page: number, id: string | null) => {
  if (id === null)
    return askIt.get<QuestionApiData[]>(
      `/questions?_page=${page}&_limit=20&_sort=datetime&_order=desc`
    );
  else
    return askIt.get<QuestionApiData[]>(
      `/questions?authorId=${id}&_page=${page}&_limit=20&_sort=datetime&_order=desc`
    );
};

const getTopQuestions = () =>
  askIt.get<QuestionApiData[]>(`/questions?_sort=likes&_order=desc&_limit=5`);

const getQuestionDetails = (id: string) =>
  askIt.get<QuestionData>(`/questions/${id}`);

const editAQuestion = (
  id: string,
  attribute: 'likes' | 'dislikes' | 'title' | 'commentNumber',
  value: string | number
) =>
  askIt.patch<QuestionApiData>(`/questions/${id}`, {
    [attribute]: value
  });

const addNewQuestion = (question: Omit<QuestionApiData, 'id'>) =>
  askIt.post<QuestionApiData>('/questions', {
    ...question,
    id: generateRandomId()
  });

const deleteAQuestion = (id: string) =>
  askIt.delete<QuestionApiData>(`/questions/${id}`);

// const setUserQuestionCount = (userId: string, questionCount: number) =>
//   askIt.patch<QuestionApiData>(`/users/${userId}`, {
//     numberOfQuestions: questionCount
//   });

function* fetchNewQuestionList(action: FetchQuestionListRequest) {
  try {
    // console.log(action.id);

    const response: AxiosResponse<QuestionApiData[]> = yield call(
      getQuestionListNewest,
      action.page,
      action.id
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
        author: user.username,
        authorId: question.authorId,
        datetime: localizeDate(question.datetime),
        likes: question.likes,
        dislikes: question.dislikes,
        commentNumber: question.commentNumber,
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
        author: user.username,
        authorId: question.authorId,
        datetime: localizeDate(question.datetime),
        likes: question.likes,
        dislikes: question.dislikes,
        commentNumber: question.commentNumber,
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
      author: users[response.data.authorId].username,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      commentNumber: response.data.commentNumber,
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
    const response: AxiosResponse<QuestionApiData> = yield call(() =>
      addNewQuestion(action.newQuestion)
    );

    // yield call(() =>
    //   setUserQuestionCount(loggedInUser.id, loggedInUser.numberOfQuestions + 1)
    // );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const addedQuestion: QuestionData = {
      id: response.data.id,
      questionText: response.data.title,
      author: users[response.data.authorId].username,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      commentNumber: response.data.commentNumber,
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
    // if (action.attribute === 'title') console.log(action.value);

    const response: AxiosResponse<QuestionApiData> = yield call(() =>
      editAQuestion(action.id, action.attribute, action.value)
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: QuestionData = {
      id: response.data.id,
      questionText: response.data.title,
      author: users[response.data.authorId].username,
      authorId: response.data.authorId,
      datetime: localizeDate(response.data.datetime),
      likes: response.data.likes,
      dislikes: response.data.dislikes,
      commentNumber: response.data.commentNumber,
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

function* deleteQuestion(action: DeleteAQuestionRequest) {
  try {
    yield call(() => deleteAQuestion(action.id));

    yield put(deleteAQuestionSuccess());
  } catch (e: any) {
    yield put(
      deleteAQuestionFailure({
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
    takeLatest(questionTypes.EDIT_QUESTION_REQUEST, editQuestion),
    takeLatest(questionTypes.DELETE_A_QUESTION_REQUEST, deleteQuestion)
  ]);
}

export default questionSaga;
