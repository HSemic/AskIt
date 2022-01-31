import askIt from '../../api/askIt';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserListSuccess,
  fetchUserByEmailAndValidateSuccess,
  fetchUserByEmailAndValidateFailure,
  fetchUserListFailure,
  registerUserSuccess,
  registerUserFailure,
  fetchTopUsersSuccess,
  fetchTopUsersFailure
} from '../actions/userActions';
import { userTypes } from '../actiontypes/userTypes';
import {
  UserApiData,
  UserData,
  FetchUserByEmailAndValidateRequest,
  RegisterUserRequest,
  EditUserRequest
} from '../reducers/userReducer/types';

import { AxiosResponse } from 'axios';

import { generateRandomId } from '../../../services/uuidService';

// import { verifyPassword } from '../../../services/passwordHashingService';

const config = {
  userLogInErrorMessage: 'Incorrect username or password',
  userExistsMessage: 'User already exists'
};

const getUserByEmail = (email: string) =>
  askIt.get<UserApiData>(`/users?email=${email}`);

const getAllUsers = () => askIt.get<UserApiData[]>('/users');

const getTopUsers = () =>
  askIt.get<UserApiData[]>('/users?_sort=comments&_order=desc&_limit=5');

const addNewUser = (
  user: Omit<
    UserApiData,
    'id' | 'numberOfAnswers' | 'numberOfQuestions' | 'dateJoined'
  >
) =>
  askIt.post<UserApiData>('/users', {
    ...user,
    id: generateRandomId(),
    numberOfAnswers: 0,
    dateJoined: Date.now()
  });

const editAnUser = (
  id: string,
  attribute:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'numberOfQuestions'
    | 'numberOfAnswers',
  value: string | number
) =>
  askIt.patch<UserApiData>(`/users/${id}`, {
    [attribute]: value
  });

function* fetchUserByEmailAndValidate(
  action: FetchUserByEmailAndValidateRequest
) {
  try {
    const response: AxiosResponse<UserApiData[]> = yield call(
      getUserByEmail,
      action.email
    );

    if (response.data.length === 0) throw config.userLogInErrorMessage;

    const result = response.data[0];

    const passwordCorrect = action.password === result.password;

    if (!passwordCorrect) throw config.userLogInErrorMessage;

    yield put(
      fetchUserByEmailAndValidateSuccess({
        user: response.data[0]
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserByEmailAndValidateFailure({
        error: e
      })
    );
  }
}

function* fetchUserList() {
  try {
    const response: AxiosResponse<UserApiData[]> = yield call(getAllUsers);
    const results: { [id: string]: UserData } = {};
    response.data.forEach((user) => {
      results[user.id] = { firstName: user.firstName, lastName: user.lastName };
    });
    yield put(
      fetchUserListSuccess({
        userList: results
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserListFailure({
        error: e.error
      })
    );
  }
}

function* fetchTopUsers() {
  try {
    const response: AxiosResponse<UserApiData[]> = yield call(getTopUsers);

    yield put(
      fetchTopUsersSuccess({
        topUsers: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchTopUsersFailure({
        error: e.error
      })
    );
  }
}

function* registerUser(action: RegisterUserRequest) {
  try {
    const possibleExistingUser: AxiosResponse<UserApiData[]> = yield call(
      getUserByEmail,
      action.newUser.email
    );

    if (possibleExistingUser.data.length > 0) throw config.userExistsMessage;

    const response: AxiosResponse<UserApiData> = yield call(() =>
      addNewUser(action.newUser)
    );

    yield put(
      registerUserSuccess({
        user: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserByEmailAndValidateFailure({
        error: e
      })
    );
  }
}

function* editUser(action: EditUserRequest) {
  try {
    const response: AxiosResponse<UserApiData> = yield call(() =>
      editAnUser(action.id, action.attribute, action.value)
    );

    console.log(response);

    yield put(
      registerUserSuccess({
        user: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserByEmailAndValidateFailure({
        error: e
      })
    );
  }
}

function* userSaga() {
  yield all([
    takeLatest(
      userTypes.FETCH_USER_BY_EMAIL_AND_VALIDATE_REQUEST,
      fetchUserByEmailAndValidate
    ),
    takeLatest(userTypes.FETCH_USERLIST_REQUEST, fetchUserList),
    takeLatest(userTypes.REGISTER_USER_REQUEST, registerUser),
    takeLatest(userTypes.FETCH_TOPUSERS_REQUEST, fetchTopUsers),
    takeLatest(userTypes.EDIT_USER_REQUEST, editUser)
  ]);
}

export default userSaga;
