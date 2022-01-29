import askIt from '../../api/askIt';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserListSuccess,
  fetchUserListFailure
} from '../actions/userActions';
import { userTypes } from '../actiontypes/userTypes';
import {
  UserApiData,
  FetchUserRequest,
  UserData
} from '../reducers/userReducer/types';
import { AxiosResponse } from 'axios';

const getUser = (id: string) => askIt.get<UserApiData>(`/users/${id}`);

const getAllUsers = () => askIt.get<UserApiData[]>('/users');

function* fetchUser(action: FetchUserRequest) {
  try {
    const response: AxiosResponse<UserApiData> = yield call(getUser, action.id);
    yield put(
      fetchUserSuccess({
        user: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserFailure({
        error: e.error
      })
    );
  }
}

function* fetchUserList() {
  try {
    const response: AxiosResponse<UserApiData[]> = yield call(getAllUsers);
    console.log(response);
    const results: { [id: string]: UserData } = {};
    response.data.map((user) => {
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

function* userSaga() {
  yield all([
    takeLatest(userTypes.FETCH_USER_REQUEST, fetchUser),
    takeLatest(userTypes.FETCH_USERLIST_REQUEST, fetchUserList)
  ]);
}

export default userSaga;
